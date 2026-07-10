<template>
  <div class="q-pa-md">
    <q-select
      v-model="locale"
      @update:model-value="updateLanguage"
      :options="langs"
      lazy-rules
      emit-value
      map-options
      options-dense
      popup-content-class="bg-body text-appText"
    >
      <template v-slot:prepend>
        <q-icon name="fas fa-globe" class="q-ma-sm bg-appLayout text-appText" size="xs" />
      </template>
    </q-select>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import MyConfig from '../modules/myConfig'
//import { useI18nLoader } from '../hooks/useI18nLoader'
export default defineComponent({
  name: 'LanguageSwitcher',
  setup() {
    //const { changeLocaleSafe } = useI18nLoader()
    const { locale } = useI18n({ useScope: 'global' })
    const langs: Ref<{ value: string; label: string }[]> = ref([
      { value: 'en-US', label: 'English' },
      { value: 'th-TH', label: 'ภาษาไทย' },
      { value: 'zh-CN', label: '中國人' },
    ])

    const updateLanguage = async (val: string) => {
      //await changeLocaleSafe(val)
      MyConfig.instance.LastLanguage = val
    }

    return {
      locale,
      updateLanguage,
      langs,
    }
  },
})
</script>
