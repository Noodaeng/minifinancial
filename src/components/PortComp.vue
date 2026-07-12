<template>
  <div class="q-pa-md">
    <q-form ref="myForm" class="q-gutter-md q-mt-sm bg-body text-appText">
      <q-card class="bg-body text-appText col-12 col-md-12">
        <q-icon class="q-ma-xs bg-body text-appText" name="mdi-account-details-outline" size="md" />
        <text-subtitle1
          >&nbsp;&nbsp;&nbsp;{{ $t('Port_Investments') }}:{{ model.portId }}</text-subtitle1
        >
        <div class="row justify-start items-start">
          <div class="col-12 col-md-3">
            <q-input
              outlined
              v-model="model.customerId"
              :label="$t('Card_Id')"
              label-color="appLabel"
              :hint="$t('Card_Id')"
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
            <q-input
              outlined
              v-model="model.description"
              :label="$t('Name')"
              label-color="appLabel"
              :hint="$t('Name')"
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
            <q-input
              outlined
              v-model="model.portType"
              :label="$t('Email')"
              label-color="appLabel"
              :hint="$t('Email')"
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
            <q-input
              outlined
              v-model="model.brokerId"
              :label="$t('Phone')"
              label-color="appLabel"
              :hint="$t('Phone')"
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
            <q-input
              outlined
              v-model="model.amount"
              :label="$t('Address')"
              label-color="appLabel"
              :hint="$t('Address')"
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
            <q-input
              outlined
              v-model="model.interest"
              :label="$t('Line_Id')"
              label-color="appLabel"
              :hint="$t('Line_Id')"
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
            <q-input
              outlined
              v-model="model.paymentTerm"
              :label="$t('Credit_limit')"
              label-color="appLabel"
              :hint="$t('Credit_limit')"
              :readonly="false"
              :rules="creditRule"
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
              v-model="model.paymentRate"
              :label="$t('Create_on')"
              label-color="appLabel"
              :hint="$t('Create_on')"
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
            <q-input
              outlined
              v-model="model.period"
              :label="$t('Create_on')"
              label-color="appLabel"
              :hint="$t('Create_on')"
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
              v-model="model.createBy"
              :label="$t('Remark')"
              label-color="appLabel"
              :hint="$t('Remark')"
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
              :label="$t('Remark')"
              label-color="appLabel"
              :hint="$t('Remark')"
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
              :rules="custTypeRule"
            />
          </div>
        </div>
      </q-card>
    </q-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { modelConverter, enumToQSelectOptions } from '../modules/appUtils'
import Port from '../models/port'
import { useValidationRules } from '../hooks/useValidationRules'
import { i18n } from '../i18n'
import { ECreditCustomerType, EInvestPortType } from '../types/myEnums'
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
      type: Number as PropType<EInvestPortType>,
      default: EInvestPortType.Savings
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
    const custTypeRule = rules.enumSelect()

    return {
      model: modelConverter<Port>(props.info) ?? new Port(),
      custOption: enumToQSelectOptions(ECreditCustomerType),
      strRule,
      emailRule,
      creditRule,
      custTypeRule,
      myForm,
      clearValidation,
      getValidate
    }
  },
  methods: {}
})
</script>
<style></style>
