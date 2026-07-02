<template>
  <q-page class="row items-center justify-evenly bg-body text-appText">
    <div>
      <q-form @submit.prevent="submitForm" class="q-gutter-md q-mt-sm">
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
            :loading="submitting"
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
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useAuthStore } from '../../stores/authStore'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoginPage',

  setup() {
    const login = ref({
      username: '',
      password: '',
    })
    const authStore = useAuthStore()
    const router = useRouter()
    const submitting = ref(false)

    // Computed property to enable/disable the submit button
    const disableSubmit = computed(() => {
      return !login.value.username || !login.value.password || submitting.value
    })
    onMounted(() => {

    })

    const submitForm = async () => {
      try {
        submitting.value = true



        if (true) {
          const toPath = router.currentRoute.value.query.to as string | undefined

          if (toPath) {
            router.push(toPath)
            // console.log('Form submitted push=>', toPath)
          } else {
            router.push('/')
            // console.log('Form submitted push=>??', toPath)
          }

        }
      } catch (err) {
        console.error('Error during login', err)
      } finally {
        submitting.value = false
      }
    }

    return {
      submitForm,
      login,
      disableSubmit,
      submitting,
    }
  },
})
</script>

<style></style>
