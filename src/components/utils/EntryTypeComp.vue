<template>
  <div>
    <q-card
      flat
      bordered
      class="summary-card q-pa-xs bg-body text-appText fit column justify-between cursor-pointer transition-generic"
    >
      <!-- Top Section: Icon + Description + Count -->
      <div class="row items-center justify-between no-wrap q-gutter-x-xs min-width-0">
        <div class="row items-center no-wrap col min-width-0"></div>

        <span class="text-weight-bold text-caption text-grey-6 flex-shrink-0"> </span>
      </div>

      <q-separator class="q-my-xs opacity-20" />

      <!-- Bottom Section: Total Amount -->
      <div class="text-right text-weight-bolder text-subtitle2 text-primary ellipsis min-width-0">
        {{ formatCurrency(entryData.balance) }}
      </div>
    </q-card>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { PortTypeSummary, EntryTypeMeta } from '../../types/myTypes'
import { EPortType } from '../../types/myEnums'
import { getEffectPortType, formatCurrency } from '../../modules/appUtils'
export default defineComponent({
  name: 'EntryTypeComp',
  data() {
    return {}
  },
  props: {
    portType: {
      // Highlighted change: added String alongside Number
      type: [Number, String] as PropType<string | number | EPortType>,
      default: EPortType.CashAndDeposits
    },
    sessionSummaries: {
      type: Array as PropType<PortTypeSummary[]>,
      required: false,
      default: (): PortTypeSummary[] => []
    }
  },
  setup(props) {
    const getBalance = (dr: number, cr: number, pType: number): number => {
      if ([0, 1, 2, 3, 4].includes(pType)) {
        return dr - cr
      } else if ([5, 6].includes(pType)) {
        return cr - dr
      } else if ([7, 8, 9].includes(pType)) {
        return cr - dr
      } else if ([10, 11, 12, 13].includes(pType)) {
        return dr - cr
      } else if ([14, 15, 16].includes(pType)) {
        return cr - dr
      } else {
        return 0
      }
    }
    const entryData = computed<EntryTypeMeta>(() => {
      const entries = props.sessionSummaries.filter(
        t => t.sessionType === 1000 || t.sessionType === 1001
      )
      if (entries && entries.length >= 2) {
        const entryCredit = entries.find(t => t.sessionType === 1000)
        const entryDedit = entries.find(t => t.sessionType === 1001)
        const effect = getEffectPortType(Number(props.portType))
        const balance = getBalance(
          entryDedit?.totalAmount ?? 0,
          entryCredit?.totalAmount ?? 0,
          Number(props.portType)
        )
        return {
          portType: 500,
          name: '-',
          drEffect: effect[0],
          crEffect: effect[1],
          icon: '-',
          totalCredit: entryCredit?.totalAmount ?? 0,
          totalDebit: entryDedit?.totalAmount ?? 0,
          creditCount: entryCredit?.count ?? 0,
          debitCount: entryDedit?.count ?? 0,
          balance: balance
        }
      } else {
        return {
          portType: 500,
          name: '-',
          drEffect: '+',
          crEffect: '+',
          icon: '-',
          totalCredit: 0,
          totalDebit: 0,
          creditCount: 0,
          debitCount: 0,
          balance: 0
        }
      }
    })
    return { formatCurrency, entryData }
  },
  methods: {}
})
</script>
<style scoped>
.port-summary-container {
  height: 100%;
  width: 100%;
}

/* Responsive CSS Grid replacing Quasar Flex columns */
.session-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  grid-auto-rows: 72px;
  gap: 8px;
  width: 100%;
  overflow-x: hidden !important;
  overflow-y: auto;
}

.summary-card {
  box-sizing: border-box;
  height: 72px;
  max-width: 100%;
  transition: all 0.2s ease-in-out;
}

.summary-card:hover {
  border-color: var(--q-primary);
}

.min-width-0 {
  min-width: 0;
}

.flex-shrink-0 {
  flex-shrink: 0;
}

.overflow-hidden {
  overflow: hidden;
}

.opacity-20 {
  opacity: 0.2;
}
</style>
