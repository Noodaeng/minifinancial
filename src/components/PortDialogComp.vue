<template>
  <q-card class="bg-body text-appText port-popup-card">
    <!-- Header -->
    <q-card-section class="row items-center q-pb-none">
      <q-icon name="mdi-account-details-outline" size="md" color="primary" />
      <div class="text-h6 q-ml-sm">{{ portInfo }} : {{ model.portId || 'New' }}</div>
      <q-space />
      <!-- v-close-popup works automatically inside q-popup-proxy -->
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <!-- Body / Form -->
    <q-card-section class="q-pt-md">
      <q-form ref="myForm">
        <div class="row q-col-gutter-md">
          <!-- Row 1 -->
          <div class="col-12 col-sm-6 col-md-6">
            <q-input
              outlined
              v-model="model.description"
              :label="$t('Port_description')"
              label-color="appLabel"
              :hint="$t('Port_description')"
              :rules="strRule"
              lazy-rules
              dense
              input-class="text-appText"
            />
          </div>

          <div class="col-12 col-sm-6 col-md-3">
            <q-select
              v-model="model.portType"
              label-color="appLabel"
              :label="$t('Port_type')"
              :hint="$t('Port_type')"
              :options="portTypeOption"
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

          <div class="col-12 col-sm-6 col-md-3">
            <q-input
              outlined
              v-model="model.createOn"
              :label="$t('Create_on')"
              label-color="appLabel"
              :hint="$t('Create_on')"
              readonly
              dense
              input-class="text-appText"
            />
          </div>

          <!-- Row 2 -->
          <div class="col-12 col-sm-6 col-md-3">
            <q-input
              outlined
              v-model="model.status"
              :label="$t('Status')"
              label-color="appLabel"
              :hint="$t('Status')"
              :rules="strRule"
              lazy-rules
              dense
              input-class="text-appText"
            />
          </div>

          <div class="col-12 col-sm-6 col-md-9">
            <q-input
              outlined
              v-model="model.remark"
              :label="$t('Remark')"
              label-color="appLabel"
              :hint="$t('Remark')"
              :rules="strRule"
              lazy-rules
              dense
              input-class="text-appText"
            />
          </div>

          <!-- Row 3 -->
          <div class="col-12 col-sm-6 col-md-3">
            <q-select
              v-model="model.customerId"
              label-color="appLabel"
              :label="$t('Customer')"
              :hint="$t('Customer')"
              :options="custOption"
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

          <div class="col-12 col-sm-6 col-md-3">
            <q-select
              v-model="model.brokerId"
              label-color="appLabel"
              :label="$t('Broker')"
              :hint="$t('Broker')"
              :options="brokerOption"
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

          <div class="col-12 col-sm-6 col-md-3">
            <q-input
              outlined
              v-model="model.amount"
              :label="$t('Amount')"
              label-color="appLabel"
              :hint="$t('Amount')"
              dense
              input-class="text-appText"
            />
          </div>

          <div class="col-12 col-sm-6 col-md-3">
            <q-input
              outlined
              v-model="model.interest"
              :label="$t('Interest') + ' (%)'"
              label-color="appLabel"
              :hint="$t('Interest')"
              dense
              input-class="text-appText"
            />
          </div>

          <!-- Row 4 -->
          <div class="col-12 col-sm-6 col-md-3">
            <q-select
              v-model="model.paymentTerm"
              label-color="appLabel"
              :label="$t('Payment_term')"
              :hint="$t('Payment_term')"
              :options="paymentOption"
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

          <div class="col-12 col-sm-6 col-md-3">
            <q-input
              outlined
              v-model="model.paymentRate"
              :label="$t('Payment_rate')"
              label-color="appLabel"
              :hint="$t('Payment_rate')"
              dense
              input-class="text-appText"
            />
          </div>

          <div class="col-12 col-sm-6 col-md-3">
            <q-input
              outlined
              v-model="model.period"
              :label="$t('Period')"
              label-color="appLabel"
              :hint="$t('Period')"
              dense
              input-class="text-appText"
            />
          </div>

          <div class="col-12 col-sm-6 col-md-3 flex items-center">
            <q-checkbox
              :true-value="1"
              :false-value="0"
              v-model="model.isActive"
              :label="$t('Active')"
              :rules="checkboxRule"
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
import { modelConverter, enumToString, enumToQSelectOptions } from '../modules/appUtils'
import Port from '../models/port'
import { useValidationRules } from '../hooks/useValidationRules'
import { i18n } from '../i18n'
import { EInvestPortType, EPaymentTerm } from '../types/myEnums'
import { QSelectOption } from '../types/myTypes'
import SaveCancelBtn from '../components/utils/SaveCancelBtn.vue'

export default defineComponent({
  name: 'PortDialogComp',
  components: { SaveCancelBtn },

  props: {
    info: {
      type: Object,
      default: () => ({})
    },
    portType: {
      type: [Number, String] as PropType<string | number | EInvestPortType>,
      default: EInvestPortType.CashAndDeposits
    },
    custOption: {
      type: Array as PropType<QSelectOption[]>,
      default: () => []
    },
    brokerOption: {
      type: Array as PropType<QSelectOption[]>,
      default: () => []
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
    const model = ref<Port>(modelConverter<Port>(props.info) ?? new Port())

    watch(
      () => props.info,
      newVal => {
        model.value = modelConverter<Port>(newVal) ?? new Port()
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

    return {
      model,
      portInfo,
      paymentOption: enumToQSelectOptions(EPaymentTerm),
      portTypeOption: enumToQSelectOptions(EInvestPortType),
      strRule: rules.string(),
      emailRule: rules.email(),
      creditRule: rules.floatRange(0, 1000000),
      selectorRule: rules.enumSelect(),
      checkboxRule: rules.integer(),
      myForm,
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
</style>
