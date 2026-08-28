<template>
  <q-input
    outlined
    dense
    readonly
    :model-value="modelValue"
    :mask="inputMask"
    :label="label"
    label-color="appLabel"
    :hint="hint"
    :rules="rules"
    input-class="text-appText"
  >
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy ref="datePopupRef" cover transition-show="scale" transition-hide="scale">
          <q-date
            :model-value="modelValue"
            :mask="dateMask"
            class="bg-body text-appText"
            @update:model-value="onDateSelect"
          >
            <div class="row items-center justify-end">
              <q-btn v-close-popup :label="$t('Close')" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { QPopupProxy } from 'quasar'

export default defineComponent({
  name: 'AppDatePicker',
  props: {
    modelValue: {
      type: String as PropType<string | undefined>,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    hint: {
      type: String,
      default: ''
    },
    dateMask: {
      type: String,
      default: 'DD/MM/YYYY'
    },
    inputMask: {
      type: String,
      default: '##/##/####'
    },
    rules: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    autoClose: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const datePopupRef = ref<QPopupProxy | null>(null)

    const onDateSelect = (val: string | null) => {
      if (val) {
        emit('update:modelValue', val)
        if (props.autoClose) {
          datePopupRef.value?.hide()
        }
      }
    }

    return {
      datePopupRef,
      onDateSelect
    }
  }
})
</script>
