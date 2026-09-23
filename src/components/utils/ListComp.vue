<template>
  <div class="full-height column no-wrap q-pa-sm">
    <!-- Top Search Input -->
    <div class="row q-mb-sm">
      <div class="col-12 bg-body text-appText">
        <q-input
          filled
          dense
          class="bg-body text-appText full-width"
          input-class="text-appText"
          v-model="filter"
          :label="$t('Search')"
          debounce="300"
          @update:model-value="val => onFiltering(val)"
        >
          <template v-slot:prepend>
            <q-icon name="mdi-magnify" />
          </template>
        </q-input>
      </div>
    </div>

    <!-- Table Container -->
    <div class="row">
      <div class="col-12">
        <q-table
          class="my-sticky-dynamic bg-body text-appText fit"
          virtual-scroll
          flat
          bordered
          :pagination="pagination"
          :rows-per-page-options="[0]"
          :virtual-scroll-sticky-size-start="48"
          :row-key="getRowKey"
          :rows="rows"
          :columns="columns"
        >
          <!-- Custom Row Slot without Checkboxes -->
          <template v-slot:body="props">
            <q-tr
              :props="props"
              class="cursor-pointer"
              :class="{ 'selected-row-text': selectedRowKey === getRowKey(props.row) }"
              @click="handleRowClick(props.row)"
            >
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.value }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
    <slot name="append"></slot>
    <slot name="append-2"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, type PropType, watch } from 'vue'
import type { QTableColumn } from 'quasar'

export default defineComponent({
  name: 'ListComp',
  props: {
    rows: {
      type: Array as () => Array<any>,
      default: () => []
    },
    columns: {
      type: Array as () => Array<QTableColumn>,
      default: () => []
    },
    initGuide: {
      type: String,
      default: ''
    },
    keyVal: {
      type: [String, Number] as PropType<string | number>,
      default: ''
    }
  },
  emits: ['onFilter', 'onRowClick'],
  setup(props, { emit }) {
    // Tracks the single selected row key
    const selectedRowKey = ref<string | number | null>(null)

    // Helper to extract a unique key from each row object
    const getRowKey = (row: any): string | number => {
      if (row.Id !== undefined) return row.Id
      if (row.id !== undefined) return row.id
      if (props.columns.length > 0 && props.columns[0]?.field) {
        const field = props.columns[0].field
        return typeof field === 'function' ? field(row) : row[field]
      }
      return JSON.stringify(row)
    }

    // Handles single row selection on click
    const handleRowClick = (row: any) => {
      selectedRowKey.value = getRowKey(row)
      emit('onRowClick', row)
    }

    const getFirstColumnName = (): string => {
      if (props.columns.length > 0) {
        const firstCol = props.columns[0]
        return firstCol?.name || (typeof firstCol?.field === 'string' ? firstCol.field : '')
      }
      return ''
    }

    const pagination = ref({
      sortBy: getFirstColumnName(),
      descending: false,
      page: 1,
      rowsPerPage: 5
    })

    const filter = ref(props.initGuide)

    const onFiltering = (val: string | number | null) => {
      emit('onFilter', val)
    }

    onMounted(() => {
      onFiltering(filter.value)
    })
    watch(
      () => props.keyVal,
      async () => {
        filter.value = ''
        onFiltering(filter.value)
      }
    )
    return {
      filter,
      onFiltering,
      pagination,
      selectedRowKey,
      getRowKey,
      handleRowClick
    }
  }
})
</script>

<style lang="sass" scoped>
.my-sticky-dynamic
  height: 100%
  display: flex
  flex-direction: column

  /* Text color changes to secondary theme color when selected */
  .selected-row-text td
    color: var(--appHint) !important
    font-weight: 600 /* Optional: makes text bold for emphasis */

  :deep(.q-table__middle)
    flex-grow: 1

  /* Header and Footer Styling */
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    background-color: #2E3745

  thead tr th
    position: sticky
    z-index: 1

  thead tr:last-child th
    top: 48px
  thead tr:first-child th
    top: 0

  tbody
    scroll-margin-top: 48px
</style>
