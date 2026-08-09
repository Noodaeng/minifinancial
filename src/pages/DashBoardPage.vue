<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold q-mb-md">Dashboard Overview</div>

    <!-- Account Categories Summary Grid -->
    <DashBoardComp :categoryList="categoryMetadata" class="q-mb-lg" />

    <!-- Rest of your dashboard widgets -->
    <div class="row q-col-gutter-md">
      <!-- Charts, tables, etc. -->
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import DashBoardComp from '../components/DashBoardComp.vue'
import { useDashBoard } from '../hooks/useDashBoard'
export default defineComponent({
  name: 'DashBoardPage',
  components: {
    DashBoardComp
  },

  setup() {
    const useDash = useDashBoard()
    onMounted(async () => {
      await useDash.Init()
    })

    return {
      categoryMetadata: useDash.categoryMetadata
    }
  }
})
</script>

<style></style>
