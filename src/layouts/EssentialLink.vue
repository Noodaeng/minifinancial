<template>
  <div>
    <!-- Leaf Item (No Children) -->
    <q-item v-if="!hasChildren" clickable v-ripple :to="normalizedLink" :inset-level="level" exact>
      <q-item-section v-if="icon" avatar style="min-width: 40px">
        <q-icon :name="icon" size="24px" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ $t(title) }}</q-item-label>
        <q-item-label v-if="caption" caption>{{ $t(caption) }}</q-item-label>
      </q-item-section>
    </q-item>

    <!-- Parent Item (Has Children) -->
    <q-expansion-item
      v-else
      expand-separator
      active-text-color="text-white"
      :icon="icon"
      :label="$t(title)"
      :caption="caption ? $t(caption) : undefined"
      :header-inset-level="level"
      default-closed
      @click="handleParentClick"
    >
      <EssentialLink
        v-for="child in children"
        :key="getItemKey(child)"
        v-bind="child"
        :level="level + 0.5"
      />
    </q-expansion-item>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import { RouteLocationRaw, useRouter } from 'vue-router'

interface MenuItem {
  title: string
  caption?: string
  link?: RouteLocationRaw
  icon?: string
  level?: number
  children?: MenuItem[]
}

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    default: ''
  },
  link: {
    type: [String, Object] as PropType<RouteLocationRaw>,
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
    type: Array as PropType<MenuItem[]>,
    default: () => []
  }
})

const router = useRouter()

const hasChildren = computed(() => props.children && props.children.length > 0)

const normalizedLink = computed(() => props.link || '/')

// Handles navigation when a level-0 parent with link '/' is clicked
const handleParentClick = () => {
  if (props.level === 0 && props.link === '/') {
    router.push('/')
  }
}

// Generates a unique key for router objects or strings in v-for loops
const getItemKey = (child: MenuItem): string => {
  if (typeof child.link === 'string') return child.link

  if (child.link && typeof child.link === 'object') {
    if ('name' in child.link && child.link.name) {
      return `${String(child.link.name)}-${child.title}`
    }
    if ('path' in child.link && child.link.path) {
      return `${child.link.path}-${child.title}`
    }
  }

  return child.title
}
</script>
