<template>
  <div class="row justify-end items-end">
    <!-- Export to Excel Button -->
    <q-btn
      icon="mdi-file-excel"
      @click="exportExcel"
      :disable="!enableExport || rows.length === 0"
      :loading="loadingExcel"
      unelevated
      round
      :class="[
        enableExport && rows.length > 0
          ? 'q-ma-sm shadow-3 bg-body text-appText'
          : 'q-ma-sm shadow-3 bg-body text-appLayout'
      ]"
    >
      <q-tooltip>{{ $t('Export to Excel') }}</q-tooltip>
    </q-btn>

    <!-- Export to PDF Button -->
    <q-btn
      icon="mdi-file-pdf-box"
      @click="exportPDF"
      :disable="!enableExport || rows.length === 0"
      :loading="loadingPdf"
      unelevated
      round
      :class="[
        enableExport && rows.length > 0
          ? 'q-ma-sm shadow-3 bg-body text-appText'
          : 'q-ma-sm shadow-3 bg-body text-appLayout'
      ]"
    >
      <q-tooltip>{{ $t('Export to PDF') }}</q-tooltip>
    </q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import type { QTableColumn } from 'quasar'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export default defineComponent({
  name: 'ExportBtnGroup',
  props: {
    rows: {
      type: Array as PropType<Array<Record<string, any>>>,
      required: true,
      default: () => []
    },
    columns: {
      type: Array as PropType<Array<QTableColumn>>,
      required: true,
      default: () => []
    },
    enableExport: {
      type: Boolean,
      default: true
    },
    fileName: {
      type: String,
      default: 'export_data'
    }
  },
  emits: ['onExportSuccess', 'onExportError'],
  setup(props, { emit }) {
    const loadingExcel = ref(false)
    const loadingPdf = ref(false)

    // Helper to extract plain text values for fields
    const formatRowData = () => {
      const activeColumns = props.columns.filter(col => !col.required || col.name)

      const formattedRows = props.rows.map(row => {
        const rowData: Record<string, any> = {}
        activeColumns.forEach(col => {
          const header = col.label
          let value = typeof col.field === 'function' ? col.field(row) : row[col.field]

          if (col.format && typeof value !== 'undefined') {
            value = col.format(value, row)
          }

          rowData[header] = value ?? ''
        })
        return rowData
      })

      return { headers: activeColumns.map(c => c.label), formattedRows }
    }

    // Export Excel Handler
    const exportExcel = async () => {
      try {
        loadingExcel.value = true
        const { formattedRows } = formatRowData()

        const worksheet = XLSX.utils.json_to_sheet(formattedRows)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data')

        XLSX.writeFile(workbook, `${props.fileName}.xlsx`)
        emit('onExportSuccess', 'excel')
      } catch (error) {
        emit('onExportError', { type: 'excel', error })
      } finally {
        loadingExcel.value = false
      }
    }

    // Export PDF Handler
    const exportPDF = async () => {
      try {
        loadingPdf.value = true
        const { headers, formattedRows } = formatRowData()

        const doc = new jsPDF({ orientation: 'landscape' })
        const tableBody = formattedRows.map(row => headers.map(h => row[h]))

        autoTable(doc, {
          head: [headers],
          body: tableBody,
          theme: 'grid',
          styles: { fontSize: 8 },
          headStyles: { fillColor: [46, 55, 69] } // Matches #2E3745 from your header styling
        })

        doc.save(`${props.fileName}.pdf`)
        emit('onExportSuccess', 'pdf')
      } catch (error) {
        emit('onExportError', { type: 'pdf', error })
      } finally {
        loadingPdf.value = false
      }
    }

    return {
      loadingExcel,
      loadingPdf,
      exportExcel,
      exportPDF
    }
  }
})
</script>

<style scoped></style>
