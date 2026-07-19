<template>
  <div class="q-pa-md">
    <q-form ref="myForm" class="bg-body text-appText">
      <q-card flat class="bg-body text-appText col-12">
        <!-- Form Context Header -->
        <div class="row items-center q-mb-md">
          <q-icon name="mdi-account-details-outline" size="md" />
          <div class="text-subtitle1 q-ml-sm">
            {{ $t('Broker_Accounts') }}: {{ model?.brokerId }}
          </div>
        </div>

        <!-- Coordinated Gutter Layout Grid -->
        <div class="row q-col-gutter-md">
          <!-- Column row-clump 1 -->
          <div class="col-12 col-sm-6 col-md-3">
            <q-input
              outlined
              v-model="model.cardId"
              :label="$t('Card_Id')"
              label-color="appLabel"
              :hint="$t('Card_Id')"
              :rules="strRule"
              lazy-rules
              dense
              input-class="text-appText"
            />
          </div>

          <div class="col-12 col-sm-6 col-md-3">
            <q-input
              outlined
              v-model="model.name"
              :label="$t('Name')"
              label-color="appLabel"
              :hint="$t('Name')"
              :rules="strRule"
              lazy-rules
              dense
              input-class="text-appText"
            />
          </div>

          <div class="col-12 col-sm-6 col-md-3">
            <q-input
              outlined
              v-model="model.email"
              :label="$t('Email')"
              label-color="appLabel"
              :hint="$t('Email')"
              lazy-rules
              dense
              input-class="text-appText"
            />
          </div>

          <div class="col-12 col-sm-6 col-md-3">
            <q-input
              outlined
              v-model="model.phone"
              :label="$t('Phone')"
              label-color="appLabel"
              :hint="$t('Phone')"
              :rules="strRule"
              lazy-rules
              dense
              input-class="text-appText"
            />
          </div>

          <!-- Column row-clump 2 -->
          <div class="col-12 col-sm-6 col-md-3">
            <q-input
              outlined
              v-model="model.address"
              :label="$t('Address')"
              label-color="appLabel"
              :hint="$t('Address')"
              :rules="strRule"
              lazy-rules
              dense
              input-class="text-appText"
            />
          </div>

          <div class="col-12 col-sm-6 col-md-3">
            <q-input
              outlined
              v-model="model.lineId"
              :label="$t('Line_Id')"
              label-color="appLabel"
              :hint="$t('Line_Id')"
              :rules="strRule"
              lazy-rules
              dense
              input-class="text-appText"
            />
          </div>

          <div class="col-12 col-sm-6 col-md-3">
            <q-input
              outlined
              v-model="model.creditLimit"
              :label="$t('Credit_limit')"
              label-color="appLabel"
              :hint="$t('Credit_limit')"
              :rules="creditRule"
              lazy-rules
              dense
              input-class="text-appText"
            />
          </div>

          <div class="col-12 col-sm-6 col-md-3">
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

          <!-- Column row-clump 3 -->
          <div class="col-12 col-sm-6 col-md-3">
            <q-select
              v-model="model.brokerType"
              label-color="appLabel"
              :label="$t('Customer_category')"
              :hint="$t('Customer_category')"
              :options="custOption"
              :rules="custTypeRule"
              lazy-rules
              dense
              outlined
              emit-value
              map-options
              options-dense
              popup-content-class="bg-body text-appText"
            />
          </div>

          <div class="col-12 col-sm-6 col-md-6">
            <q-input
              outlined
              v-model="model.remark"
              :label="$t('Remark')"
              label-color="appLabel"
              :hint="$t('Remark')"
              dense
              input-class="text-appText"
            />
          </div>

          <div class="col-12 col-sm-12 col-md-3 flex items-center justify-start q-pt-sm">
            <q-checkbox
              :true-value="1"
              :false-value="0"
              v-model="model.isActive"
              :label="$t('Active')"
              :rules="checkboxRule"
            />
          </div>
        </div>
        <div class="row justify-end items-center q-mt-sm">
          <div class="col-12 col-sm-auto bg-body text-appText">
            <SaveCancelBtn
              class="full-width"
              :enbBtnDiscard="false"
              :enbBtnSave="enbBtnSave"
              @onClickSave="$emit('onClickSave')"
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
import SaveCancelBtn from '../components/utils/SaveCancelBtn.vue'
export default defineComponent({
  name: 'BrokerComp',
  components: { SaveCancelBtn },
  props: {
    info: {
      type: Object,
      default: () => ({})
    },
    enbBtnSave: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
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
    const checkboxRule = rules.integer()

    return {
      model: modelConverter<Broker>(props.info) ?? new Broker(),
      custOption: enumToQSelectOptions(ECreditCustomerType),
      strRule,
      emailRule,
      creditRule,
      custTypeRule,
      checkboxRule,
      myForm,
      clearValidation,
      getValidate
    }
  }
})
</script>
<style></style>
