<template>
  <q-page class="row items-center justify-evenly bg-body text-appText">
    <div class="q-pa-md fit">
      <q-splitter
        v-model="splitterModel"
        before-class="bg-body text-appText "
        after-class="bg-body text-appText fit"
        style="height: 80vh"
      >
        <template v-slot:before>
          <div class="q-pa-md">
            <q-card class="bg-body text-appText">
              <div class="row justify-start items-start">
                <div class="col-12 col-md-5">
                  <StateCtrlBtn
                    :enbBtnCreate="canCreate"
                    :enbBtnEdit="false"
                    :enbBtnDelete="canDelete"
                    @onClickCreate="onCreate"
                    @onClickDelete="onDelete"
                  ></StateCtrlBtn>
                </div>
              </div>
              <q-separator />
              <ListComp
                :rows="filteredRows"
                :columns="listColumns"
                @onRowClick="onRowClick"
                @onFilter="onFilter"
              ></ListComp>
            </q-card>
          </div>
        </template>
        <template v-slot:after>
          <div class="q-pa-md">
            <q-card class="bg-body text-appText">
              <PortComp
                ref="myChild"
                :custOption="custOption"
                :portType="portType"
                :info="port"
              ></PortComp>
            </q-card>
          </div>
          <div class="row justify-end items-start">
            <div class="col-12 col-md-6 bg-body text-appText">
              <SaveCancelBtn :enbBtnDiscard="false" :enbBtnSave="canSave" @onClickSave="onSave">
              </SaveCancelBtn>
            </div>
          </div>
        </template>
      </q-splitter>
    </div>
  </q-page>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, PropType, watch, computed } from 'vue'
import PortComp from '../../components/PortComp.vue'
import ListComp from '../../components/utils/ListComp.vue'
import StateCtrlBtn from '../../components/utils/StateCtrlBtn.vue'
import SaveCancelBtn from '../../components/utils/SaveCancelBtn.vue'
import { usePortProp } from '../../hooks/usePortProp.js'
import { EInvestPortType } from '../../types/myEnums.js'

export default defineComponent({
  name: 'PortPage',
  components: {
    PortComp,
    ListComp,
    StateCtrlBtn,
    SaveCancelBtn
  },
  props: {
    // 1. This matches the ':portType' param string from your router file
    portType: {
      type: [String, Number] as PropType<string | number | EInvestPortType>,
      default: EInvestPortType.CashAndDeposits
    }
  },
  data() {
    return {
      childIcon: 'mdi-widgets-outline'
    }
  },
  // 2. Accept 'props' here so we can access them dynamically
  setup(props, { emit }) {
    const myChild = ref<InstanceType<typeof PortComp>>()

    // 3. Convert the value to a Number if your enum expects numbers

    // 4. Feed the route param into your hook instead of hardcoding it!
    const usePort = usePortProp()

    onMounted(async () => {
      await usePort.initOtherList()
      await init()
    })
    watch(
      () => props.portType,
      async () => {
        await init()
      }
    )
    const init = async () => {
      usePort.portType.value = props.portType

      usePort.clearValidate.value = () => {
        myChild.value?.clearValidation()
      }
      usePort.getValidate.value = async (): Promise<boolean> => {
        return (await myChild.value?.getValidate()) ?? false
      }
      await usePort.Init()
    }

    const save = async () => {
      const valid = await myChild.value?.getValidate()
      if (!valid) return
    }
    const custOption = computed(() => usePort.customerToQSelectOptions(usePort.customers.value))
    return {
      splitterModel: ref(35),
      custOption,
      listColumns: usePort.listColumns,
      filteredRows: usePort.filteredRows,
      port: usePort.item,
      ports: usePort.items,
      customers: usePort.customers,
      brokers: usePort.brokers,
      onRowClick: usePort.onRowClick,
      onFilter: usePort.onFilter,
      onCreate: usePort.onCreate,
      onDelete: usePort.onDelete,
      onSave: usePort.onSave,
      canDelete: usePort.canDelete,
      canCreate: usePort.canCreate,
      canSave: usePort.canSave,
      state: usePort.state,
      myChild
    }
  }
})
</script>
<style lang="sass" scoped></style>
