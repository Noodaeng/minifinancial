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
            ref="myPortComp"
            :custOption="custOption"
            :brokerOption="brokerOption"
            :portType="portType"
            :info="port"
            :enbBtnSave="canSave"
            @onClickSave="savePort"
            class="q-mb-md"
          />

          <!-- Responsive row -->
          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-6">
              <ListComp
                :rows="sesFilterRows"
                :columns="sesListColumns"
                @onRowClick="onSesRowClick"
                @onFilter="sesOnfilter"
              >
                <template v-slot:append>
                  <q-dialog
                    v-model="isDialogOpen"
                    class="bg-body text-appText"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <PortDialogComp
                      :info="session"
                      :portType="portType"
                      :creditColumns="listColumns"
                      :creditRows="filteredCreditRows"
                      :debitColumns="listColumns"
                      :debitRows="filteredDebitRows"
                      :enbBtnSave="sesCanSave"
                      :creditPortIdGuide="lastCreditPort ?? ''"
                      :debitPortIdGuide="lastDebitPort ?? ''"
                      @onClickSave="saveSession"
                    ></PortDialogComp>
                  </q-dialog>
                </template>
              </ListComp>
            </div>
            <div class="col-12 col-sm-6">
              <PortSessionComp
                :details="sessionDetails"
                :isPortValid="isPortValid"
                @onSessionClick="handleSessionClick"
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
import PortSessionComp from '../../components/PortSessionComp.vue'
import PortDialogComp from '../../components/PortDialogComp.vue'
import ListComp from '../../components/utils/ListComp.vue'
import StateCtrlBtn from '../../components/utils/StateCtrlBtn.vue'
import { usePortProp } from '../../hooks/usePortProp.js'
import { usePortSession } from '../../hooks/usePortSession.js'
import { EPortType } from '../../types/myEnums.js'
import { QPopupProxy } from 'quasar'
import { getGuideRows, getPreviousUsedPortId } from '../../modules/appUtils.js'
export default defineComponent({
  name: 'PortPage',
  components: {
    PortComp,
    ListComp,
    StateCtrlBtn,
    PortSessionComp,
    PortDialogComp
  },
  props: {
    // 1. This matches the ':portType' param string from your router file
    portType: {
      type: [String, Number] as PropType<string | number | EPortType>,
      default: EPortType.CashAndDeposits
    }
  },
  data() {
    return {
      childIcon: 'mdi-widgets-outline'
    }
  },
  // 2. Accept 'props' here so we can access them dynamically
  setup(props, { emit }) {
    const myPortComp = ref<InstanceType<typeof PortComp>>()
    const useSession = usePortSession()
    const isDialogOpen = ref(false)
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
    watch(
      () => usePort.item.value.portId,
      async () => {
        useSession.portId.value = usePort.item.value.portId
        if (useSession.portId.value && useSession.portId.value !== '') {
          await useSession.initSessions()
        }
      }
    )
    // Define a clean click handler function
    const handleSessionClick = (index: number) => {
      console.log('------- click session index:', index)
      useSession.onCreateSession(index)
      isDialogOpen.value = true
    }

    // In init(), simply initialize empty slots or assign static references
    const init = async () => {
      usePort.portType.value = props.portType
      useSession.portType.value = props.portType

      usePort.clearValidate.value = () => {
        myPortComp.value?.clearValidation()
      }

      await usePort.Init()
    }
    //++++++++++++++++
    const savePort = async () => {
      const valid = await myPortComp.value?.getValidate()
      if (!valid) {
        usePort.resetDataState()
        return
      }
      usePort.onSave()
    }
    const custOption = computed(() => usePort.rawOptionToQSelectOptions('customers'))
    const brokerOption = computed(() => usePort.rawOptionToQSelectOptions('brokers'))
    const sessionDetails = computed(() =>
      useSession.getPortSessionInfo(usePort.item.value?.portSubType ?? 0)
    )
    const filteredCreditRows = computed(() =>
      getGuideRows(usePort.items.value, usePort.item.value, useSession.item.value.sessionType, true)
    )
    const filteredDebitRows = computed(() =>
      getGuideRows(
        usePort.items.value,
        usePort.item.value,
        useSession.item.value.sessionType,
        false
      )
    )
    const lastCreditPort = computed(() => {
      return getPreviousUsedPortId(
        useSession.items.value,
        usePort.item.value,
        useSession.item.value.sessionType,
        true
      )
    })
    const lastDebitPort = computed(() => {
      return getPreviousUsedPortId(
        useSession.items.value,
        usePort.item.value,
        useSession.item.value.sessionType,
        false
      )
    })

    const onSesRowClick = (row: any) => {
      if (row) {
        useSession.onRowClick(row)
        isDialogOpen.value = true
      }
    }
    return {
      splitterModel: ref(35),
      myPortComp,
      custOption,
      brokerOption,
      listColumns: usePort.listColumns,
      filteredRows: usePort.filteredRows,
      filteredCreditRows,
      filteredDebitRows,
      port: usePort.item,
      ports: usePort.items,
      rawOptions: usePort.rawOptions,
      onRowClick: usePort.onRowClick,
      onFilter: usePort.onFilter,
      onCreate: usePort.onCreatePort,
      onDelete: usePort.onDelete,
      savePort,
      onSesRowClick,
      handleSessionClick,
      isDialogOpen,
      canDelete: usePort.canDelete,
      canCreate: usePort.canCreate,
      canSave: usePort.canSave,
      isPortValid: usePort.isPortValid,
      sessionDetails,
      session: useSession.item,
      sessions: useSession.items,
      sesOnfilter: useSession.onFilter,
      sesFilterRows: useSession.filteredRows,
      sesListColumns: useSession.listColumns,
      sesCanSave: useSession.canSave,
      saveSession: useSession.onSave,
      lastCreditPort,
      lastDebitPort
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
