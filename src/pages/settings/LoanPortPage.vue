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
              <PortComp
                ref="myChild"
                :portType="EInvestPortType.LoansReceivable"
                :info="port"
              ></PortComp>
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
    {{ state }}- {{ customers }}
  </q-page>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import PortComp from '../../components/PortComp.vue'
import ListComp from '../../components/utils/ListComp.vue'
import StateCtrlBtn from '../../components/utils/StateCtrlBtn.vue'
import SaveCancelBtn from '../../components/utils/SaveCancelBtn.vue'
import { usePortProp } from '../../hooks/usePortProp'
import { EInvestPortType } from '../../types/myEnums'

export default defineComponent({
  name: 'LoanPortPage',
  components: {
    PortComp,
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
    const myChild = ref<InstanceType<typeof PortComp>>()
    const usePort = usePortProp(EInvestPortType.LoansReceivable)
    onMounted(async () => {
      await usePort.initCustomerList()
      usePort.clearValidate.value = () => {
        myChild.value?.clearValidation()
      }
      usePort.getValidate.value = async (): Promise<boolean> => {
        return (await myChild.value?.getValidate()) ?? false
      }
      await usePort.Init()
    })
    const save = async () => {
      const valid = await myChild.value?.getValidate()

      if (!valid) {
        return
      }
    }
    return {
      splitterModel: ref(35), // start at 20%
      listColumns: usePort.listColumns,
      filteredRows: usePort.filteredRows,
      port: usePort.item,
      ports: usePort.items,
      customers: usePort.customers,
      onRowClick: usePort.onRowClick,
      onFilter: usePort.onFilter,
      onCreate: usePort.onCreate,
      onDelete: usePort.onDelete,
      onSave: usePort.onSave,
      canDelete: usePort.canDelete,
      canCreate: usePort.canCreate,
      canSave: usePort.canSave,
      state: usePort.state,
      myChild,
      EInvestPortType
    }
  },
  methods: {}
})
</script>
<style lang="sass" scoped></style>
