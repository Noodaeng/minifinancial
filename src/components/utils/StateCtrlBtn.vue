<template>
  <div>
    <q-fab
      v-model="fab1"
      color="body"
      text-color="appText"
      icon="keyboard_arrow_right"
      direction="right"
      class="q-ma-sm bg-body text-appText"
    >
      <q-fab-action
        v-if="visBtnCreate"
        color="body"
        @click="$emit('onClickCreate')"
        :disable="!enbBtnCreate"
        icon="fas fa-plus"
        :class="[enbBtnCreate ? 'q-ma-sm bg-body text-appText' : 'q-ma-sm bg-body text-appLayout']"
      />
      <q-fab-action
        v-if="visBtnEdit"
        color="body"
        @click="$emit('onClickEdit')"
        :disable="!enbBtnEdit"
        icon="fas fa-pen"
        :class="[enbBtnEdit ? 'q-ma-sm bg-body text-appText' : 'q-ma-sm bg-body text-appLayout']"
      />
      <q-fab-action
        v-if="visBtnDelete"
        color="body"
        @click="$emit('onClickDelete')"
        :disable="!enbBtnDelete"
        icon="delete"
        :class="[enbBtnDelete ? 'q-ma-sm bg-body text-appText' : 'q-ma-sm bg-body text-appLayout']"
      />
    </q-fab>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'StateCtrlBtn',

  props: {
    enbBtnCreate: {
      type: Boolean,
      required: true
    },
    enbBtnEdit: {
      type: Boolean,
      required: true
    },
    enbBtnDelete: {
      type: Boolean,
      required: true
    },
    visBtnEdit: {
      type: Boolean,
      default: false
    },
    visBtnCreate: {
      type: Boolean,
      default: true
    },
    visBtnDelete: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    return {
      fab1: ref(false)
    }
  },
  methods: {}
})
</script>
<style lang=""></style>
