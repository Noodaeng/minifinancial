<template>
  <div class="full-height column no-wrap q-pa-sm">
    <!-- Top Search Input -->
    <div class="row q-mb-sm">
      <div class="col-12 col-sm-6 col-md-4">
        <q-input
          filled
          dense
          class="bg-body text-appText"
          v-model="filter"
          :label="$t('Search')"
          debounce="300"
          @update:model-value="val => $emit('onFilter', val)"
        >
          <template v-slot:prepend>
            <q-icon name="mdi-magnify" />
          </template>
        </q-input>
      </div>
    </div>

    <!-- Table Container -->
    <div class="col column overflow-hidden">
      <q-table
        class="my-sticky-dynamic bg-body text-appText fit"
        virtual-scroll
        flat
        bordered
        :pagination="pagination"
        :rows-per-page-options="[0]"
        :virtual-scroll-sticky-size-start="48"
        row-key="Id"
        :rows="rows"
        :columns="columns"
        @row-click="(evt, row) => $emit('onRowClick', row)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
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
    }
  },
  emits: ['onFilter', 'onRowClick'],
  setup() {
    const filter = ref('')
    return {
      filter,
      pagination: ref({
        rowsPerPage: 0
      })
    }
  }
})
</script>

<style lang="sass" scoped>
.my-sticky-dynamic
  /* Force full height within the flex container */
  height: 100%
  display: flex
  flex-direction: column

  /* Expand table body to push pagination footer to bottom edge */
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
