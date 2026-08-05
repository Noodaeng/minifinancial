<template>
  <div class="row q-col-gutter-md">
    <div v-for="item in categoryList" :key="item.value" class="col-12 col-sm-6 col-md-4 col-lg">
      <q-card flat bordered class="bg-body text-appText account-card">
        <q-card-section class="q-pb-xs">
          <div class="row items-center justify-between no-wrap">
            <div>
              <div class="text-h6 text-weight-bold">{{ item.labelTh }}</div>
            </div>
            <q-avatar :color="item.color" text-color="white" :icon="item.icon" size="42px" />
          </div>
        </q-card-section>

        <q-separator inset class="q-my-xs" />

        <q-card-section class="q-pt-xs">
          <div class="row q-gutter-x-sm text-caption">
            <q-chip
              dense
              size="sm"
              :color="item.drEffect === '+' ? 'positive' : 'negative'"
              text-color="white"
            >
              Dr: {{ item.drEffect }}
            </q-chip>
            <q-chip
              dense
              size="sm"
              :color="item.crEffect === '+' ? 'positive' : 'negative'"
              text-color="white"
            >
              Cr: {{ item.crEffect }}
            </q-chip>
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
import { AccountCategory } from '../types/myEnums'
import { CategoryMeta } from '../types/myTypes'
import { useDashBoard } from '../hooks/useDashBoard'

export default defineComponent({
  name: 'DashBoardComp',
  components: {},
  props: {},
  setup() {
    const { categoryMetadata } = useDashBoard()

    const categoryList = computed(() => Object.values(categoryMetadata))
    return {
      categoryList
    }
  }
})
</script>

<style scoped>
.account-card {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}
.account-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
