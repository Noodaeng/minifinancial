<template>
  <div class="row justify-end items-end">
    <q-btn
      v-if="false"
      icon="cancel"
      @click="$emit('onClickDiscard')"
      :disable="!enbBtnDiscard"
      unelevated
      round
      :class="[
        enbBtnDiscard
          ? 'q-ma-sm shadow-3 bg-body text-appText'
          : 'q-ma-sm shadow-3 bg-body text-appLayout'
      ]"
    >
      <template v-slot:loading>
        <q-spinner-facebook />
      </template>
    </q-btn>
    <q-btn
      icon="save"
      @click="$emit('onClickSave')"
      :disable="!enbBtnSave"
      unelevated
      round
      :class="[
        enbBtnSave
          ? 'q-ma-sm shadow-3 bg-body text-appText'
          : 'q-ma-sm shadow-3 bg-body text-appLayout'
      ]"
    >
    </q-btn>
  </div>
</template>
<script lang="ts">
import { fasBedPulse } from '@quasar/extras/fontawesome-v7'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SaveCancelBtn',
  data() {
    return {}
  },
  props: {
    enbBtnDiscard: {
      type: Boolean,
      required: true
    },
    enbBtnSave: {
      type: Boolean,
      required: true
    }
  },
  setup() {
    return {}
  },
  methods: {}
})
</script>
<style lang=""></style>
