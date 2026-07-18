<template>
  <div class="q-pa-md">
    <q-form ref="myForm" class="q-gutter-md q-mt-sm bg-body text-appText">
      <q-card class="bg-body text-appText col-12 col-md-12">
        <q-icon class="q-ma-xs bg-body text-appText" name="mdi-account-details-outline" size="md" />

        <div class="text-subtitle1 inline-block q-ml-sm">{{ portInfo }} : {{ model.portId }}</div>
        <div class="row justify-start items-start">
          <div class="col-12 col-md-3">
            <q-input
              outlined
              v-model="model.description"
              :label="$t('Port_description')"
              label-color="appLabel"
              :hint="$t('Port_description')"
              :readonly="false"
              :rules="strRule"
              lazy-rules
              dense
              input-class="text-appText"
              class="q-ma-sm"
            >
            </q-input>
          </div>

          <div class="col-12 col-md-3">
            <q-select
              v-model="model.portType"
              label-color="appLabel"
              :label="$t('Port_type')"
              :hint="$t('Port_type')"
              :options="portTypeOption"
              :readonly="false"
              :rules="selectorRule"
              lazy-rules
              dense
              outlined
              borderless
              emit-value
              map-options
              options-dense
              popup-content-class="bg-body text-appText"
              class="q-ma-sm"
            >
            </q-select>
          </div>
          <div class="col-12 col-md-3">
            <q-input
              outlined
              v-model="model.createBy"
              :label="$t('Create_by')"
              label-color="appLabel"
              :hint="$t('Create_by')"
              :readonly="false"
              lazy-rules
              dense
              input-class="text-appText"
              class="q-ma-sm"
            >
            </q-input>
          </div>
          <div class="col-12 col-md-3">
            <q-input
              outlined
              v-model="model.createOn"
              :label="$t('Create_on')"
              label-color="appLabel"
              :hint="$t('Create_on')"
              :readonly="false"
              lazy-rules
              dense
              input-class="text-appText"
              class="q-ma-sm"
            >
            </q-input>
          </div>
        </div>
        <div class="row justify-start items-start">
          <div class="col-12 col-md-3">
            <q-input
              outlined
              v-model="model.status"
              :label="$t('Status')"
              label-color="appLabel"
              :hint="$t('Status')"
              :readonly="false"
              :rules="strRule"
              lazy-rules
              dense
              input-class="text-appText"
              class="q-ma-sm"
            >
            </q-input>
          </div>
          <div class="col-12 col-md-9">
            <q-input
              outlined
              v-model="model.remark"
              :label="$t('Remark')"
              label-color="appLabel"
              :hint="$t('Remark')"
              :readonly="false"
              :rules="strRule"
              lazy-rules
              dense
              input-class="text-appText"
              class="q-ma-sm"
            >
            </q-input>
          </div>
        </div>
        <div class="row justify-start items-start">
          <div class="col-12 col-md-3">
            <q-select
              v-model="model.customerId"
              label-color="appLabel"
              :label="$t('Customer')"
              :hint="$t('Customer')"
              :options="custOption"
              :readonly="false"
              :rules="selectorRule"
              lazy-rules
              dense
              outlined
              borderless
              emit-value
              map-options
              options-dense
              popup-content-class="bg-body text-appText"
              class="q-ma-sm"
            >
            </q-select>
          </div>
          <div class="col-12 col-md-3">
            <q-select
              v-model="model.brokerId"
              label-color="appLabel"
              :label="$t('Broker')"
              :hint="$t('Broker')"
              :options="brokerOption"
              :readonly="false"
              :rules="selectorRule"
              lazy-rules
              dense
              outlined
              borderless
              emit-value
              map-options
              options-dense
              popup-content-class="bg-body text-appText"
              class="q-ma-sm"
            >
            </q-select>
          </div>
          <div class="col-12 col-md-3">
            <q-input
              outlined
              v-model="model.amount"
              :label="$t('Amount')"
              label-color="appLabel"
              :hint="$t('Amount')"
              :readonly="true"
              lazy-rules
              dense
              input-class="text-appText"
              class="q-ma-sm"
            >
            </q-input>
          </div>
          <div class="col-12 col-md-3">
            <q-input
              outlined
              v-model="model.interest"
              :label="$t('Interest') + ' (%)'"
              label-color="appLabel"
              :hint="$t('Interest')"
              :readonly="true"
              lazy-rules
              dense
              input-class="text-appText"
              class="q-ma-sm"
            >
            </q-input>
          </div>
        </div>
        <div class="row justify-start items-start">
          <div class="col-12 col-md-3">
            <q-select
              v-model="model.paymentTerm"
              label-color="appLabel"
              :label="$t('Payment_term')"
              :hint="$t('Payment_term')"
              :options="paymentOption"
              :readonly="false"
              :rules="selectorRule"
              lazy-rules
              dense
              outlined
              borderless
              emit-value
              map-options
              options-dense
              popup-content-class="bg-body text-appText"
              class="q-ma-sm"
            >
            </q-select>
          </div>
          <div class="col-12 col-md-3">
            <q-input
              outlined
              v-model="model.paymentRate"
              :label="$t('Payment_rate')"
              label-color="appLabel"
              :hint="$t('Payment_rate')"
              :readonly="false"
              lazy-rules
              dense
              input-class="text-appText"
              class="q-ma-sm"
            >
            </q-input>
          </div>
          <div class="col-12 col-md-3">
            <q-input
              outlined
              v-model="model.period"
              :label="$t('Period')"
              label-color="appLabel"
              :hint="$t('Period')"
              :readonly="false"
              lazy-rules
              dense
              input-class="text-appText"
              class="q-ma-sm"
            >
            </q-input>
          </div>
          <div class="col-12 col-md-3">
            <q-checkbox
              :disable="false"
              :true-value="1"
              :false-value="0"
              v-model="model.isActive"
              :label="$t('Active')"
              :rules="selectorRule"
            />
          </div>
        </div>
      </q-card>
    </q-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { modelConverter, enumToString, enumToQSelectOptions } from '../modules/appUtils'
import Port from '../models/port'
import { useValidationRules } from '../hooks/useValidationRules'
import { i18n } from '../i18n'
import { EInvestPortType, EPaymentTerm } from '../types/myEnums'
import { QSelectOption } from '../types/myTypes'
export default defineComponent({
  name: 'PortComp',
  components: {},
  data() {
    return {}
  },

  props: {
    info: {
      type: Object,
      default: () => ({})
    },
    portType: {
      // Highlighted change: added String alongside Number
      type: [Number, String] as PropType<string | number | EInvestPortType>,
      default: EInvestPortType.CashAndDeposits
    },
    custOption: {
      type: Array<QSelectOption>,
      default: []
    },
    brokerOption: {
      type: Array<QSelectOption>,
      default: []
    }
  },
  setup(props, { emit }) {
    const myForm = ref()
    const { t } = i18n.global
    const rules = useValidationRules(t)

    const clearValidation = () => {
      myForm.value?.resetValidation()
    }
    const getValidate = async (): Promise<boolean> => {
      const valid = await myForm.value?.validate()
      return valid ?? false
    }

    const strRule = rules.string()
    const emailRule = rules.email()
    const creditRule = rules.floatRange(0, 1000000)
    const selectorRule = rules.enumSelect()
    //const portInfo = computed(() => enumToString(EInvestPortType, Number(props.portType)))
    return {
      model: modelConverter<Port>(props.info) ?? new Port(),
      portInfo: enumToString(EInvestPortType, Number(props.portType)),
      paymentOption: enumToQSelectOptions(EPaymentTerm),
      portTypeOption: enumToQSelectOptions(EInvestPortType),
      strRule,
      emailRule,
      creditRule,
      selectorRule,
      myForm,
      clearValidation,
      getValidate
    }
  },
  methods: {}
})
</script>
<style></style>
