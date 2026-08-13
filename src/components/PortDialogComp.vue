<template>
  <q-card class="bg-body text-appText port-popup-card">
    <!-- Header -->
    <q-card-section class="row items-center q-pb-none">
      <q-icon name="mdi-account-details-outline" size="md" color="primary" />
      <div class="text-h6 q-ml-sm">{{ sessionInfo }} : {{ model.sessionId || 'New' }}</div>
      <q-space />
      <!-- v-close-popup works automatically inside q-popup-proxy -->
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
              v-model="model.portId"
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
              v-model="model.sessionType"
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
              v-model="model.amount"
              :label="$t('Amount')"
              label-color="appLabel"
              :hint="$t('Amount')"
              :rules="amountRule"
              :readonly="false"
              dense
              input-class="text-appText"
            />
          </div>

          <!-- Row 2 -->
          <div class="col-12 col-sm-3 col-md-3">
            <q-input
              outlined
              v-model="model.creditPortId"
              :label="$t('Credit_Port_Id')"
              label-color="appLabel"
              :hint="$t('Credit_Port_Id')"
              :rules="strRule"
              lazy-rules
              dense
              input-class="text-appText"
              :readonly="true"
              ><template v-slot:append>
                <q-icon
                  name="mdi-dots-horizontal"
                  class="bg-body text-appText"
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
                    <!-- Padding container to push ListComp below the button -->
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
                </div> </template
            ></q-input>
          </div>

          <div class="col-12 col-sm-3 col-md-3">
            <q-input
              outlined
              v-model="model.debitPortId"
              :label="$t('Debit_Port_Id')"
              label-color="appLabel"
              :hint="$t('Debit_Port_Id')"
              :rules="strRule"
              lazy-rules
              dense
              :readonly="true"
              input-class="text-appText"
              ><template v-slot:append>
                <q-icon
                  name="mdi-dots-horizontal"
                  class="bg-body text-appText"
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
                    <!-- Absolute top-right close button -->
                    <q-btn
                      icon="close"
                      flat
                      round
                      dense
                      v-close-popup
                      class="absolute-top-right z-max q-pa-none"
                      style="top: 10px; right: 10px"
                    />

                    <!-- Padding container to push ListComp below the button -->
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

          <div class="col-12 col-sm-3 col-md-3">
            <q-input
              outlined
              v-model="model.createOn"
              mask="##/##/####"
              :label="$t('Create_On')"
              label-color="appLabel"
              :hint="$t('Create_On')"
              :rules="strRule"
              dense
              readonly
              input-class="text-appText"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="model.createOn" mask="DD/MM/YYYY" class="bg-body text-appText">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
      </q-form>
    </q-card-section>

    <!-- Footer Actions -->
    <q-card-actions align="right" class="q-pa-md bg-body">
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
import ListComp from './utils/ListComp.vue'
import SaveCancelBtn from '../components/utils/SaveCancelBtn.vue'
import { QPopupProxy, QTableColumn, date } from 'quasar'

export default defineComponent({
  name: 'PortDialogComp',
  components: { ListComp, SaveCancelBtn },

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
    }
  },

  emits: ['onClickSave'],

  setup(props, { emit }) {
    const myForm = ref()
    const { t } = i18n.global
    const rules = useValidationRules(t)
    const creditFilter = ref(props.creditPortIdGuide)
    const debitFilter = ref(props.debitPortIdGuide)
    const model = computed(() => modelConverter<Session>(props.info) ?? new Session())

    if (!model.value.createOn) {
      model.value.createOn = date.formatDate(Date.now(), 'DD/MM/YYYY')
    }

    const popupCreditRef = ref<QPopupProxy | null>(null)
    const popupDebitRef = ref<QPopupProxy | null>(null)

    const clearValidation = () => {
      myForm.value?.resetValidation()
    }

    const getValidate = async (): Promise<boolean> => {
      const valid = await myForm.value?.validate()
      return valid ?? false
    }

    const sessionTypeOptions = computed(() => sessionTypeToQSelectOptions(props.portType))

    const sessionInfo = computed(() =>
      getSessionType(props.portType, modelConverter<Session>(props.info)?.sessionType ?? 0)
    )

    const onCreditRowClick = (row: any) => {
      if (model.value && row?.portId) {
        model.value.creditPortId = row.portId
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
      if (model.value && row?.portId) {
        model.value.debitPortId = row.portId
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
      model,
      paymentOption: enumToQSelectOptions(EPaymentPeriod),
      portTypeOption: enumToQSelectOptions(EPortType),
      strRule: rules.string(),
      amountRule: rules.floatRange(0, 1000000),
      selectorRule: rules.enumSelect(),
      myForm,
      sessionTypeOptions,
      popupCreditRef,
      popupDebitRef,
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
::v-deep(.q-select .q-field__native) {
  color: var(--q-color-appText); /* or your custom color */
}
/* Scoped or global */
::v-deep(.q-date__header) {
  background-color: var(--q-body); /* your custom background */
  color: var(--q-appText); /* your custom text color */
}

/* If you want to style the year/date text separately */
::v-deep(.q-date__header-title) {
  color: var(--q-appText); /* text color for "2026" */
}

::v-deep(.q-date__header-subtitle) {
  color: var(--q-appText); /* text color for "Mon, Aug 17" */
}
</style>
