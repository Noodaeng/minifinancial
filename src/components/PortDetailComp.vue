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
          <!-- Row 1 Items -->
          <div v-if="detail01.visible" class="col-12 col-sm-6 col-md-3">
            <q-btn
              :disable="!detail01.enble"
              class="bg-body text-appText"
              @click="detail01.actClick"
            >
              <q-icon left size="3em" :name="detail01.iconName" />
              <div>{{ detail01.description }}</div>
            </q-btn>
          </div>
          <div v-if="detail01.visible" class="col-12 col-sm-6 col-md-3">
            <q-btn
              :disable="!detail01.enble"
              class="bg-body text-appText"
              @click="detail01.actClick"
            >
              <q-icon left size="3em" :name="detail01.iconName" />
              <div>{{ detail01.description }}</div>
            </q-btn>
          </div>
          <div v-if="detail01.visible" class="col-12 col-sm-6 col-md-3">
            <q-btn
              :disable="!detail01.enble"
              class="bg-body text-appText"
              @click="detail01.actClick"
            >
              <q-icon left size="3em" :name="detail01.iconName" />
              <div>{{ detail01.description }}</div>
            </q-btn>
          </div>
          <div v-if="detail01.visible" class="col-12 col-sm-6 col-md-3">
            <q-btn
              :disable="!detail01.enble"
              class="bg-body text-appText"
              @click="detail01.actClick"
            >
              <q-icon left size="3em" :name="detail01.iconName" />
              <div>{{ detail01.description }}</div>
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
    detail01: {
      type: Object as PropType<PortDetail>,
      required: false,
      default: (): PortDetail => ({
        enble: true,
        visible: true,
        description: 'Default Port',
        iconName: 'icon-default',
        actClick: () => console.log('Default click')
      })
    },
    detail02: {
      type: Object as PropType<PortDetail>,
      required: false,
      default: (): PortDetail => ({
        enble: true,
        visible: true,
        description: 'Default Port',
        iconName: 'icon-default',
        actClick: () => console.log('Default click')
      })
    },
    detail03: {
      type: Object as PropType<PortDetail>,
      required: false,
      default: (): PortDetail => ({
        enble: true,
        visible: true,
        description: 'Default Port',
        iconName: 'icon-default',
        actClick: () => console.log('Default click')
      })
    },
    detail04: {
      type: Object as PropType<PortDetail>,
      required: false,
      default: (): PortDetail => ({
        enble: true,
        visible: true,
        description: 'Default Port',
        iconName: 'icon-default',
        actClick: () => console.log('Default click')
      })
    },
    detail05: {
      type: Object as PropType<PortDetail>,
      required: false,
      default: (): PortDetail => ({
        enble: true,
        visible: true,
        description: 'Default Port',
        iconName: 'icon-default',
        actClick: () => console.log('Default click')
      })
    },
    detail06: {
      type: Object as PropType<PortDetail>,
      required: false,
      default: (): PortDetail => ({
        enble: true,
        visible: true,
        description: 'Default Port',
        iconName: 'icon-default',
        actClick: () => console.log('Default click')
      })
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
