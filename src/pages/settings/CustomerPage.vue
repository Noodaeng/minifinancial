<template>
  <q-page class="row items-center justify-evenly bg-body text-appText">
    <div class="q-pa-md fit">
      <q-splitter
        v-model="splitterModel"
        before-class="bg-body text-appText "
        after-class="bg-body text-appText fit"
        style="height: 80vh"
      >
        <template v-slot:before>
          <div class="q-pa-md">
            <q-card class="bg-body text-appText">
              <div class="row justify-start items-start">
                <div class="col-12 col-md-5">
                  <StateCtrlBtn
                    :enbBtnCreate="canCreate"
                    :enbBtnEdit="false"
                    :enbBtnDelete="canDelete"
                    @onClickCreate="onCreate"
                    @onClickDelete="onDelete"
                  ></StateCtrlBtn>
                </div>
              </div>
              <q-separator />
              <ListComp
                :rows="filteredRows"
                :columns="listColumns"
                @onRowClick="onRowClick"
                @onFilter="onFilter"
              ></ListComp>
            </q-card>
          </div>
        </template>
        <template v-slot:after>
          <div class="q-pa-md">
            <q-card class="bg-body text-appText">
              <CustomerComp ref="myChild" :info="customer"></CustomerComp>
            </q-card>
          </div>
          <div class="row justify-end items-start">
            <div class="col-12 col-md-6 bg-body text-appText">
              <SaveCancelBtn :enbBtnDiscard="false" :enbBtnSave="canSave" @onClickSave="onSave">
              </SaveCancelBtn>
            </div>
          </div>
        </template>
      </q-splitter>
    </div>
    {{ state }}- {{ customer }}
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
  props: {
    isDialog: {
      type: Boolean,
      default: false
    },
    parentCusId: {
      type: String,
      default: ''
    }
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
      useCustomer.getValidate.value = async (): Promise<boolean> => {
        return (await myChild.value?.getValidate()) ?? false
      }
      await useCustomer.Init()
    })
    const save = async () => {
      const valid = await myChild.value?.getValidate()

      if (!valid) {
        return
      }
    }
    return {
      splitterModel: ref(35), // start at 20%
      listColumns: useCustomer.listColumns,
      filteredRows: useCustomer.filteredRows,
      customer: useCustomer.customer,
      customers: useCustomer.customers,
      onRowClick: useCustomer.onRowClick,
      onFilter: useCustomer.onFilter,
      onCreate: useCustomer.onCreate,
      onDelete: useCustomer.onDelete,
      onSave: useCustomer.onSave,
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
<style lang="sass" scoped></style>
