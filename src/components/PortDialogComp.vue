<template>
  <q-card class="bg-body text-appText port-popup-card">
    <!-- Header -->
    <q-card-section class="row items-center q-pb-none">
      <q-icon name="mdi-account-details-outline" size="md" color="primary" />
      <div class="text-h6 q-ml-sm">{{ portInfo }} : {{ model.sessionId || 'New' }}</div>
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
              readonly
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
                      <ListComp></ListComp>
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
                      <ListComp></ListComp>
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
              :label="$t('Create_On')"
              label-color="appLabel"
              :hint="$t('Create_On')"
              dense
              input-class="text-appText"
            />
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
  enumToString,
  enumToQSelectOptions,
  sessionTypeToQSelectOptions
} from '../modules/appUtils'
import Session from '../models/session'
import { useValidationRules } from '../hooks/useValidationRules'
import { i18n } from '../i18n'
import { EInvestPortType, EPaymentTerm } from '../types/myEnums'
import ListComp from './utils/ListComp.vue'
import SaveCancelBtn from '../components/utils/SaveCancelBtn.vue'
import { QPopupProxy } from 'quasar'
export default defineComponent({
  name: 'PortDialogComp',
  components: { ListComp, SaveCancelBtn },

  props: {
    info: {
      type: Object,
      default: () => ({})
    },
    portType: {
      type: [Number, String] as PropType<string | number | EInvestPortType>,
      default: EInvestPortType.CashAndDeposits
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
    const model = ref<Session>(modelConverter<Session>(props.info) ?? new Session())
    const popupCreditRef = ref<QPopupProxy | null>(null)
    const popupDebitRef = ref<QPopupProxy | null>(null)
    watch(
      () => props.info,
      newVal => {
        model.value = modelConverter<Session>(newVal) ?? new Session()
      },
      { deep: true }
    )

    const clearValidation = () => {
      myForm.value?.resetValidation()
    }

    const getValidate = async (): Promise<boolean> => {
      const valid = await myForm.value?.validate()
      return valid ?? false
    }

    const portInfo = computed(() => enumToString(EInvestPortType, Number(props.portType)))
    const sessionTypeOptions = computed(() => sessionTypeToQSelectOptions(props.portType))
    return {
      model,
      portInfo,
      paymentOption: enumToQSelectOptions(EPaymentTerm),
      portTypeOption: enumToQSelectOptions(EInvestPortType),
      strRule: rules.string(),
      emailRule: rules.email(),
      amountRule: rules.floatRange(0, 1000000),
      selectorRule: rules.enumSelect(),
      checkboxRule: rules.integer(),
      myForm,
      sessionTypeOptions,
      popupCreditRef,
      popupDebitRef,
      clearValidation,
      getValidate
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
</style>
