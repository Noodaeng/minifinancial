<template>
  <div class="q-pa-md">
    <q-form ref="myForm" class="q-gutter-md q-mt-sm bg-body text-appText">
      <q-card class="bg-body text-appText col-12 col-md-12">
        <q-icon class="q-ma-xs bg-body text-appText" name="mdi-account-details-outline" size="md" />
        <text-subtitle1>&nbsp;&nbsp;&nbsp;{{ $t('Customer_Accounts') }}</text-subtitle1>
        <div class="row justify-start items-start"></div>
      </q-card>
    </q-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { errorToLog } from '../modules/appUtils'

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
    return {}
  },
  methods: {}
})
</script>
<style></style>
