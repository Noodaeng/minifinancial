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
                        :rows="creditRows"
                        :columns="creditColumns"
                        :initGuide="creditPortIdGuide"
                        @onRowClick="onCreditRowClick"
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
                        :rows="debitRows"
                        :columns="debitColumns"
                        :initGuide="debitPortIdGuide"
                        @onRowClick="onDebitRowClick"
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
              v-model="model.createBy"
              :label="$t('Create_By')"
              label-color="appLabel"
              :hint="$t('Create_By')"
              dense
              input-class="text-appText"
            />
          </div>
          <div class="col-12 col-sm-3 col-md-3">
            <q-input
              outlined
              v-model="model.createOn"
              mask="date"
              :label="$t('Create_On')"
              label-color="appLabel"
              :hint="$t('Create_On')"
              :readonly="true"
              dense
              input-class="text-appText"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date
                      v-model="rawDate"
                      class="bg-body text-appText"
                      @update:model-value="
                        val => {
                          rawDate = val
                          model.createOn = date.formatDate(val, 'DD/MM/YYYY')
                        }
                      "
                    >
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" flat />
                      </div>
                    </q-date>
                    <p>Stored date: {{ model.createOn }}</p>
                    <p>Internal date: {{ rawDate }}</p>
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
  getSessionType,
  formatBangkokDateTime
} from '../modules/appUtils'
import Session from '../models/session'
import { useValidationRules } from '../hooks/useValidationRules'
import { i18n } from '../i18n'
import { EPortType, EPaymentTerm } from '../types/myEnums'
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

  setup(props) {
    const myForm = ref()
    const { t } = i18n.global
    const rules = useValidationRules(t)

    // Keep form state synchronized when selection changes

    const model = computed(() => modelConverter<Session>(props.info) ?? new Session())

    const rawDate = ref(
      model.value?.createOn
        ? date.formatDate(new Date(model.value.createOn), 'YYYY/MM/DD')
        : date.formatDate(new Date(), 'YYYY/MM/DD')
    )

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
        console.log('onCreditRowClick --------->', model.value.creditPortId)
      }
    }

    const onDebitRowClick = (row: any) => {
      if (model.value && row?.portId) {
        model.value.debitPortId = row.portId
        popupDebitRef.value?.hide()
        console.log('onDebitRowClick --------->', model.value.debitPortId)
      }
    }
    return {
      sessionInfo,
      Session,
      model,
      paymentOption: enumToQSelectOptions(EPaymentTerm),
      portTypeOption: enumToQSelectOptions(EPortType),
      strRule: rules.string(),
      emailRule: rules.email(),
      amountRule: rules.floatRange(0, 1000000),
      selectorRule: rules.enumSelect(),
      checkboxRule: rules.integer(),
      myForm,
      sessionTypeOptions,
      popupCreditRef,
      popupDebitRef,
      modelConverter,
      clearValidation,
      getValidate,
      onCreditRowClick,
      onDebitRowClick,
      formatBangkokDateTime,
      date,
      rawDate
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
