<template>
  <div class="q-pa-md">
    <q-form ref="myForm" class="bg-body text-appText">
      <q-card flat class="bg-body text-appText col-12">
        <div class="row items-center q-mb-md">
          <q-icon name="mdi-account-details-outline" size="md" />
          <div class="text-subtitle1 q-ml-sm">{{ portInfo }} : {{ model.portId }}</div>
        </div>

        <!-- Using q-col-gutter-md manages padding between controls fluidly -->
        <div class="row q-col-gutter-md">
          <!-- Row 1 Items -->
          <div class="col-12 col-sm-6 col-md-4">
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

          <div class="col-12 col-sm-6 col-md-4">
            <q-select
              v-model="model.portType"
              label-color="appLabel"
              :label="$t('Port_type')"
              :hint="$t('Port_type')"
              :options="portTypeOption"
              :readonly="true"
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

          <div class="col-12 col-sm-6 col-md-4">
            <q-input
              outlined
              v-model="model.createOn"
              :label="$t('Create_on')"
              label-color="appLabel"
              :hint="$t('Create_on')"
              :readonly="true"
              dense
              input-class="text-appText"
            />
          </div>

          <!-- Row 2 Items -->
          <div class="col-12 col-sm-6 col-md-4">
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

          <!-- Remark can scale wider on desktop screens -->
          <div class="col-12 col-md-8">
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

          <!-- Row 3 Items -->
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

          <!-- Row 4 Items -->
          <div class="col-12 col-sm-4 col-md-4">
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

          <div class="col-12 col-sm-4 col-md-4">
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

          <div class="col-12 col-sm-4 col-md-4 flex items-center justify-between">
            <q-input
              outlined
              v-model="model.period"
              :label="$t('Period')"
              label-color="appLabel"
              :hint="$t('Period')"
              dense
              input-class="text-appText"
              class="full-width q-mb-sm"
            />
            <q-checkbox
              :true-value="1"
              :false-value="0"
              v-model="model.isActive"
              :label="$t('Active')"
              :rules="checkboxRule"
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
    const checkboxRule = rules.integer()
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
      checkboxRule,
      clearValidation,
      getValidate
    }
  },
  methods: {}
})
</script>
<style></style>
