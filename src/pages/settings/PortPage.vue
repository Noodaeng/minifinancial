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
                @onFilter="useSession.onFilter"
              >
                <template v-slot:append>
                  <div ref="popupAnchor">
                    <q-popup-proxy
                      class="bg-body text-appText"
                      ref="popupRef"
                      anchor="center middle"
                      self="center middle"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <PortDialogComp
                        :info="useSession.item"
                        :portType="portType"
                        :creditColumns="listColumns"
                        :debitColumns="listColumns"
                        :enbBtnSave="sesCanSave"
                      ></PortDialogComp>
                    </q-popup-proxy>
                  </div>
                </template>
              </ListComp>
            </div>
            <div class="col-12 col-sm-6">
              <PortSessionComp :details="sessionDetails" />
            </div>
          </div>
        </q-card>
      </div>
    </div>
    {{ sessions }}
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
import { EInvestPortType } from '../../types/myEnums.js'
import { QPopupProxy } from 'quasar'
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
    const myPortComp = ref<InstanceType<typeof PortComp>>()
    const useSession = usePortSession()
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
    const init = async () => {
      usePort.portType.value = props.portType
      useSession.portType.value = props.portType
      usePort.clearValidate.value = () => {
        myPortComp.value?.clearValidation()
      }

      useSession.sessionClicks.value[0] = () => {
        console.log('tesssssssssss-------..cccclllliiiccckk')
      }

      await usePort.Init()
    }

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
    const sessionDetails = computed(() => useSession.getPortSessionInfo())
    const popupRef = ref<QPopupProxy | null>(null)
    const popupAnchor = ref<HTMLElement | null>(null)
    const onSesRowClick = (row: any) => {
      if (row) {
        useSession.onRowClick(row)
        popupRef.value?.show()
      }
    }
    return {
      splitterModel: ref(35),
      myPortComp,
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
      savePort,
      onSesRowClick,
      popupRef,
      popupAnchor,
      canDelete: usePort.canDelete,
      canCreate: usePort.canCreate,
      canSave: usePort.canSave,
      state: usePort.state,
      sessionDetails,
      useSession,
      sessions: useSession.items,
      sesFilterRows: useSession.filteredRows,
      sesListColumns: useSession.listColumns,
      sesCanSave: useSession.canSave
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
