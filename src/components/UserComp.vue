<template>
  <div class="q-pa-md">
    <q-form ref="myForm" class="bg-body text-appText">
      <q-card flat class="bg-body text-appText col-12">
        <!-- Header Zone -->
        <div class="row items-center q-mb-md">
          <q-icon :name="childIcon" size="md" />
          <div class="text-subtitle1 q-ml-sm">{{ $t('User_Accounts') }}: {{ model?.userId }}</div>
        </div>

        <!-- Coordinated Gutter Layout Grid -->
        <div class="row q-col-gutter-md">
          <!-- Row segment 1 elements -->
          <div class="col-12 col-sm-6 col-md-3">
            <q-input
              outlined
              v-model="model.userName"
              :label="$t('User_Name')"
              label-color="appLabel"
              :hint="$t('User_Name')"
              :rules="[...strRule, val => val !== 'super' || $t('Username_Super_Not_Allowed')]"
              lazy-rules
              dense
              input-class="text-appText"
            />
          </div>
          <div class="col-12 col-sm-6 col-md-3">
            <q-input
              outlined
              type="password"
              v-model="pwd"
              :label="$t('Password')"
              label-color="appLabel"
              :hint="$t('Password')"
              :rules="strRule"
              lazy-rules
              dense
              input-class="text-appText"
            />
          </div>

          <!-- Row segment 2 elements -->
          <div class="col-12 col-sm-6 col-md-3">
            <q-select
              v-model="model.role"
              class="bg-body text-appText"
              label-color="appLabel"
              :label="$t('Role')"
              :hint="$t('Role')"
              :options="roleOption"
              dense
              outlined
              emit-value
              map-options
              options-dense
              popup-content-class="bg-body text-appText"
            />
          </div>

          <div class="col-12 col-sm-6 col-md-3">
            <q-input
              outlined
              v-model="model.sessionToken"
              :label="$t('Session_Token')"
              label-color="appLabel"
              :hint="$t('Session_Token')"
              dense
              input-class="text-appText"
            />
          </div>

          <div class="col-12 col-sm-6 col-md-3">
            <q-input
              outlined
              v-model="model.createOn"
              :label="$t('Create_on')"
              label-color="appLabel"
              :hint="$t('Create_on')"
              :readonly="true"
              dense
              input-class="text-appText"
            />
          </div>

          <!-- Row segment 3 elements -->
          <div class="col-12 col-sm-12 col-md-12">
            <q-input
              outlined
              v-model="model.remark"
              :label="$t('Remark')"
              label-color="appLabel"
              :hint="$t('Remark')"
              dense
              input-class="text-appText"
            />
          </div>
        </div>

        <div class="row justify-end items-center q-mt-sm">
          <div class="col-12 col-sm-auto bg-body text-appText">
            <SaveCancelBtn
              class="full-width"
              :enbBtnDiscard="false"
              :enbBtnSave="enbBtnSave"
              @onClickSave="$emit('onClickSave')"
            />
          </div>
        </div>
      </q-card>
    </q-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { modelConverter, enumToQSelectOptions } from '../modules/appUtils'
import User from '../models/user'
import { useValidationRules } from '../hooks/useValidationRules'
import { i18n } from '../i18n'
import { ERole } from '../types/myEnums'
import SaveCancelBtn from '../components/utils/SaveCancelBtn.vue'
import MyConfig from '../modules/myConfig'
export default defineComponent({
  name: 'UserComp',
  components: { SaveCancelBtn },
  emits: ['onClickSave', 'update:displayPassword'],
  props: {
    info: {
      type: Object,
      default: () => ({})
    },
    displayPassword: {
      type: String,
      default: ''
    },
    enbBtnSave: {
      type: Boolean,
      default: false
    },
    childIcon: {
      type: String,
      default: 'mdi-account-outline'
    }
  },
  setup(props, { emit }) {
    const myForm = ref()
    const { t } = i18n.global
    const rules = useValidationRules(t)

    const clearValidation = () => {
      myForm.value?.resetValidation()
    }

    const getValidate = async (): Promise<boolean> => {
      const valid = await myForm.value?.validate()
      return valid ?? false
    }

    // Proxy prop value to allow two-way binding back to parent
    const pwd = computed({
      get() {
        return props.displayPassword
      },
      set(val: string) {
        emit('update:displayPassword', val)
      }
    })

    const strRule = rules.string()

    return {
      model: modelConverter<User>(props.info) ?? new User(),
      roleOption: enumToQSelectOptions(ERole).filter(
        r => r.value < MyConfig.instance.LoginUserRole
      ),
      strRule,
      pwd,
      myForm,
      clearValidation,
      getValidate
    }
  }
})
</script>

<style scoped>
::v-deep(.q-select .q-field__native) {
  color: var(--q-color-appText);
}
</style>
