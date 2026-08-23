<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold q-mb-md">Dashboard Overview</div>

    <!-- Account Categories Summary Grid -->
    <DashBoardComp
      :categoryList="categoryMetadata"
      @notify-click="handleCategoryNotify"
      class="q-mb-lg"
    />

    <!-- Rest of your dashboard widgets -->
    <div class="row q-col-gutter-md">
      <!-- Charts, tables, etc. -->
    </div>
    <!-- Loan notifies-->
    <q-dialog
      v-model="isLoanNotifiesOpen"
      class="bg-body text-appText"
      transition-show="scale"
      transition-hide="scale"
    >
      <DiaLoanNotifies v-model:notifies="notifies" />
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import DashBoardComp from '../components/DashBoardComp.vue'
import { useDashBoard } from '../hooks/useDashBoard'
import { CategoryMeta } from '../types/myTypes.js'
import DiaLoanNotifies from '../components/DiaLoanNotifies.vue'
import { AccountCategory } from '../types/myEnums.js'
export default defineComponent({
  name: 'DashBoardPage',
  components: {
    DashBoardComp,
    DiaLoanNotifies
  },

  setup() {
    const useDash = useDashBoard()
    const isLoanNotifiesOpen = ref(false)
    onMounted(async () => {
      await useDash.Init()
    })
    const handleCategoryNotify = (item: CategoryMeta) => {
      isLoanNotifiesOpen.value =
        item.value === AccountCategory.Assets &&
        useDash.loanNotifies.value &&
        useDash.loanNotifies.value.length > 0
    }
    return {
      categoryMetadata: useDash.categoryMetadata,
      notifies: useDash.loanNotifies,
      isLoanNotifiesOpen,
      handleCategoryNotify
    }
  }
})
</script>

<style></style>
