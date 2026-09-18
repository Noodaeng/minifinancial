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
      <q-tooltip>{{ $t('Export_to_Excel') }}</q-tooltip>
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
      <q-tooltip>{{ $t('Export_to_PDF') }}</q-tooltip>
    </q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import type { QTableColumn } from 'quasar'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { EPortType } from '../../types/myEnums'
// Import your Thai Base64 font string (adjust the relative path to match your folder structure)
import { sarabunFontBase64 } from '../../assets/fonts/Sarabun-Regular-normal'
import { i18n } from '../../i18n'
import { formatCurrency } from '../../modules/appUtils'
export enum LoanTransactionType {
  LoanIssued = 0, // ปล่อยกู้
  LoanRepayment = 1, // รับชำระคืน
  LoanInterestAccrual = 2, // ดอกเบี้ยค้างรับ
  BadDebtWriteOff = 3, // ตัดหนี้สูญ
  LoanReFinance = 4, // รีไฟแนนซ์ / ปรับโครงสร้างหนี้
  BrokerPayment = 5 //จ่ายค่านายหน้า
}

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
    title: {
      type: String,
      default: 'Title'
    },
    fileName: {
      type: String,
      default: 'export_data'
    },
    portType: {
      type: [Number, String] as PropType<string | number | EPortType>,
      default: EPortType.CashAndDeposits
    }
  },
  emits: ['onExportSuccess', 'onExportError'],
  setup(props, { emit }) {
    const loadingExcel = ref(false)
    const loadingPdf = ref(false)
    const { t } = i18n.global
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

    // Helper to calculate summary of 'amount' grouped by formatted 'sessionType' + differ if portType === 1
    const calculateSessionSummary = () => {
      const summaryMap: Record<string, number> = {}
      let sum0 = 0
      let sum1 = 0
      let sum4 = 0

      props.rows.forEach(row => {
        const rawType = row['sessionType']
        const numericType = Number(rawType)
        const amountVal = Number(row['amount'] ?? 0)
        const validAmount = isNaN(amountVal) ? 0 : amountVal

        if (numericType === LoanTransactionType.LoanIssued) sum0 += validAmount
        if (numericType === LoanTransactionType.LoanRepayment) sum1 += validAmount
        if (numericType === LoanTransactionType.LoanReFinance) sum4 += validAmount

        const typeCol = props.columns.find(c => c.name === 'sessionType')
        let typeLabel = typeof typeCol?.field === 'function' ? typeCol.field(row) : rawType
        if (typeCol?.format && typeof typeLabel !== 'undefined') {
          typeLabel = typeCol.format(typeLabel, row)
        }
        const key = String(typeLabel || 'Unknown')

        summaryMap[key] = (summaryMap[key] || 0) + validAmount
      })

      const summaryRows = Object.entries(summaryMap).map(([sessionType, totalAmount]) => ({
        sessionType,
        totalAmount
      }))

      let differ: number | null = null
      if (Number(props.portType) === 1) {
        differ = sum0 + sum4 - sum1
      }

      return { summaryRows, differ }
    }

    // Export to Excel
    const exportExcel = async () => {
      try {
        loadingExcel.value = true
        const { formattedRows } = formatRowData()
        const { summaryRows, differ } = calculateSessionSummary()

        const worksheet = XLSX.utils.json_to_sheet([])

        // 1. Add Title in cell A1
        XLSX.utils.sheet_add_aoa(worksheet, [[props.title]], { origin: 'A1' })

        // 2. Add table data starting at row 3 (cell A3)
        XLSX.utils.sheet_add_json(worksheet, formattedRows, { origin: 'A3', skipHeader: false })

        // 3. Add Summary section below data
        const startSummaryRow = formattedRows.length + 5
        XLSX.utils.sheet_add_aoa(worksheet, [['Summary by Session Type']], {
          origin: `A${startSummaryRow}`
        })
        XLSX.utils.sheet_add_json(worksheet, summaryRows, {
          origin: `A${startSummaryRow + 1}`,
          skipHeader: false,
          header: ['sessionType', 'totalAmount']
        })

        // 4. Add Differ if portType === 1
        if (differ !== null) {
          const differRowIndex = startSummaryRow + 2 + summaryRows.length
          const description = differ>0? 'Net_Overpayment':'Net_Outstanding'

          XLSX.utils.sheet_add_aoa(worksheet, [[t(description), Math.abs(differ]], {
            origin: `A${differRowIndex}`
          })
        }

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

    // Export to PDF (with Thai Font Fix, Summary Table & Differ)
    // Export to PDF (with Thai Font Fix, Summary Table & Differ positioned bottom-right)
    const exportPDF = async () => {
      try {
        loadingPdf.value = true
        const { headers, formattedRows } = formatRowData()
        const { summaryRows, differ } = calculateSessionSummary()

        const doc = new jsPDF({ orientation: 'landscape' })
        const pageWidth = doc.internal.pageSize.getWidth()
        const rightMargin = 14
        const summaryWidth = pageWidth * 0.25 // ~25% of page width
        const startX = pageWidth - summaryWidth - rightMargin

        // 1. Register Thai Font
        doc.addFileToVFS('Sarabun-Regular.ttf', sarabunFontBase64)
        doc.addFont('Sarabun-Regular.ttf', 'Sarabun', 'normal')
        doc.setFont('Sarabun')

        // 2. Add Title Text
        doc.setFontSize(14)
        doc.text(props.title, 14, 15)

        const tableBody = formattedRows.map(row => headers.map(h => row[h]))

        // 3. Generate Main PDF Table (full width)
        autoTable(doc, {
          startY: 20,
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

        // 4. Generate Summary PDF Table positioned at bottom right (~25% width)
        const finalY = (doc as any).lastAutoTable?.finalY || 40
        const summaryStartY = finalY + 12

        doc.setFontSize(11)
        doc.text(t('Summary_by_Session_Type'), startX, summaryStartY)

        autoTable(doc, {
          startY: summaryStartY + 4,
          margin: { left: startX, right: rightMargin },
          tableWidth: summaryWidth,
          head: [[t('Type'), t('Total_Amount')]],
          body: summaryRows.map(s => [s.sessionType, formatCurrency(s.totalAmount)]),
          theme: 'grid',
          styles: {
            font: 'Sarabun',
            fontStyle: 'normal',
            fontSize: 8.5,
            cellPadding: 2
          },
          headStyles: {
            fillColor: [70, 80, 95],
            font: 'Sarabun',
            fontStyle: 'normal',
            fontSize: 8.5
          }
        })

        // 5. Append Differ info aligned with the summary block on the right
        if (differ !== null) {
          const description = differ>0? 'Net_Overpayment':'Net_Outstanding'
          const finalY2 = (doc as any).lastAutoTable?.finalY || summaryStartY + 30
          autoTable(doc, {
            startY: finalY2 + 4,
            margin: { left: startX, right: rightMargin },
            tableWidth: summaryWidth,
            head: [[t('Description'), t('Amount')]],
            body: [
              [
                t(description),
                formatCurrency(Math.abs( differ))
              ]
            ],
            theme: 'grid',
            styles: {
              font: 'Sarabun',
              fontStyle: 'normal',
              fontSize: 8,
              cellPadding: 2
            },
            headStyles: {
              fillColor: [100, 110, 125],
              font: 'Sarabun',
              fontStyle: 'normal',
              fontSize: 8
            }
          })
        }

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
