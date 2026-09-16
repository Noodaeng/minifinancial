<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-xs flex-shrink-0">
      <div class="row items-center">
        <div class="text-h6 text-weight-bold text-appText">
          {{ $t('Dashboard_overview') }}
        </div>
      </div>
      <div>
        <q-btn
          icon="cloud_download"
          @click="handleBackupClick"
          :disabled="loading"
          unelevated
          round
          class="q-ma-sm shadow-3 bg-body text-appText"
        >
        </q-btn>
        <p v-if="loadingErrorMsg" style="color: red">{{ loadingErrorMsg }}</p>
      </div>
    </div>
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
import { useD1Backup } from '../hooks/useD1Backup.js'
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
    const useBackUp = useD1Backup()
    const isLoanNotifiesOpen = ref(false)
    onMounted(async () => {
      await useDash.Init()
      useBackUp.checkAndAutoBackup()
    })
    const handleCategoryNotify = (item: CategoryMeta) => {
      isLoanNotifiesOpen.value =
        item.value === AccountCategory.Assets &&
        useDash.loanNotifies.value &&
        useDash.loanNotifies.value.length > 0
    }
    function handleBackupClick() {
      // Pass your actual frontend token string checked by isValidFrontendToken
      useBackUp.downloadBackupD1()
    }
    return {
      categoryMetadata: useDash.categoryMetadata,
      notifies: useDash.loanNotifies,
      isLoanNotifiesOpen,
      loading: useBackUp.loading,
      loadingErrorMsg: useBackUp.errorMessage,
      handleCategoryNotify,
      handleBackupClick
    }
  }
})
</script>

<style scoped>
.flex-shrink-0 {
  flex-shrink: 0;
}
</style>
