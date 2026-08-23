<template>
  <div class="row items-center justify-end">
    <!-- Export to Excel Button -->
    <q-btn
      icon="mdi-file-excel"
      @click="exportExcel"
      :disable="!enableExport || rows.length === 0"
      :loading="loadingExcel"
      unelevated
      round
      size="sm"
      class="q-mx-xs shadow-3 bg-body text-appText"
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
      size="sm"
      class="q-mx-xs shadow-3 bg-body text-appText"
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

// Import your Thai Base64 font string (adjust the relative path to match your folder structure)
import { sarabunFontBase64 } from '../../assets/fonts/Sarabun-Regular-normal'

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

    // Helper to format table fields and headers
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

    // Export to Excel
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

    // Export to PDF (with Thai Font Fix)
    const exportPDF = async () => {
      try {
        loadingPdf.value = true
        const { headers, formattedRows } = formatRowData()

        const doc = new jsPDF({ orientation: 'landscape' })

        // 1. Register Thai Font
        doc.addFileToVFS('Sarabun-Regular.ttf', sarabunFontBase64)
        doc.addFont('Sarabun-Regular.ttf', 'Sarabun', 'normal')
        doc.setFont('Sarabun')

        const tableBody = formattedRows.map(row => headers.map(h => row[h]))

        // 2. Generate PDF Table
        autoTable(doc, {
          head: [headers],
          body: tableBody,
          theme: 'grid',
          styles: {
            font: 'Sarabun',
            fontStyle: 'normal',
            fontSize: 9
          },
          headStyles: {
            fillColor: [46, 55, 69], // Matches #2E3745
            font: 'Sarabun',
            fontStyle: 'normal',
            fontSize: 9
          }
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
