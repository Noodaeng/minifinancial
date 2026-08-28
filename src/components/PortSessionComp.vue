<template>
  <q-card flat class="bg-body text-appText q-pa-sm fit column no-wrap overflow-hidden">
    <!-- Header -->
    <div class="row items-center justify-between q-mb-xs flex-shrink-0">
      <div class="row items-center">
        <q-icon name="mdi-swap-horizontal" size="sm" class="q-mr-xs text-grey-7" />
        <div class="text-caption text-weight-bold text-grey-7">
          {{ $t('Session_List') }} : {{ $t('Total') }}
        </div>
      </div>
      <q-badge outline :color="sumValue < 0 ? 'red' : sumValue > 0 ? 'green' : 'grey-6'" size="xs">
        {{ formatCurrency(sumValue) }}
      </q-badge>
    </div>

    <!-- Responsive Grid without Horizontal Overflow -->
    <div v-if="updateDetails && updateDetails.length > 0" class="session-grid scroll col q-pa-none">
      <q-card
        v-for="(session, index) in updateDetails"
        :key="session.description"
        v-show="session.enabled && isPortValid"
        v-ripple
        @click="onSessionClick(index)"
        flat
        bordered
        class="session-card q-pa-xs bg-body text-appText fit column justify-between cursor-pointer transition-generic"
      >
        <!-- Top Section: Icon + Description + Count -->
        <div class="row items-center justify-between no-wrap q-gutter-x-xs min-width-0">
          <div class="row items-center no-wrap col min-width-0">
            <q-icon
              size="18px"
              class="flex-shrink-0 q-mr-xs text-grey-6"
              :name="session.iconName"
            />
            <span
              class="text-weight-bold text-caption text-appText ellipsis"
              :title="session.description"
            >
              {{ session.description }}
            </span>
          </div>

          <span class="text-weight-bold text-caption text-grey-6 flex-shrink-0">
            :{{ session.totalCount }}
          </span>
        </div>

        <q-separator class="q-my-xs opacity-20" />

        <!-- Bottom Section: Amount -->
        <div class="text-right text-weight-bolder text-subtitle2 text-primary ellipsis min-width-0">
          {{ formatCurrency(session.totalAmount) }}
        </div>
      </q-card>
    </div>

    <!-- Empty State -->
    <div v-else class="col row items-center justify-center text-caption text-grey-6 q-pa-md">
      No session summary available
    </div>
    <slot name="append"></slot>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue'
import { i18n } from '../i18n'
import { PortSessionDetail, PortTypeSummary } from '../types/myTypes'
import { formatCurrency } from '../modules/appUtils.js'

export default defineComponent({
  name: 'PortSessionComp',
  props: {
    details: {
      type: Array as PropType<PortSessionDetail[]>,
      required: false,
      default: (): PortSessionDetail[] => []
    },
    portSessionSummaries: {
      type: Array as PropType<PortTypeSummary[]>,
      required: false,
      default: (): PortTypeSummary[] => []
    },
    isPortValid: {
      type: [Boolean, String] as PropType<boolean | string>,
      default: false
    }
  },
  emits: ['onSessionClick'],
  setup(props, { emit }) {
    const { t } = i18n.global

    const onSessionClick = (index: number) => {
      emit('onSessionClick', index)
    }

    const updateDetails = computed(() => {
      if (!props.details) return []

      const updatedList = props.details.map(detail => ({ ...detail }))
      const summaryMap = new Map<number, PortTypeSummary>()

      props.portSessionSummaries.forEach(summary => {
        summaryMap.set(summary.sessionType, summary)
      })

      updatedList.forEach((detail, index) => {
        const summary = summaryMap.get(index)
        if (summary) {
          detail.totalAmount = summary.totalAmount
          detail.totalCount = summary.count
        }
      })

      return updatedList
    })

    const sumValue = computed(() => {
      let sumVal = 0
      updateDetails.value.forEach(detail => {
        if (detail.effect === '+') {
          sumVal += detail.totalAmount
        } else if (detail.effect === '-') {
          sumVal -= detail.totalAmount
        }
      })
      return sumVal
    })

    return { onSessionClick, formatCurrency, updateDetails, sumValue, t }
  }
})
</script>

<style scoped>
/* CSS Grid enforcing clean column wrapping and preventing content overflow */
.session-grid {
  display: grid;
  /* Increased minimum width from 110px to 140px so cards wrap cleanly into fewer columns */
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  grid-auto-rows: 72px; /* Slightly increased card height */
  gap: 8px;
  width: 100%;
  overflow-x: hidden !important;
  overflow-y: auto;
}

.session-card {
  box-sizing: border-box;
  height: 72px;
  max-width: 100%;
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
</style>
