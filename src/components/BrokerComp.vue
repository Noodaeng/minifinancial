<template>
  <div class="q-pa-md">
    <q-form ref="myForm" class="q-gutter-md q-mt-sm bg-body text-appText">
      <q-card class="bg-body text-appText col-12 col-md-12">
        <q-icon class="q-ma-xs bg-body text-appText" name="mdi-account-details-outline" size="md" />
        <div class="text-subtitle1 inline-block q-ml-sm">
          {{ $t('Broker_Accounts') }}: {{ model?.brokerId }}
        </div>
        <div class="row justify-start items-start">
          <div class="col-12 col-md-3">
            <q-input
              outlined
              v-model="model.cardId"
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
              v-model="model.name"
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
              v-model="model.email"
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
              v-model="model.phone"
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
              v-model="model.address"
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
              v-model="model.lineId"
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
              v-model="model.creditLimit"
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
              v-model="model.createOn"
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
            <q-select
              v-model="model.brokerType"
              label-color="appLabel"
              :label="$t('Customer_category')"
              :hint="$t('Customer_category')"
              :options="custOption"
              :readonly="false"
              :rules="custTypeRule"
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
          <div class="col-12 col-md-6">
            <q-input
              outlined
              v-model="model.remark"
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
import { defineComponent, ref } from 'vue'
import { modelConverter, enumToQSelectOptions } from '../modules/appUtils'
import Broker from '../models/broker'
import { useValidationRules } from '../hooks/useValidationRules'
import { i18n } from '../i18n'
import { ECreditCustomerType } from '../types/myEnums'
export default defineComponent({
  name: 'BrokerComp',
  components: {},
  data() {
    return {}
  },

  props: {
    info: {
      type: Object,
      default: () => ({})
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
      model: modelConverter<Broker>(props.info) ?? new Broker(),
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
