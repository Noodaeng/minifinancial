<template>
  <q-page class="bg-body text-appText q-pa-md">
    <div class="row q-col-gutter-md items-stretch">
      <!-- LEFT SIDE: Controls, Port List, and Session Summary -->
      <div class="col-12 col-md-4 col-lg-3 column">
        <q-card class="bg-body text-appText flat bordered full-height-card column no-wrap fit">
          <!-- Top Controls -->
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

          <!-- Dynamic Port List (Expands to fill remaining vertical height) -->
          <div class="col scroll">
            <ListComp
              :rows="filteredRows"
              :columns="listColumns"
              @onRowClick="onRowClick"
              @onFilter="onFilter"
            />
          </div>

          <q-separator />

          <!-- Pinned Bottom Session Summary -->
          <div class="q-pa-xs bg-surface">
            <PortTypeSessionComp :sessionTypeSummaries="sessionTypeSummaries" :portType="portType">
              <template #append>
                <EntryTypeComp :portType="portType" :sessionSummaries="sessionTypeEntries" />
              </template>
            </PortTypeSessionComp>
          </div>
        </q-card>
      </div>

      <!-- RIGHT SIDE: Port Form & Session Details -->
      <div class="col-12 col-md-8 col-lg-9 column">
        <q-card
          class="bg-body text-appText flat bordered full-height-card q-pa-md fit column no-wrap"
        >
          <!-- Top Port Component Form -->
          <PortComp
            ref="myPortComp"
            :custOption="custOption"
            :brokerOption="brokerOption"
            :portType="portType"
            :info="port"
            :enbBtnSave="canSave"
            :childIcon="childIcon"
            :interestGuides="interestGuides"
            :descriptionGuides="descriptionGuides"
            :periodGuides="periodGuides"
            :paymentRateGuides="paymentRateGuides"
            @onClickSave="savePort"
            class="q-mb-md"
          />

          <!-- Responsive Split View for Sessions & Session Details -->
          <div class="row q-col-gutter-md col">
            <!-- Left Half: Session List (Given more width for table columns) -->
            <div class="col-12 col-lg-7 col-xl-8 column">
              <div class="col scroll">
                <ListComp
                  :rows="sesFilterRows"
                  :columns="sesListColumns"
                  @onRowClick="onSesRowClick"
                  @onFilter="sesOnfilter"
                >
                  <!-- Inject buttons directly into the append slot -->
                  <template #append>
                    <!-- Export Buttons -->
                    <ExportBtnGroup
                      :rows="sesFilterRows"
                      :columns="sesListColumns"
                      :enable-export="true"
                      :title="getTitle"
                      :file-name="getPortFileName"
                    />
                  </template>
                </ListComp>
              </div>
            </div>

            <!-- Right Half: Session Card Details (Given appropriate summary width) -->
            <div class="col-12 col-lg-5 col-xl-4 column">
              <div class="col scroll">
                <PortSessionComp
                  :details="sessionDetails"
                  :portSessionSummaries="sessionSummaries"
                  :isPortValid="isPortValid"
                  @onSessionClick="handleSessionClick"
                >
                  <template #append>
                    <EntryTypeComp :portType="portType" :sessionSummaries="sessionEntries" />
                  </template>
                </PortSessionComp>
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </div>

    <!-- Root Level Dialog for Session Editing/Creation -->
    <q-dialog
      v-model="isDialogOpen"
      class="bg-body text-appText"
      transition-show="scale"
      transition-hide="scale"
      @before-hide="onBeforeDialogHide"
    >
      <PortDialogComp
        ref="myDiaComp"
        :info="session"
        :portType="portType"
        :creditColumns="listColumns"
        :creditRows="filteredCreditRows"
        :debitColumns="listColumns"
        :debitRows="filteredDebitRows"
        :enbBtnSave="sesCanSave"
        :enbBtnDelete="sesCanDelete"
        :visRefinal="visRefinal"
        :reFinanceInfo="reFinanceInfo"
        :creditPortIdGuide="lastCreditPort ?? ''"
        :debitPortIdGuide="lastDebitPort ?? ''"
        @onClickSave="saveSession"
        @onClickDelete="deleteSession"
      />
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType, watch, computed } from 'vue'
import PortComp from '../../components/PortComp.vue'
import PortSessionComp from '../../components/PortSessionComp.vue'
import PortDialogComp from '../../components/PortDialogComp.vue'
import ListComp from '../../components/utils/ListComp.vue'
import ExportBtnGroup from '../../components/utils/ExportBtnGroup.vue'
import PortTypeSessionComp from '../../components/PortTypeSessionComp.vue'
import StateCtrlBtn from '../../components/utils/StateCtrlBtn.vue'
import EntryTypeComp from '../../components/utils/EntryTypeComp.vue'
import { usePortProp } from '../../hooks/usePortProp.js'
import { usePortSession } from '../../hooks/usePortSession.js'
import { EPortType } from '../../types/myEnums.js'
import {
  getGuideRows,
  getPreviousUsedPortId,
  getPortSessionInfo,
  getRefinanceInfo,
  canCreateSession
} from '../../modules/appUtils.js'
export default defineComponent({
  name: 'PortPage',
  components: {
    PortComp,
    ListComp,
    StateCtrlBtn,
    PortSessionComp,
    PortDialogComp,
    PortTypeSessionComp,
    ExportBtnGroup,
    EntryTypeComp
  },
  props: {
    portType: {
      type: [String, Number] as PropType<string | number | EPortType>,
      default: EPortType.CashAndDeposits
    },
    childIcon: {
      type: String,
      default: 'mdi-widgets-outline'
    }
  },
  data() {
    return {}
  },
  setup(props, { emit }) {
    const myPortComp = ref<InstanceType<typeof PortComp>>()
    const myDiaComp = ref<InstanceType<typeof PortDialogComp>>()
    const useSession = usePortSession()
    const isDialogOpen = ref(false)
    const usePort = usePortProp()
    const sessionType = ref(0)
    onMounted(async () => {
      await usePort.initOtherList()
      await init()
      await usePort.updateSessionSummaries()
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
        await usePort.updateSessionSummaries()
      }
    )

    const init = async () => {
      usePort.portType.value = props.portType
      useSession.portType.value = props.portType

      usePort.clearValidate.value = () => {
        myPortComp.value?.clearValidation()
      }
      usePort.items.value = []
      useSession.items.value = []
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

    const saveSession = async () => {
      const valid = await myDiaComp.value?.getValidate()
      if (!valid) {
        useSession.resetDataState()
        return
      }
      await useSession.onSave()
      isDialogOpen.value = false

      await usePort.getSessionTypesByPortType()
      await usePort.updateSessionSummaries()
      await useSession.initSessions()
    }
    const deleteSession = async () => {
      await useSession.onDelete()
      isDialogOpen.value = false

      await usePort.getSessionTypesByPortType()
      await usePort.updateSessionSummaries()
      await useSession.initSessions()
    }

    const custOption = computed(() => usePort.rawOptionToQSelectOptions('customers'))
    const brokerOption = computed(() => usePort.rawOptionToQSelectOptions('brokers'))
    const sessionDetails = computed(() =>
      getPortSessionInfo(props.portType, usePort.item.value?.portSubType ?? 0)
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
    const handleSessionClick = (index: number) => {
      useSession.onCreateSession(index, usePort.item.value)
      sessionType.value = useSession.item.value.sessionType
      isDialogOpen.value = canCreateSession(useSession.items.value, index, usePort.item.value)
      if (isDialogOpen.value) {
        useSession.item.value.creditPortId = lastCreditPort.value ?? ''
        useSession.item.value.debitPortId = lastDebitPort.value ?? ''
      }
    }
    const onSesRowClick = (row: any) => {
      if (row) {
        useSession.onRowClick(row)
        isDialogOpen.value = true
        sessionType.value = useSession.item.value.sessionType
      }
    }
    const visRefinal = computed(() => {
      return (
        [1].includes(Number(props.portType)) &&
        [0].includes(usePort.item.value.paymentTerm) &&
        [4].includes(useSession.item.value.sessionType)
      )
    })
    const reFinanceInfo = computed(() =>
      getRefinanceInfo(useSession.items.value, usePort.item.value, visRefinal.value)
    )
    const onBeforeDialogHide = () => {
      useSession.resetDataState()
    }
    const getTitle = computed(() => {
      if (!usePort.item.value) return ':-'
      return (
        usePort.item.value.portId +
        ':' +
        usePort.item.value.description +
        ',' +
        usePort.item.value.customerName
      )
    })
    const sessionTypeSummaries = computed(() =>
      usePort.portTypeSummaries?.value.filter(t => t.sessionType < 100)
    )
    const sessionTypeEntries = computed(() =>
      usePort.portTypeSummaries?.value.filter(t => t.sessionType > 500)
    )
    const sessionSummaries = computed(() =>
      usePort.portSessionSummaries?.value.filter(t => t.sessionType < 100)
    )
    const sessionEntries = computed(() =>
      usePort.portSessionSummaries?.value.filter(t => t.sessionType > 500)
    )
    const getPortFileName = computed(() => {
      const uniqueKey = Date.now() // Or any dynamic key generator (e.g., crypto.randomUUID())
      const portId = usePort.item?.value?.portId ?? ''

      return `${portId}_${uniqueKey}`
    })

    return {
      splitterModel: ref(35),
      myPortComp,
      myDiaComp,
      custOption,
      brokerOption,
      listColumns: usePort.listColumns,
      filteredRows: usePort.filteredRows,
      filteredCreditRows,
      filteredDebitRows,
      port: usePort.item,
      ports: usePort.items,
      rawOptions: usePort.rawOptions,
      sessionTypeSummaries,
      sessionTypeEntries,
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
      sessionType,
      sesOnfilter: useSession.onFilter,
      sesFilterRows: useSession.filteredRows,
      sesListColumns: useSession.listColumns,
      sesCanSave: useSession.canSave,
      sesCanDelete: useSession.canDelete,
      deleteSession,
      saveSession,
      onBeforeDialogHide,
      lastCreditPort,
      lastDebitPort,
      sessionSummaries,
      sessionEntries,
      interestGuides: usePort.interestGuides,
      descriptionGuides: usePort.descriptionGuides,
      periodGuides: usePort.periodGuides,
      paymentRateGuides: usePort.paymentRateGuides,
      visRefinal,
      reFinanceInfo,
      getTitle,
      getPortFileName
    }
  }
})
</script>

<style lang="sass" scoped>
.full-height-card
  min-height: 80vh
  display: flex
  flex-direction: column

.scroll
  overflow-y: auto

@media (max-width: $breakpoint-xs-max)
  .full-height-card
    min-height: auto
</style>
