<template>
  <q-page class="row items-center justify-evenly bg-body text-appText">
    <div>
      <q-form class="q-gutter-md q-mt-sm">
        <div class="row justify-start items-start">
          <div class="col-12">
            <q-input
              outlined
              label-color="white"
              :label="$t('User')"
              lazy-rules
              dense
              class="q-ma-sm text-appText"
              v-model="login.username"
            >
              <template v-slot:prepend>
                <q-icon class="text-appText" name="fas fa-user" size="xs" />
              </template>
              <template v-slot:error> </template>
            </q-input>
          </div>
          <div class="col-12">
            <q-input
              outlined
              label-color="white"
              :label="$t('Password')"
              type="password"
              lazy-rules
              dense
              class="q-ma-sm text-appText"
              v-model="login.password"
            >
              <template v-slot:prepend>
                <q-icon class="text-appText" name="fas fa-lock" size="xs" />
              </template>
              <template v-slot:error> </template>
            </q-input>
          </div>
        </div>

        <div class="q-pa-sm text-right">
          <q-btn
            icon="icon-dummy eva eva-log-in-outline"
            type="submit"
            unelevated
            round
            class="q-ma-sm shadow-3 bg-body text-appText"
          >
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
        </div>
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
