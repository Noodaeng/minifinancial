<template>
  <div class="q-pa-md">
    <q-form ref="myForm" class="q-gutter-md q-mt-sm bg-body text-appText">
      <q-card class="bg-body text-appText col-12 col-md-12">
        <q-icon class="q-ma-xs bg-body text-appText" name="mdi-account-details-outline" size="md" />
        <text-subtitle1
          >&nbsp;&nbsp;&nbsp;{{ $t('Customer_Accounts') }}:Id-{{
            model?.customerId
          }}</text-subtitle1
        >
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
              v-model="model.lineId"
              :label="$t('Line_Id')"
              label-color="appLabel"
              :hint="$t('Line_Id')"
              :readonly="false"
              lazy-rules
              dense
              input-class="text-appText"
              class="q-ma-sm"
            >
            </q-input>
          </div>
        </div>
      </q-card>

      <q-btn color="primary" :label="$t('Save')" @click="save" />
    </q-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { errorToLog, modelConverter } from '../modules/appUtils'
import Customer from '../models/customer'
import { useValidationRules } from '../hooks/useValidationRules'
import { Action } from '../types/myTypes'
export default defineComponent({
  name: 'CustomerComp',
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
    const rules = useValidationRules()
    const isAllValid = ref(false)
    const isNameValid = ref(true)

    function updateValid() {
      isAllValid.value = isNameValid.value
      emit('checkValid', isAllValid.value)
    }

    const clearValidation = () => {
      myForm.value?.resetValidation()
    }

    const strRule = rules.string(isNameValid, updateValid)

    const save = async () => {
      const valid = await myForm.value?.validate()

      emit('checkValid', valid)

      console.log('Save--------!!!!!', valid)

      if (!valid) {
        return
      }

      emit('save')
    }

    return {
      model: modelConverter<Customer>(props.info) ?? new Customer(),
      strRule,
      myForm,
      save,
      clearValidation
    }
  },
  methods: {}
})
</script>
<style></style>
