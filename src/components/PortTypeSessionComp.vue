<template>
  <div class="port-summary-container full-height column no-wrap q-pa-xs">
    <q-card flat class="bg-body text-appText q-pa-sm fit column no-wrap overflow-hidden">
      <!-- Header -->
      <div class="row items-center justify-between q-mb-xs flex-shrink-0">
        <div class="row items-center">
          <q-icon name="mdi-swap-horizontal" size="sm" class="q-mr-xs text-grey-7" />
          <div class="text-caption text-weight-bold text-grey-7">
            {{ $t('Session_List') }} : {{ $t('Total') }}
          </div>
        </div>
        <q-badge
          outline
          :color="sumValue < 0 ? 'red' : sumValue > 0 ? 'green' : 'grey-6'"
          size="xs"
        >
          {{ formatCurrency(sumValue) }}
        </q-badge>
      </div>

      <!-- Responsive CSS Grid layout -->
      <div
        v-if="sessionTypeSummaries && sessionTypeSummaries.length > 0"
        class="session-grid scroll col q-pa-none"
      >
        <q-card
          v-for="item in sessionTypeSummaries"
          :key="item.sessionType"
          flat
          bordered
          class="summary-card q-pa-xs bg-body text-appText fit column justify-between cursor-pointer transition-generic"
        >
          <!-- Top Section: Icon + Description + Count -->
          <div class="row items-center justify-between no-wrap q-gutter-x-xs min-width-0">
            <div class="row items-center no-wrap col min-width-0">
              <q-icon
                size="18px"
                class="flex-shrink-0 q-mr-xs text-grey-6"
                :name="getSessionTypeDescription(Number(portType), item.sessionType).iconName"
              />
              <span
                class="text-weight-bold text-caption text-appText ellipsis"
                :title="getSessionTypeDescription(Number(portType), item.sessionType).description"
              >
                {{ getSessionTypeDescription(Number(portType), item.sessionType).description }}
              </span>
            </div>

            <span class="text-weight-bold text-caption text-grey-6 flex-shrink-0">
              :{{ item.count }}
            </span>
          </div>

          <q-separator class="q-my-xs opacity-20" />

          <!-- Bottom Section: Total Amount -->
          <div
            class="text-right text-weight-bolder text-subtitle2 text-primary ellipsis min-width-0"
          >
            {{ formatCurrency(item.totalAmount) }}
          </div>
        </q-card>
      </div>

      <!-- Empty State -->
      <div v-else class="col row items-center justify-center text-caption text-grey-6 q-pa-md">
        No session summary available
      </div>
      <slot name="append"></slot>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { PortTypeSummary } from '../types/myTypes.js'
import { formatCurrency, getSessionTypeDescription, getSessionEffect } from '../modules/appUtils.js'
import { EPortType } from '../types/myEnums.js'

export default defineComponent({
  name: 'PortTypeSessionComp',
  props: {
    sessionTypeSummaries: {
      type: Array as PropType<PortTypeSummary[]>,
      required: false,
      default: (): PortTypeSummary[] => []
    },
    portType: {
      type: [String, Number] as PropType<string | number | EPortType>,
      default: EPortType.CashAndDeposits
    }
  },

  setup(props) {
    const totalSessionTypes = computed(() => props.sessionTypeSummaries?.length || 0)
    const sumValue = computed(() => {
      let sumVal = 0
      props.sessionTypeSummaries?.forEach(detail => {
        const effect = getSessionEffect(props.portType, detail.sessionType)
        if (effect === '+') {
          sumVal += detail.totalAmount
        } else if (effect === '-') {
          sumVal -= detail.totalAmount
        }
      })
      return sumVal
    })

    return {
      formatCurrency,
      getSessionTypeDescription,
      totalSessionTypes,
      sumValue
    }
  }
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
