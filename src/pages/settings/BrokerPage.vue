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
              <BrokerComp ref="myChild" :info="broker"></BrokerComp>
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
    {{ state }}- {{ broker }}
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
  data() {
    return {
      childIcon: 'mdi-widgets-outline'
    }
  },
  setup(_, { emit }) {
    const myChild = ref<InstanceType<typeof BrokerComp>>()
    const useBroker = useBrokerProp()
    onMounted(async () => {
      useBroker.clearValidate.value = () => {
        myChild.value?.clearValidation()
      }
      useBroker.getValidate.value = async (): Promise<boolean> => {
        return (await myChild.value?.getValidate()) ?? false
      }
      await useBroker.Init()
    })
    const save = async () => {
      const valid = await myChild.value?.getValidate()

      if (!valid) {
        return
      }
    }
    return {
      splitterModel: ref(35), // start at 20%
      listColumns: useBroker.listColumns,
      filteredRows: useBroker.filteredRows,
      broker: useBroker.item,
      brokers: useBroker.items,
      onRowClick: useBroker.onRowClick,
      onFilter: useBroker.onFilter,
      onCreate: useBroker.onCreate,
      onDelete: useBroker.onDelete,
      onSave: useBroker.onSave,
      canDelete: useBroker.canDelete,
      canCreate: useBroker.canCreate,
      canSave: useBroker.canSave,
      state: useBroker.state,
      myChild
    }
  },
  methods: {}
})
</script>
<style lang="sass" scoped></style>
