<template>
  <div>
    <div v-if="children.length == 0">
      <q-item clickable v-ripple :inset-level="level">
        <q-item-section avatar>
          <q-avatar :icon="icon" />
        </q-item-section>
        <q-item-section @click="$router.replace(link)">{{
          $t(title)
        }}</q-item-section>
      </q-item>
    </div>
    <div v-else>
      <div v-if="children.length > 0">
        <!-- {{children}} -->
        <q-expansion-item
          expand-separator
          active-text-color="text-white"
          @click="$router.replace(link)"
          :icon="icon"
          :label="$t(title)"
          :caption="caption"
          :header-inset-level="level"
          default-closed
        >
          <EssentialLink v-for="child in children" :key="child" v-bind="child">
          </EssentialLink>
        </q-expansion-item>
      </div>
      <div v-else>
        <q-item clickable v-ripple :inset-level="level">
          <q-item-section @click="$router.replace(link)">{{
            $t(title)
          }}</q-item-section>
        </q-item>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: '',
    },

    link: {
      type: String,
      default: '#',
    },

    icon: {
      type: String,
      default: '',
    },

    level: {
      type: Number,
      default: 0,
    },
    children: {
      type: Object,
      default: null,
    },
  },
};
</script>
