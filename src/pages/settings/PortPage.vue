<template>
  <q-page class="bg-body text-appText q-pa-md">
    <div class="row q-col-gutter-md">
      <!-- LEFT SIDE -->
      <div class="col-12 col-md-4">
        <q-card class="bg-body text-appText flat bordered full-height-card">
          <div class="row justify-between items-center q-pa-sm">
            <StateCtrlBtn
              :enbBtnCreate="canCreate"
              :enbBtnEdit="false"
              :enbBtnDelete="canDelete"
              @onClickCreate="onCreate"
              @onClickDelete="onDelete"
            />
          </div>
          <q-separator />
          <ListComp
            :rows="filteredRows"
            :columns="listColumns"
            @onRowClick="onRowClick"
            @onFilter="onFilter"
          />
        </q-card>
      </div>

      <!-- RIGHT SIDE -->
      <div class="col-12 col-md-8">
        <q-card class="bg-body text-appText flat bordered full-height-card q-pa-md fit">
          <!-- Top PortComp -->
          <PortComp
            ref="myChild"
            :custOption="custOption"
            :brokerOption="brokerOption"
            :portType="portType"
            :info="port"
            :enbBtnSave="canSave"
            @onClickSave="onSave"
            class="q-mb-md"
          />

          <!-- Responsive row -->
          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-6">
              <ListComp
                :rows="filteredRows"
                :columns="listColumns"
                @onRowClick="onRowClick"
                @onFilter="onFilter"
              />
            </div>
            <div class="col-12 col-sm-6">
              <PortComp
                ref="myChild"
                :custOption="custOption"
                :brokerOption="brokerOption"
                :portType="portType"
                :info="port"
                :enbBtnSave="canSave"
                @onClickSave="onSave"
              />
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType, watch, computed } from 'vue'
import PortComp from '../../components/PortComp.vue'
import ListComp from '../../components/utils/ListComp.vue'
import StateCtrlBtn from '../../components/utils/StateCtrlBtn.vue'
import { usePortProp } from '../../hooks/usePortProp.js'
import { EInvestPortType } from '../../types/myEnums.js'

export default defineComponent({
  name: 'PortPage',
  components: {
    PortComp,
    ListComp,
    StateCtrlBtn
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
      await usePort.Init()
    }

    const save = async () => {
      const valid = await myChild.value?.getValidate()
      if (!valid) {
        usePort.resetDataState()
        return
      }
      usePort.onSave()
    }
    const custOption = computed(() => usePort.rawOptionToQSelectOptions('customers'))
    const brokerOption = computed(() => usePort.rawOptionToQSelectOptions('brokers'))
    return {
      splitterModel: ref(35),
      custOption,
      brokerOption,
      listColumns: usePort.listColumns,
      filteredRows: usePort.filteredRows,
      port: usePort.item,
      ports: usePort.items,
      rawOptions: usePort.rawOptions,
      onRowClick: usePort.onRowClick,
      onFilter: usePort.onFilter,
      onCreate: usePort.onCreatePort,
      onDelete: usePort.onDelete,
      onSave: save,
      canDelete: usePort.canDelete,
      canCreate: usePort.canCreate,
      canSave: usePort.canSave,
      state: usePort.state,
      myChild
    }
  }
})
</script>
<style lang="sass" scoped>
@media (max-width: 600px)
  .full-height-card
    min-height: auto
    width: 100%
    margin-bottom: 1rem

  .q-card
    font-size: 0.9rem
    padding: 8px
    box-sizing: border-box
</style>
