<template>
  <q-page class="row items-center justify-evenly bg-body text-appText">
    <div>
      <q-form class="q-gutter-md q-mt-sm">

        <div>{{ $t('Dashboard') }} ............... </div>

      </q-form>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'


export default defineComponent({
  name: 'CustomerPage',

  setup() {
    const login = ref({
      username: 'customer',
      password: '9999',
    })

    onMounted(() => {

    })


    return {
      login,

    }
  },
})
</script>

<style></style>
