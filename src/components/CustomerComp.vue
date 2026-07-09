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
    </q-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { errorToLog, modelConverter } from '../modules/appUtils'
import Customer from '../models/customer'
export default defineComponent({
  name: 'CustomerComp',
  components: {},
  data() {
    return {}
  },
  props: {
    info: {
      type: Object,
      default: new Object()
    }
  },
  setup(_, { emit }) {
    return {
      model: modelConverter<Customer>(_.info) ?? new Customer()
    }
  },
  methods: {}
})
</script>
<style></style>
