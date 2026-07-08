<template>
  <div class="row justify-end items-end">
    <q-btn
      icon="cancel"
      @click="onClickDiscard"
      :disable="!enbBtnDiscard"
      unelevated
      round
      :class="[
        enbBtnDiscard
          ? 'q-ma-sm shadow-3 bg-body text-appText'
          : 'q-ma-sm shadow-3 bg-body text-appLayout',
      ]"
    >
      <template v-slot:loading>
        <q-spinner-facebook />
      </template>
    </q-btn>
    <q-btn
      icon="save"
      @click="onClickSave"
      :disable="!enbBtnSave"
      unelevated
      round
      :class="[
        enbBtnSave
          ? 'q-ma-sm shadow-3 bg-body text-appText'
          : 'q-ma-sm shadow-3 bg-body text-appLayout',
      ]"
    >
    </q-btn>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'SaveCancelBtn',
  data() {
    return {};
  },
  props: {
    enbBtnDiscard: {
      type: Boolean,
      required: true,
    },
    enbBtnSave: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    return {};
  },
  methods: {
    onClickDiscard() {
      this.$emit('onClickDiscard');
    },

    onClickSave() {
      this.$emit('onClickSave');
    },
  },
});
</script>
<style lang=""></style>
