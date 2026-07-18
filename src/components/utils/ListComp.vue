<template>
  <div class="q-pa-md">
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
    <q-table
      class="my-sticky-dynamic bg-body text-appText"
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
</template>
<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { QTableColumn } from 'quasar'

export default defineComponent({
  name: 'ListComp',
  data() {
    return {}
  },
  props: {
    rows: {
      type: Array<any>,
      default: []
    },

    columns: {
      type: Array<QTableColumn>,
      default: []
    }
  },
  setup() {
    const filter = ref('')
    return {
      filter,
      pagination: ref({
        rowsPerPage: 0
      })
    }
  },
  methods: {}
})
</script>
<style lang="sass" scoped>
.my-sticky-dynamic
  /* height or max-height is important */
  height: 63vh
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: #2E3745

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead tr:first-child th
    top: 0

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>
