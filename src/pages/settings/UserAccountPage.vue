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

      <!-- RIGHT / BOTTOM SIDE: Detailed User Profile Form & Action Strip -->
      <div class="col-12 col-md-8">
        <div class="column justify-between full-height">
          <q-card class="bg-body text-appText flat bordered q-mb-md">
            <q-card-section class="q-pb-none">
              <UserComp
                ref="myChild"
                :info="user"
                :enbBtnSave="canSave"
                v-model:displayPassword="displayPassword"
                @onClickSave="onSave"
                :childIcon="childIcon"
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import UserComp from '../../components/UserComp.vue'
import ListComp from '../../components/utils/ListComp.vue'
import StateCtrlBtn from '../../components/utils/StateCtrlBtn.vue'
import { useUserProp } from '../../hooks/useUserProp'

export default defineComponent({
  name: 'UserAccountPage',
  components: {
    UserComp,
    ListComp,
    StateCtrlBtn
  },
  props: {
    childIcon: {
      type: String,
      default: 'mdi-account-outline'
    }
  },
  data() {
    return {}
  },
  setup(_, { emit }) {
    const myChild = ref<InstanceType<typeof UserComp>>()
    const useUser = useUserProp()

    onMounted(async () => {
      useUser.clearValidate.value = () => {
        myChild.value?.clearValidation()
      }
      await useUser.Init()
    })

    const save = async () => {
      const valid = await myChild.value?.getValidate()
      if (!valid || useUser.item.value.userName === 'super') {
        useUser.resetDataState()
        return
      }
      useUser.onSave()
    }
    // Inside setup():
    const displayPassword = computed({
      get() {
        return useUser.decryptCredentials(useUser.item.value?.password ?? '')
      },
      set(val: string) {
        if (useUser.item.value) {
          useUser.item.value.password = useUser.hashCredentials(val)
        }
      }
    })
    return {
      splitterModel: ref(35),
      listColumns: useUser.listColumns,
      filteredRows: useUser.filteredRows,
      user: useUser.item,
      users: useUser.items,
      onRowClick: useUser.onRowClick,
      onFilter: useUser.onFilter,
      onCreate: useUser.onCreateUser,
      onDelete: useUser.onDelete,
      onSave: save,
      canDelete: useUser.canDelete,
      canCreate: useUser.canCreate,
      canSave: useUser.canSave,
      state: useUser.state,
      displayPassword,
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
