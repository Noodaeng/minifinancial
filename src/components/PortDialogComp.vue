<template>
  <q-card class="bg-body text-appText port-popup-card">
    <!-- Header -->
    <q-card-section class="row items-center q-pb-none">
      <q-icon name="mdi-account-details-outline" size="md" color="primary" />
      <div class="text-h6 q-ml-sm">{{ sessionInfo }} : {{ localModel.sessionId || 'New' }}</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <!-- Body / Form -->
    <q-card-section class="q-pt-md">
      <q-form ref="myForm">
        <div class="row q-col-gutter-md">
          <!-- Row 1 -->
          <div class="col-12 col-sm-3 col-md-3">
            <q-input
              outlined
              v-model="localModel.portId"
              :label="$t('Port_Id')"
              label-color="appLabel"
              :hint="$t('Port_Id')"
              :rules="strRule"
              readonly
              lazy-rules
              dense
              input-class="text-appText"
            />
          </div>

          <div class="col-12 col-sm-3 col-md-3">
            <q-select
              v-model="localModel.sessionType"
              label-color="appLabel"
              :label="$t('Session_Type')"
              :hint="$t('Session_Type')"
              :options="sessionTypeOptions"
              readonly
              :rules="selectorRule"
              lazy-rules
              dense
              outlined
              emit-value
              map-options
              options-dense
              popup-content-class="bg-body text-appText"
            />
          </div>

          <div class="col-12 col-sm-3 col-md-3">
            <q-input
              outlined
              v-model="localModel.amount"
              :label="$t('Amount')"
              label-color="appLabel"
              :hint="$t('Amount')"
              :rules="amountRule"
              :readonly="visRefinal || (portType === 1 && localModel.sessionType === 0)"
              dense
              input-class="text-appText"
            />
          </div>

          <!-- Row 2 -->
          <div class="col-12 col-sm-3 col-md-3">
            <q-input
              outlined
              v-model="localModel.creditPortId"
              :label="$t('Credit_Port_Id')"
              label-color="appLabel"
              :hint="$t('Credit_Port_Id')"
              :rules="strRule"
              lazy-rules
              dense
              input-class="text-appText"
              :readonly="true"
            >
              <template v-slot:append>
                <q-icon
                  name="mdi-dots-horizontal"
                  class="bg-body text-appText cursor-pointer"
                  @click="() => popupCreditRef?.show()"
                />
                <div ref="popupAnchor">
                  <q-popup-proxy
                    class="bg-body text-appText relative-position"
                    ref="popupCreditRef"
                    anchor="center middle"
                    self="center middle"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-btn
                      icon="close"
                      flat
                      round
                      dense
                      v-close-popup
                      class="absolute-top-right z-max q-pa-none"
                      style="top: 10px; right: 10px"
                    />
                    <div class="q-pt-xl q-px-md q-pb-md">
                      <ListComp
                        :rows="filterCreditRows"
                        :columns="creditColumns"
                        :initGuide="creditPortIdGuide"
                        @onRowClick="onCreditRowClick"
                        @onFilter="onCreditFiltering"
                      ></ListComp>
                    </div>
                  </q-popup-proxy>
                </div>
              </template>
            </q-input>
          </div>

          <div class="col-12 col-sm-3 col-md-3">
            <q-input
              outlined
              v-model="localModel.debitPortId"
              :label="$t('Debit_Port_Id')"
              label-color="appLabel"
              :hint="$t('Debit_Port_Id')"
              :rules="strRule"
              lazy-rules
              dense
              :readonly="true"
              input-class="text-appText"
            >
              <template v-slot:append>
                <q-icon
                  name="mdi-dots-horizontal"
                  class="bg-body text-appText cursor-pointer"
                  @click="() => popupDebitRef?.show()"
                />
                <div ref="popupAnchor">
                  <q-popup-proxy
                    class="bg-body text-appText relative-position"
                    ref="popupDebitRef"
                    anchor="center middle"
                    self="center middle"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-btn
                      icon="close"
                      flat
                      round
                      dense
                      v-close-popup
                      class="absolute-top-right z-max q-pa-none"
                      style="top: 10px; right: 10px"
                    />
                    <div class="q-pt-xl q-px-md q-pb-md">
                      <ListComp
                        :rows="filterDebitRows"
                        :columns="debitColumns"
                        :initGuide="debitPortIdGuide"
                        @onRowClick="onDebitRowClick"
                        @onFilter="onDebitFiltering"
                      ></ListComp>
                    </div>
                  </q-popup-proxy>
                </div>
              </template>
            </q-input>
          </div>

          <!-- Fixed Date Picker Input -->
          <div class="col-12 col-sm-3 col-md-3">
            <AppDatePicker
              v-model:modelValue="localModel.createOn"
              :label="$t('Create_on')"
              :hint="$t('Create_on')"
              :rules="strRule"
              @update:modelValue="onDateSelect"
            />
          </div>
        </div>
      </q-form>
    </q-card-section>

    <!-- Re-Final Info Section -->
    <q-card-section v-if="visRefinal" class="q-pt-none">
      <q-separator class="q-mb-md" />
      <div class="text-subtitle2 text-primary q-mb-sm">Refinance Information</div>
      <div class="row q-col-gutter-md bg-body text-appText">
        <div class="col-12 col-sm-3 col-md-3">
          <q-input
            outlined
            dense
            readonly
            :model-value="reFinanceInfo.loanAmount"
            label="Loan Amount"
            label-color="appLabel"
            input-class="text-appText"
          />
        </div>
        <div class="col-12 col-sm-3 col-md-3">
          <q-input
            outlined
            dense
            readonly
            :model-value="reFinanceInfo.interest"
            label="Interest"
            label-color="appLabel"
            input-class="text-appText"
          />
        </div>
        <div class="col-12 col-sm-3 col-md-3">
          <q-input
            outlined
            dense
            readonly
            :model-value="reFinanceInfo.totalPaid"
            label="Total Paid"
            label-color="appLabel"
            input-class="text-appText"
          />
        </div>
        <div class="col-12 col-sm-3 col-md-3">
          <q-input
            outlined
            dense
            readonly
            :model-value="reFinanceInfo.shortageAmount"
            label="Shortage Amount"
            label-color="appLabel"
            input-class="text-appText"
          />
        </div>
        <div class="col-12 col-sm-3 col-md-3">
          <q-input
            outlined
            dense
            readonly
            :model-value="reFinanceInfo.paidCount"
            label="Paid Count"
            label-color="appLabel"
            input-class="text-appText"
          />
        </div>
        <div class="col-12 col-sm-3 col-md-3">
          <q-input
            outlined
            dense
            readonly
            :model-value="reFinanceInfo.startLoan"
            label="Start Loan"
            label-color="appLabel"
            input-class="text-appText"
          />
        </div>
        <div class="col-12 col-sm-3 col-md-3">
          <q-input
            outlined
            dense
            readonly
            :model-value="reFinanceInfo.lastRefinance"
            label="Last Refinance"
            label-color="appLabel"
            input-class="text-appText"
          />
        </div>
        <div class="col-12 col-sm-3 col-md-3 flex items-center">
          <q-checkbox readonly :model-value="reFinanceInfo.canRefinance" label="Can Refinance" />
        </div>
      </div>
    </q-card-section>

    <!-- Footer Actions -->
    <q-card-actions align="right" class="q-pa-md bg-body">
      <q-btn
        icon="delete"
        @click="$emit('onClickDelete')"
        :disable="!enbBtnDelete"
        unelevated
        round
        :class="[
          enbBtnDelete
            ? 'q-ma-sm shadow-3 bg-body text-appText'
            : 'q-ma-sm shadow-3 bg-body text-appLayout'
        ]"
      >
      </q-btn>
      <SaveCancelBtn
        :enbBtnDiscard="false"
        :enbBtnSave="enbBtnSave"
        @onClickSave="$emit('onClickSave')"
      />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, PropType } from 'vue'
import {
  modelConverter,
  enumToQSelectOptions,
  sessionTypeToQSelectOptions,
  getSessionType
} from '../modules/appUtils'
import Session from '../models/session'
import { useValidationRules } from '../hooks/useValidationRules'
import { i18n } from '../i18n'
import { EPortType, EPaymentPeriod } from '../types/myEnums'
import { ReFinanceInfo } from '../types/myTypes'
import ListComp from './utils/ListComp.vue'
import AppDatePicker from './utils/AppDatePicker.vue'
import SaveCancelBtn from '../components/utils/SaveCancelBtn.vue'
import { QPopupProxy, QTableColumn, date } from 'quasar'

export default defineComponent({
  name: 'PortDialogComp',
  components: { ListComp, SaveCancelBtn, AppDatePicker },

  props: {
    info: {
      type: Object,
      required: true
    },
    creditRows: {
      type: Array as () => Array<any>,
      default: () => []
    },
    creditColumns: {
      type: Array as () => Array<QTableColumn>,
      default: () => []
    },
    debitRows: {
      type: Array as () => Array<any>,
      default: () => []
    },
    debitColumns: {
      type: Array as () => Array<QTableColumn>,
      default: () => []
    },
    creditPortIdGuide: {
      type: String,
      default: ''
    },
    debitPortIdGuide: {
      type: String,
      default: ''
    },
    portType: {
      type: [Number, String] as PropType<string | number | EPortType>,
      default: EPortType.CashAndDeposits
    },
    enbBtnSave: {
      type: Boolean,
      default: false
    },
    enbBtnDelete: {
      type: Boolean,
      default: false
    },
    visRefinal: {
      type: Boolean,
      default: false
    },
    reFinanceInfo: {
      type: Object as PropType<ReFinanceInfo>,
      default: (): ReFinanceInfo => ({
        canRefinance: false,
        startLoan: '',
        loanAmount: 0,
        interest: 0,
        paidCount: 0,
        totalPaid: 0,
        lastRefinance: '',
        shortageAmount: 0,
        refinanceAmount: 0
      })
    }
  },

  emits: ['onClickSave', 'onClickDelete'],

  setup(props, { emit }) {
    const myForm = ref()
    const { t } = i18n.global
    const rules = useValidationRules(t)
    const creditFilter = ref(props.creditPortIdGuide)
    const debitFilter = ref(props.debitPortIdGuide)

    // Popup proxies
    const popupCreditRef = ref<QPopupProxy | null>(null)
    const popupDebitRef = ref<QPopupProxy | null>(null)

    // Local reactive model to safely mutate template state
    const localModel = ref<Session>(new Session())

    const syncModel = () => {
      const converted = modelConverter<Session>(props.info) ?? new Session()
      if (!converted.createOn) {
        converted.createOn = date.formatDate(Date.now(), 'DD/MM/YYYY')
      }
      if (props.visRefinal) {
        converted.amount = props.reFinanceInfo.refinanceAmount
      }
      localModel.value = converted
    }

    // Initialize state & sync on prop changes
    syncModel()
    watch(
      () => props.info,
      () => syncModel(),
      { deep: true }
    )

    // Dedicated Handler for Date Picker Selection
    const onDateSelect = (val: string | null) => {
      if (val) {
        localModel.value.createOn = val
      }
    }

    const clearValidation = () => {
      myForm.value?.resetValidation()
    }

    const getValidate = async (): Promise<boolean> => {
      const valid = await myForm.value?.validate()
      return valid ?? false
    }

    const sessionTypeOptions = computed(() => sessionTypeToQSelectOptions(props.portType))

    const sessionInfo = computed(() =>
      getSessionType(props.portType, localModel.value.sessionType ?? 0)
    )

    const onCreditRowClick = (row: any) => {
      if (localModel.value && row?.portId) {
        localModel.value.creditPortId = row.portId
        popupCreditRef.value?.hide()
      }
    }
    const onCreditFiltering = (val: string | number | null) => {
      creditFilter.value = val as string
    }

    const filterCreditRows = computed(() => {
      if (!props.creditRows || !props.creditRows.length) return []
      if (!props.creditPortIdGuide) return props.creditRows
      const filterValue = creditFilter.value.toLowerCase()
      return props.creditRows.filter(row =>
        Object.values(row).some(value => String(value).toLowerCase().includes(filterValue))
      )
    })

    const onDebitRowClick = (row: any) => {
      if (localModel.value && row?.portId) {
        localModel.value.debitPortId = row.portId
        popupDebitRef.value?.hide()
      }
    }
    const onDebitFiltering = (val: string | number | null) => {
      debitFilter.value = val as string
    }
    const filterDebitRows = computed(() => {
      if (!props.debitRows || !props.debitRows.length) return []
      if (!props.debitPortIdGuide) return props.debitRows
      const filterValue = debitFilter.value.toLowerCase()
      return props.debitRows.filter(row =>
        Object.values(row).some(value => String(value).toLowerCase().includes(filterValue))
      )
    })

    return {
      sessionInfo,
      Session,
      localModel,
      paymentOption: enumToQSelectOptions(EPaymentPeriod),
      portTypeOption: enumToQSelectOptions(EPortType),
      strRule: rules.string(),
      amountRule: rules.floatRange(1, 1000000),
      selectorRule: rules.enumSelect(),
      myForm,
      sessionTypeOptions,
      popupCreditRef,
      popupDebitRef,
      //datePopupRef,
      onDateSelect,
      modelConverter,
      clearValidation,
      getValidate,
      onCreditRowClick,
      onDebitRowClick,
      onCreditFiltering,
      onDebitFiltering,
      filterCreditRows,
      filterDebitRows,
      date
    }
  }
})
</script>

<style scoped>
.port-popup-card {
  width: 800px;
  max-width: 90vw;
  max-height: 85vh;
  overflow-y: auto;
}
</style>
