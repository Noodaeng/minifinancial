<template>
  <div class="q-pa-md">
    <q-select
      v-model="appTheme"
      :options="themes"
      dense
      borderless
      emit-value
      map-options
      options-dense
      input-class="q-ma-sm bg-appLayout text-appText"
      popup-content-class="bg-body text-appText"
    >
      <template v-slot:prepend>
        <q-icon name="fas fa-palette" class="q-ma-sm bg-appLayout text-appText" size="xs" />
      </template>
    </q-select>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted,computed } from 'vue'
import { appTheme,  appTextSize } from '../modules/state'
import { setTheme, setTextSize } from '../modules/themeutils'
import MyConfig from '../modules/myConfig'
import { ApplicationTheme } from '../types/myTypes'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ThemeSwitcher',
  setup() {
    const { t } = useI18n()

 const  themes = computed(() => {
      return (['bcs-default', 'bcs-dark', 'bcs-medium'] as ApplicationTheme[])
        .map(value => ({
          label: t(`themes.${value}`), // translated label
          value
        }))
    })

    onMounted(() => {
      appTheme.value = MyConfig.instance.LastTheme
      setTheme(appTheme)
      setTextSize(appTextSize)
    })

    return {
      themes,
      appTheme,
    }
  },
})
</script>

<style lang="scss"></style>
