<template>
  <div class="row q-col-gutter-md">
    <div v-for="item in categoryMetadata" :key="item.value" class="col-12 col-sm-6 col-md-4 col-lg">
      <q-card flat bordered class="bg-body text-appText account-card">
        <q-card-section class="q-pb-xs">
          <div class="row items-center justify-between no-wrap">
            <div class="row items-center gap-xs">
              <div class="text-h6 text-weight-bold">{{ item.labelTh }}</div>
            </div>

            <div class="row items-center no-wrap q-gutter-x-xs">
              <!-- Notification Icon with Badge -->
              <q-btn
                v-if="item.notifyCount > 0"
                flat
                round
                dense
                class="bg-body text-appText"
                icon="mdi-bell-outline"
                @click="onNotifyClick(item)"
              >
                <q-badge color="negative" floating rounded>
                  {{ item.notifyCount > 99 ? '99+' : item.notifyCount }}
                </q-badge>
                <q-tooltip class="bg-dark text-body2">
                  {{ item.notifyCount }} notifications
                </q-tooltip>
              </q-btn>

              <!-- Category Main Icon -->
              <q-avatar :color="item.color" text-color="white" :icon="item.icon" size="42px" />
            </div>
          </div>
        </q-card-section>

        <q-separator inset class="q-my-xs" />

        <q-card-section class="q-pt-xs">
          <!-- Dr Row -->
          <div class="row items-center justify-between text-caption q-mb-xs">
            <q-chip
              dense
              size="sm"
              :color="item.drEffect === '+' ? 'positive' : 'negative'"
              text-color="white"
            >
              Dr: {{ item.drEffect }}
            </q-chip>
            <div class="text-right text-weight-bolder text-subtitle2 text-primary ellipsis">
              {{ formatCurrency(item.totalDebit) }}
            </div>
          </div>

          <!-- Cr Row -->
          <div class="row items-center justify-between text-caption">
            <q-chip
              dense
              size="sm"
              :color="item.crEffect === '+' ? 'positive' : 'negative'"
              text-color="white"
            >
              Cr: {{ item.crEffect }}
            </q-chip>
            <div class="text-right text-weight-bolder text-subtitle2 text-primary ellipsis">
              {{ formatCurrency(item.totalCredit) }}
            </div>
          </div>

          <div v-if="item.description" class="text-caption text-grey-6 q-mt-xs">
            {{ item.description }}
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { CategoryMeta } from '../types/myTypes'
import { formatCurrency } from '../modules/appUtils'

export default defineComponent({
  name: 'DashBoardComp',
  props: {
    categoryList: {
      type: Object as PropType<Record<number, CategoryMeta>>,
      default: () => ({})
    }
  },
  emits: ['notify-click'],
  setup(props, { emit }) {
    const categoryMetadata = computed(() => {
      return Object.values(props.categoryList || {})
    })

    const onNotifyClick = (item: CategoryMeta) => {
      emit('notify-click', item)
    }

    return { formatCurrency, categoryMetadata, onNotifyClick }
  }
})
</script>

<style scoped lang="sass">
.account-card
  transition: transform 0.2s ease, box-shadow 0.2s ease

  &:hover
    transform: translateY(-2px)
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1)

.ellipsis
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
</style>
