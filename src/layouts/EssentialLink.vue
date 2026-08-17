<template>
  <div>
    <!-- Leaf Item (No Children) -->
    <q-item
      v-if="!children || children.length === 0"
      clickable
      v-ripple
      :to="link !== '/' ? link : undefined"
      :inset-level="level"
    >
      <q-item-section v-if="icon" avatar min-width="40px">
        <q-icon :name="icon" size="24px" />
      </q-item-section>
      <q-item-section>{{ $t(title) }}</q-item-section>
    </q-item>

    <!-- Parent Item (Has Children) -->
    <q-expansion-item
      v-else
      expand-separator
      active-text-color="text-white"
      :icon="icon"
      :label="$t(title)"
      :caption="caption"
      :header-inset-level="level"
      default-closed
    >
      <EssentialLink v-for="child in children" :key="child.title" v-bind="child" />
    </q-expansion-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      default: ''
    },
    link: {
      type: [String, Object] as PropType<string | object>,
      default: '#'
    },
    icon: {
      type: String,
      default: ''
    },
    level: {
      type: Number,
      default: 0
    },
    children: {
      type: Array as PropType<any[]>,
      default: () => []
    }
  }
})
</script>
