<template>
  <div class="q-pa-md">
    <q-form ref="myForm" class="bg-body text-appText">
      <q-card flat class="bg-body text-appText col-12">
        <div class="row items-center q-mb-md">
          <q-icon name="mdi-account-details-outline" size="md" />
          <div class="text-subtitle1 q-ml-sm"></div>
        </div>

        <!-- Using q-col-gutter-md manages padding between controls fluidly -->
        <div class="row q-col-gutter-md">
          <div
            v-for="session in details"
            :key="session.description"
            v-bind="session"
            class="col-12 col-sm-6 col-md-6"
          >
            <q-btn :disable="!session.enble" class="bg-body text-appText" @click="session.actClick">
              <q-icon left size="sm" :name="session.iconName" />
              <div>{{ session.description }}</div>
            </q-btn>
          </div>
        </div>
      </q-card>
    </q-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { i18n } from '../i18n'
import { PortDetail } from '../types/myTypes'
export default defineComponent({
  name: 'PortDetailComp',
  components: {},
  data() {
    return {}
  },

  props: {
    details: {
      type: Array as PropType<PortDetail[]>,
      required: false,
      default: (): PortDetail[] => [
        {
          enble: true,
          visible: true,
          description: 'Default Port',
          iconName: 'icon-default',
          actClick: () => console.log('Default click')
        }
      ]
    }
  },

  setup() {
    const { t } = i18n.global

    return {}
  },
  methods: {}
})
</script>
<style></style>
