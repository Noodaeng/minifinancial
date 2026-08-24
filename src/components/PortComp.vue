<template>
  <div class="q-pa-md">
    <q-form ref="myForm" class="bg-body text-appText">
      <q-card flat class="bg-body text-appText col-12">
        <div class="row items-center q-mb-md bg-body text-appText">
          <q-icon :name="childIcon" size="md" />
          <div class="text-subtitle1 q-ml-sm">{{ portInfo }} : {{ model.portId }}</div>
        </div>

        <!-- Using q-col-gutter-md manages padding between controls fluidly -->
        <div class="row q-col-gutter-md bg-body text-appText">
          <!-- Row 1 Items -->
          <div class="col-12 col-sm-6 col-md-6">
            <q-input
              outlined
              v-model="model.description"
              type="text"
              :label="$t('Port_description')"
              label-color="appLabel"
              :hint="$t('Port_description')"
              :rules="strRule"
              list="description-list"
              lazy-rules
              dense
              input-class="text-appText"
            />
            <!-- The datalist provides the custom autocomplete source -->
            <datalist id="description-list">
              <option v-for="item in descriptionGuides" :key="item" :value="item" />
            </datalist>
          </div>
          <div class="col-12 col-sm-6 col-md-3">
            <q-select
              v-model="model.portType"
              class="bg-body text-appText"
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
          <div class="col-12 col-sm-6 col-md-3">
            <q-select
              v-model="model.portSubType"
              class="bg-body text-appText"
              label-color="appLabel"
              :label="$t('Port_sub_type')"
              :hint="$t('Port_sub_type')"
              :options="subTypeOption"
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
                    <q-date
                      v-model="model.createOn"
                      mask="DD/MM/YYYY"
                      class="bg-body text-appText"
                      @update:model-value="
                        val => {
                          if (val) model.createOn = val
                        }
                      "
                    >
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <!-- Row 2 Items -->
          <div class="col-12 col-sm-6 col-md-3">
            <q-select
              v-model="model.status"
              class="bg-body text-appText"
              label-color="appLabel"
              :label="$t('Status')"
              :hint="$t('Status')"
              :options="statusOption"
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

          <!-- Remark can scale wider on desktop screens -->
          <div class="col-12 col-md-6">
            <q-input
              outlined
              v-model="model.remark"
              :label="$t('Remark')"
              label-color="appLabel"
              :hint="$t('Remark')"
              :rules="strRule"
              lazy-rules
              dense
              input-class="bg-body text-appText"
            />
          </div>

          <!-- Row 3 Items -->
          <div
            v-if="isFieldVisible('customerId', model.portSubType)"
            class="col-12 col-sm-6 col-md-3 bg-body text-appText"
          >
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
          <div
            v-if="isFieldVisible('brokerId', model.portSubType)"
            class="col-12 col-sm-6 col-md-3"
          >
            <q-select
              v-model="model.brokerId"
              class="bg-body text-appText"
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

          <div v-if="isFieldVisible('amount', model.portSubType)" class="col-12 col-sm-6 col-md-3">
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

          <div
            v-if="isFieldVisible('interest', model.portSubType)"
            class="col-12 col-sm-6 col-md-3"
          >
            <q-input
              outlined
              v-model.number="model.interest"
              type="number"
              :label="$t('Interest') + ' (% ' + ' / ' + periodUnit[model.paymentTerm] + ')'"
              label-color="appLabel"
              :hint="$t('Interest') + ' (% ' + ' / ' + periodUnit[model.paymentTerm] + ')'"
              list="interest-list"
              dense
              input-class="text-appText"
            />
            <!-- The datalist provides the custom autocomplete source -->
            <datalist id="interest-list">
              <option v-for="item in interestGuides" :key="item" :value="item" />
            </datalist>
          </div>

          <!-- Row 4 Items -->
          <div
            v-if="isFieldVisible('paymentTerm', model.portSubType)"
            class="col-12 col-sm-4 col-md-3"
          >
            <q-select
              v-model="model.paymentTerm"
              class="bg-body text-appText"
              label-color="appLabel"
              :label="$t('Payment_period')"
              :hint="$t('Payment_period')"
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

          <div
            v-if="isFieldVisible('paymentRate', model.portSubType)"
            class="col-12 col-sm-4 col-md-3"
          >
            <q-input
              outlined
              v-model="model.paymentRate"
              type="number"
              :label="$t('Payment_rate') + ' / ' + $t('month')"
              label-color="appLabel"
              :hint="$t('Payment_rate') + ' / ' + $t('month')"
              list="rate-list"
              dense
              input-class="text-appText"
            />
            <!-- The datalist provides the custom autocomplete source -->
            <datalist id="rate-list">
              <option v-for="item in paymentRateGuides" :key="item" :value="item" />
            </datalist>
          </div>

          <div v-if="isFieldVisible('period', model.portSubType)" class="col-12 col-sm-4 col-md-3">
            <q-input
              outlined
              v-model="model.period"
              type="number"
              :label="$t('Period') + ' (' + periodUnits[model.paymentTerm] + ')'"
              label-color="appLabel"
              :hint="$t('Period') + ' (' + periodUnits[model.paymentTerm] + ')'"
              list="period-list"
              dense
              input-class="text-appText"
              class="full-width q-mb-sm"
            />
            <!-- The datalist provides the custom autocomplete source -->
            <datalist id="period-list">
              <option v-for="item in periodGuides" :key="item" :value="item" />
            </datalist>
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
import { defineComponent, ref, PropType, computed, watch } from 'vue'
import {
  modelConverter,
  enumToString,
  enumToQSelectOptions,
  subTypeToQSelectOptions,
  periodUnits,
  periodUnit
} from '../modules/appUtils'
import Port from '../models/port'
import { useValidationRules } from '../hooks/useValidationRules'
import { i18n } from '../i18n'
import { EPortType, EPaymentPeriod, EPortStatus } from '../types/myEnums'
import { QSelectOption } from '../types/myTypes'
import SaveCancelBtn from '../components/utils/SaveCancelBtn.vue'
import { usePortField } from '../hooks/usePortField'
export default defineComponent({
  name: 'PortComp',
  components: { SaveCancelBtn },
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
      type: [Number, String] as PropType<string | number | EPortType>,
      default: EPortType.CashAndDeposits
    },
    custOption: {
      type: Array<QSelectOption>,
      default: []
    },
    brokerOption: {
      type: Array<QSelectOption>,
      default: []
    },
    enbBtnSave: {
      type: Boolean,
      default: false
    },
    childIcon: {
      type: String,
      default: 'mdi-widgets-outline'
    },
    interestGuides: {
      type: Array as PropType<number[]>, // or PropType<Array<string>>
      default: () => []
    },
    descriptionGuides: {
      type: Array as PropType<string[]>, // or PropType<Array<string>>
      default: () => []
    },
    periodGuides: {
      type: Array as PropType<number[]>, // or PropType<Array<string>>
      default: () => []
    },
    paymentRateGuides: {
      type: Array as PropType<number[]>, // or PropType<Array<string>>
      default: () => []
    }
  },
  setup(props, { emit }) {
    const myForm = ref()
    const { t } = i18n.global
    const rules = useValidationRules(t)
    const useField = usePortField()
    useField.portType.value = props.portType
    watch(
      () => props.portType,
      async () => {
        useField.portType.value = props.portType
      }
    )
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
    const portTypeOption = computed(() => enumToQSelectOptions(EPortType))
    const portInfo = computed(() => enumToString(EPortType, Number(props.portType)))
    const subTypeOption = computed(() => subTypeToQSelectOptions(Number(props.portType)))
    return {
      model: modelConverter<Port>(props.info) ?? new Port(),
      portInfo,
      subTypeOption,
      paymentOption: enumToQSelectOptions(EPaymentPeriod),
      statusOption: enumToQSelectOptions(EPortStatus),
      portTypeOption,
      strRule,
      emailRule,
      creditRule,
      selectorRule,
      myForm,
      checkboxRule,
      clearValidation,
      getValidate,
      isFieldVisible: useField.isFieldVisible,
      periodUnits,
      periodUnit
    }
  },
  methods: {}
})
</script>
<style scoped>
::v-deep(.q-select .q-field__native) {
  color: var(--q-color-appText); /* or your custom color */
}
</style>
