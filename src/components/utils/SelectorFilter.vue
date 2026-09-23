<template>
  <div class="col-12 col-sm-6 col-md-3 bg-body text-appText">
    <q-select
      v-model="myModelValue"
      :options="filteredOptions"
      :label="labelValue"
      :hint="hintValue"
      option-label="label"
      option-value="value"
      emit-value
      map-options
      outlined
      dense
      behavior="menu"
      placeholder="Select option"
      popup-content-class="bg-body text-appText"
    >
      <!-- Search Input placed at the top of the dropdown list -->
      <template v-slot:before-options>
        <q-item dense>
          <q-item-section>
            <q-input
              v-model="searchQuery"
              dense
              outlined
              :placeholder="$t('Search')"
              clearable
              autofocus
              input-class="text-appText"
              @update:model-value="filterOptions"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </q-item-section>
        </q-item>
      </template>

      <!-- Clickable No Option to clear search query -->
      <template v-slot:no-option>
        <q-item clickable @click="clearSearch">
          <q-item-section class="text-grey cursor-pointer">
            {{ $t('No_data_available') }}
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script lang="ts">
import { ref, watch, type PropType, defineComponent, computed } from 'vue'
import { QSelectOption } from '../../types/myTypes'

export default defineComponent({
  name: 'SelectorFilter',
  props: {
    modelValue: {
      type: [String, Number] as PropType<string | number>,
      required: true,
      default: 0
    },
    labelValue: {
      type: String,
      required: true,
      default: '-'
    },
    hintValue: {
      type: String,
      required: true,
      default: '-'
    },
    options: {
      type: Array as PropType<QSelectOption[]>,
      required: true,
      default: () => []
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const myModelValue = computed({
      get: () => props.modelValue,
      set: val => emit('update:modelValue', val)
    })

    const searchQuery = ref('')
    const filteredOptions = ref<QSelectOption[]>(props.options)

    watch(
      () => props.options,
      newOptions => {
        filteredOptions.value = newOptions
      }
    )

    // Filter options based on input value inside the dropdown slot
    function filterOptions(val: string | number | null) {
      const query = String(val || '').toLowerCase()
      if (!query) {
        filteredOptions.value = props.options
        return
      }

      filteredOptions.value = props.options.filter(
        (v: QSelectOption) => v.label.toLowerCase().indexOf(query) > -1
      )
    }

    // Clear search query and reset filtered options back to full list
    function clearSearch() {
      searchQuery.value = ''
      filteredOptions.value = props.options
    }

    return {
      myModelValue,
      searchQuery,
      filteredOptions,
      filterOptions,
      clearSearch
    }
  }
})
</script>

<style scoped>
::v-deep(.q-select .q-field__native) {
  color: var(--q-color-appText);
}
</style>
