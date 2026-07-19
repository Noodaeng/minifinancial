<template>
  <q-page class="bg-body text-appText q-pa-md">
    <!-- Responsive flex grid framework replacing the old q-splitter -->
    <div class="row q-col-gutter-md">
      <!-- LEFT / TOP COLUMN: Data list & Control panel -->
      <div class="col-12 col-md-4">
        <q-card class="bg-body text-appText flat bordered full-height-card">
          <div class="row justify-between items-center q-pa-sm">
            <StateCtrlBtn
              :enbBtnCreate="canCreate"
              :enbBtnEdit="false"
              :enbBtnDelete="canDelete"
              @onClickCreate="onCreate"
              @onClickDelete="onDelete"
            />
          </div>
          <q-separator />

          <ListComp
            :rows="filteredRows"
            :columns="listColumns"
            @onRowClick="onRowClick"
            @onFilter="onFilter"
          />
        </q-card>
      </div>

      <!-- RIGHT / BOTTOM COLUMN: Detailed Form View & Primary Actions -->
      <div class="col-12 col-md-8">
        <div class="column justify-between full-height">
          <q-card class="bg-body text-appText flat bordered q-mb-md">
            <BrokerComp ref="myChild" :info="broker" />
          </q-card>

          <!-- Bottom Action Buttons Strip -->
          <div class="row justify-end items-center q-mt-sm">
            <div class="col-12 col-sm-auto bg-body text-appText">
              <SaveCancelBtn
                class="full-width"
                :enbBtnDiscard="false"
                :enbBtnSave="canSave"
                @onClickSave="onSave"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="q-mt-sm text-caption text-grey">{{ state }} - {{ broker }}</div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import BrokerComp from '../../components/BrokerComp.vue'
import ListComp from '../../components/utils/ListComp.vue'
import StateCtrlBtn from '../../components/utils/StateCtrlBtn.vue'
import SaveCancelBtn from '../../components/utils/SaveCancelBtn.vue'
import { useBrokerProp } from '../../hooks/useBrokerProp'

export default defineComponent({
  name: 'BrokerPage',
  components: {
    BrokerComp,
    ListComp,
    StateCtrlBtn,
    SaveCancelBtn
  },
  setup() {
    const myChild = ref<InstanceType<typeof BrokerComp>>()
    const useBroker = useBrokerProp()

    onMounted(async () => {
      useBroker.clearValidate.value = () => {
        myChild.value?.clearValidation()
      }
      await useBroker.Init()
    })

    const save = async () => {
      const valid = await myChild.value?.getValidate()
      if (!valid) {
        useBroker.resetDataState()
        return
      }
      useBroker.onSave()
    }

    return {
      listColumns: useBroker.listColumns,
      filteredRows: useBroker.filteredRows,
      broker: useBroker.item,
      brokers: useBroker.items,
      onRowClick: useBroker.onRowClick,
      onFilter: useBroker.onFilter,
      onCreate: useBroker.onCreateBroker,
      onDelete: useBroker.onDelete,
      onSave: save,
      canDelete: useBroker.canDelete,
      canCreate: useBroker.canCreate,
      canSave: useBroker.canSave,
      state: useBroker.state,
      myChild
    }
  }
})
</script>

<style lang="sass" scoped>
@media (min-width: 1024px)
  .full-height-card
    min-height: 80vh
</style>
