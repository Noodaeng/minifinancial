<template>
  <q-card class="dialog-card column no-wrap bg-body text-appText">
    <!-- Header -->
    <q-card-section
      class="row items-center justify-between bg-warning text-dark q-pa-sm q-px-md flex-shrink-0"
    >
      <div class="row items-center q-gutter-x-sm">
        <q-icon name="mdi-alert-decagram" size="28px" color="negative" />
        <div>
          <div class="text-subtitle1 text-weight-bold leading-tight">{{ $t('Loan_Warnings') }}</div>
          <div class="text-caption opacity-80">
            {{ notifies.length }} {{ $t('notifications') }}
            {{ $t('requiring_attention') }}
          </div>
        </div>
      </div>
      <q-btn v-close-popup icon="mdi-close" flat round dense />
    </q-card-section>

    <!-- Table Content -->
    <q-card-section class="col q-pa-none overflow-hidden">
      <q-table
        flat
        square
        bordered
        :rows="notifies"
        :columns="columns"
        row-key="notifyCode"
        :pagination="initialPagination"
        class="sticky-header-table fit"
        no-data-label="No active loan notifications"
      >
        <!-- Custom Customer Cell -->
        <template #body-cell-customerName="props">
          <q-td :props="props">
            <div v-if="props.row.customerName" class="text-weight-medium text-body2">
              {{ props.row.customerName }}
            </div>
            <div v-else class="text-caption text-italic text-grey-6">N/A</div>
          </q-td>
        </template>

        <!-- Custom Port ID Badge Cell -->
        <template #body-cell-portId="props">
          <q-td :props="props">
            <q-chip
              dense
              size="12px"
              color="primary"
              text-color="black"
              icon="mdi-folder-outline"
              class="q-ma-none"
            >
              {{ props.row.portId }}
            </q-chip>
          </q-td>
        </template>

        <!-- Custom Description Cell -->
        <template #body-cell-description="props">
          <q-td :props="props">
            <div class="text-body2 text-negative text-weight-medium multiline-clamp">
              {{ props.row.description }}
            </div>
          </q-td>
        </template>
      </q-table>
    </q-card-section>

    <!-- Footer -->
    <q-separator />
    <q-card-actions align="right" class="bg-surface q-pa-sm flex-shrink-0">
      <q-btn v-close-popup flat :label="$t('Close')" color="grey-8" class="q-px-md" />
      <q-btn
        v-close-popup
        unelevated
        :label="$t('Acknowledge_All')"
        color="warning"
        text-color="dark"
        class="q-px-md text-weight-bold"
        @click="$emit('acknowledge')"
      />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { QTableColumn } from 'quasar'
import { LoanNotify } from '../types/myTypes'
import { i18n } from '../i18n'
export default defineComponent({
  name: 'DiaLoanNotifies',
  props: {
    notifies: {
      type: Array as PropType<LoanNotify[]>,
      required: false,
      default: (): LoanNotify[] => []
    }
  },
  emits: ['acknowledge'],

  setup() {
    const { t } = i18n.global
    const initialPagination = ref({
      sortBy: 'portId',
      descending: false,
      page: 1,
      rowsPerPage: 10
    })

    const columns: QTableColumn<LoanNotify>[] = [
      {
        name: 'portId',
        required: true,
        label: t('PortId'),
        align: 'left',
        field: 'portId',
        sortable: true,
        style: 'width: 110px'
      },
      {
        name: 'notifyCode',
        label: t('Notify_Code'),
        align: 'left',
        field: 'notifyCode',
        sortable: true,
        style: 'width: 100px'
      },
      {
        name: 'customerName',
        label: t('Customer'),
        align: 'left',
        field: row => row.customerName ?? 'N/A',
        sortable: true,
        style: 'width: 180px'
      },
      {
        name: 'description',
        label: t('Warning_Description'),
        align: 'left',
        field: 'description',
        sortable: false
      }
    ]

    return {
      columns,
      initialPagination
    }
  }
})
</script>

<style scoped>
.dialog-card {
  width: 90vw;
  max-width: 800px;
  height: 80vh;
  max-height: 550px;
  border-radius: 12px;
}

.leading-tight {
  line-height: 1.2;
}

.multiline-clamp {
  white-space: normal;
  word-break: break-word;
}

/* Sticky Header styling for Quasar QTable */
:deep(.sticky-header-table) {
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    background-color: var(--q-surface, #ffffff);
  }

  thead tr th {
    position: sticky;
    z-index: 1;
  }

  thead tr:first-child th {
    top: 0;
  }
}
</style>
