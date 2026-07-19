<template>
  <q-page class="bg-body text-appText q-pa-md">
    <!-- Responsive flex container replacing the splitter structure -->
    <div class="row q-col-gutter-md">
      <!-- LEFT / TOP SIDE: Controls & Selection Table -->
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

      <!-- RIGHT / BOTTOM SIDE: Detailed Customer Profile Form & Action Strip -->
      <div class="col-12 col-md-8">
        <div class="column justify-between full-height">
          <q-card class="bg-body text-appText flat bordered q-mb-md">
            <CustomerComp ref="myChild" :info="customer" />
          </q-card>

          <!-- Bottom Action Buttons aligned dynamically -->
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
    <div class="q-mt-sm text-caption text-grey">{{ state }} - {{ customer }}</div>
  </q-page>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import CustomerComp from '../../components/CustomerComp.vue'
import ListComp from '../../components/utils/ListComp.vue'
import StateCtrlBtn from '../../components/utils/StateCtrlBtn.vue'
import SaveCancelBtn from '../../components/utils/SaveCancelBtn.vue'
import { useCustomerProp } from '../../hooks/useCustomerProp'
export default defineComponent({
  name: 'CustomerPage',
  components: {
    CustomerComp,
    ListComp,
    StateCtrlBtn,
    SaveCancelBtn
  },
  data() {
    return {
      childIcon: 'mdi-widgets-outline'
    }
  },
  setup(_, { emit }) {
    const myChild = ref<InstanceType<typeof CustomerComp>>()
    const useCustomer = useCustomerProp()
    onMounted(async () => {
      useCustomer.clearValidate.value = () => {
        myChild.value?.clearValidation()
      }
      await useCustomer.Init()
    })
    const save = async () => {
      const valid = await myChild.value?.getValidate()
      if (!valid) {
        useCustomer.resetDataState()
        return
      }
      useCustomer.onSave()
    }
    return {
      splitterModel: ref(35), // start at 20%
      listColumns: useCustomer.listColumns,
      filteredRows: useCustomer.filteredRows,
      customer: useCustomer.item,
      customers: useCustomer.items,
      onRowClick: useCustomer.onRowClick,
      onFilter: useCustomer.onFilter,
      onCreate: useCustomer.onCreateCustomer,
      onDelete: useCustomer.onDelete,
      onSave: save,
      canDelete: useCustomer.canDelete,
      canCreate: useCustomer.canCreate,
      canSave: useCustomer.canSave,
      state: useCustomer.state,
      myChild
    }
  },
  methods: {}
})
</script>
<style lang="sass" scoped>
// Desktop breakpoint constraint for layout parity
@media (min-width: 1024px)
  .full-height-card
    min-height: 80vh
</style>
