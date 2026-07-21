<template>
  <q-page class="bg-body text-appText q-pa-md">
    <!-- Responsive main grid container -->
    <div class="row q-col-gutter-md">
      <!-- LEFT / TOP SIDE: Controls & List Component -->
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

      <!-- RIGHT / BOTTOM SIDE: Form Details & Actions -->
      <div class="col-12 col-md-8">
        <div class="column justify-between full-height">
          <q-card class="bg-body text-appText flat bordered q-mb-md">
            <PortComp
              ref="myChild"
              :custOption="custOption"
              :brokerOption="brokerOption"
              :portType="portType"
              :info="port"
              :enbBtnSave="canSave"
              @onClickSave="onSave"
            />
          </q-card>
          <q-card class="bg-body text-appText flat bordered q-mb-md">
            <div class="row q-col-gutter-md col-grow">
              <div class="col-12 col-md-6">
                <q-card class="bg-body text-appText flat bordered full-height">
                  <ListComp
                    :rows="filteredRows"
                    :columns="listColumns"
                    @onRowClick="onRowClick"
                    @onFilter="onFilter"
                  />
                </q-card>
              </div>

              <div class="col-12 col-md-6">
                <q-card class="bg-body text-appText flat bordered full-height">
                  <ListComp
                    :rows="filteredRows"
                    :columns="listColumns"
                    @onRowClick="onRowClick"
                    @onFilter="onFilter"
                  />
                </q-card>
              </div>
            </div>
          </q-card>
        </div>
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
// Ensures cards are consistent in height on desktop viewports
@media (min-width: 1024px)
  .full-height-card
    min-height: 80vh
</style>
