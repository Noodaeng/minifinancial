<template>
  <div class="port-summary-container full-height column no-wrap q-pa-xs">
    <q-card flat class="bg-body text-appText q-pa-sm fit column">
      <!-- Header -->
      <div class="row items-center justify-between q-mb-xs">
        <div class="text-caption text-weight-bold text-grey-7">Port Session Summary</div>
        <q-badge
          v-if="sessionTypeSummaries && sessionTypeSummaries.length"
          outline
          color="grey-6"
          size="xs"
        >
          {{ totalSessionTypes }} Types
        </q-badge>
      </div>

      <!-- Responsive Dynamic Cards Grid -->
      <div
        v-if="sessionTypeSummaries && sessionTypeSummaries.length > 0"
        class="row q-col-gutter-xs scroll col"
      >
        <div
          v-for="item in sessionTypeSummaries"
          :key="item.sessionType"
          class="col-12 col-xs-6 col-sm-4 col-md-3"
        >
          <q-card
            flat
            bordered
            class="summary-card q-pa-xs bg-body text-appText fit column justify-between"
          >
            <!-- Top Section: Type Label & Count -->
            <div class="row items-center justify-between no-wrap q-gutter-x-xs">
              <q-icon
                size="20px"
                :name="getSessionTypeDescription(Number(portType), item.sessionType).iconName"
              />
              <q-chip
                dense
                square
                size="xs"
                class="q-ma-none bg-body text-appText text-weight-bold ellipsis"
              >
                {{ getSessionTypeDescription(Number(portType), item.sessionType).description }}
              </q-chip>

              <span class="bg-body text-appText ellipsis"> :{{ item.count }} </span>
            </div>

            <q-separator class="q-my-xs" />

            <!-- Bottom Section: Total Amount -->
            <div class="text-right text-weight-bolder text-subtitle2 text-primary ellipsis">
              {{ formatCurrency(item.totalAmount) }}
            </div>
          </q-card>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="col row items-center justify-center text-caption text-grey-6 q-pa-md">
        No session summary available
      </div>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { PortTypeSummary } from '../types/myTypes.js'
import { formatCurrency, getSessionTypeDescription } from '../modules/appUtils.js'
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

    return {
      formatCurrency,
      getSessionTypeDescription,
      totalSessionTypes
    }
  }
})
</script>

<style lang="sass" scoped>
.port-summary-container
  height: 100%
  width: 100%

.summary-card
  min-width: 90px
  transition: all 0.2s ease-in-out
  &:hover
    border-color: var(--q-primary)

/* Prevents text breaking layout on tiny mobile screens */
.ellipsis
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
</style>
