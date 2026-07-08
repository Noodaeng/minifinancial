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
                    :enbBtnCreate="true"
                    :enbBtnEdit="true"
                    :enbBtnDelete="true"
                  ></StateCtrlBtn>
                </div>
              </div>
              <q-separator />
              <ListComp :rows="filteredRows" :columns="listColumns"></ListComp>
            </q-card>
          </div>
        </template>
        <template v-slot:after>
          <div class="q-pa-md">
            <q-card class="bg-body text-appText">
              <CustomerComp :info="customer"></CustomerComp>
            </q-card>
          </div>
          <div class="row justify-end items-start">
            <div class="col-12 col-md-6 bg-body text-appText">
              <SaveCancelBtn :enbBtnDiscard="true" :enbBtnSave="true"> </SaveCancelBtn>
            </div>
          </div>
        </template>
      </q-splitter>
    </div>
    {{ filteredRows }}
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
    const { customers, customer, listColumns, filteredRows, Init, getAllCustomer } =
      useCustomerProp()
    onMounted(async () => {
      await Init()
    })

    return {
      splitterModel: ref(35), // start at 20%
      listColumns,
      filteredRows,
      customer,
      customers
    }
  },
  methods: {}
})
</script>
<style lang="sass" scoped></style>
