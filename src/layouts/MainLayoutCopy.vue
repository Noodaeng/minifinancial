<template>
  <q-layout @click="toggleFullScreen" view="lHh lpR lFf" class="window-height window-width">
    <q-header elevated class="bg-appLayout text-appText" style="max-height: 80px">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          :icon="leftDrawerOpen ? 'menu_open' : 'menu'"
          color="white"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          :disable="!isAuth"
        />
        <div class="col justify-start items-start">
          <div class="row justify-start items-start">
            <div class="col-12 col-md-9">
              <div
                class="text-left"
                :style="{
                  fontSize: `20px`,
                  position: `absolute`,
                  left: `50px`,
                  top: `10px`
                }"
              >
                💰{{ $t('Mini_Financial') }}💰
              </div>
            </div>

            <div class="col-12 col-md-3">
              <div class="row justify-start items-start">
                <div class="col-12 col-md-4">
                  <div
                    :style="{
                      position: `absolute`,
                      alignItems: `right`,
                      left: `75%`,
                      top: `-10px`
                    }"
                  >
                    <ThemeSwitcher></ThemeSwitcher>
                  </div>
                </div>
                <div class="col-12 col-md-4">
                  <div
                    :style="{
                      position: `absolute`,
                      alignItems: `right`,
                      left: `82%`,
                      top: `-17px`
                    }"
                  >
                    <LanguageSwitcher></LanguageSwitcher>
                  </div>
                </div>
                <div class="col-12 col-md-4">
                  <q-item>
                    <q-item-section>
                      <q-item-label> {{ convertToUser(user).name }}</q-item-label>
                      <q-item-label caption>
                        {{ version }}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                      <div class="q-pa-xs">
                        <q-icon
                          @click="logout"
                          class="bg-appLayout text-appText"
                          name="logout"
                          size="sm"
                        />
                      </div>
                    </q-item-section>
                  </q-item>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      class="bg-appLayout text-appText"
      :breakpoint="700"
      @hide="$router.replace('/')"
      @show="$router.replace('/')"
      bordered
    >
      <q-list>
        <q-item-label class="bg-appLayout text-appText">
          <q-avatar icon="fas fa-cogs"></q-avatar>
          {{ $t('Configuration') }}
        </q-item-label>
        <EssentialLink
          class="bg-appLayout text-appText"
          v-for="link in essentialLinks || []"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer bordered class="bg-appLayout text-appText" style="min-height: 40px"> </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, onBeforeUnmount, watch } from 'vue'
import EssentialLink from './EssentialLink.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'
import ThemeSwitcher from './ThemeSwitcher.vue'
import linksList from './menuList.js'
import { AppFullscreen } from 'quasar'
import { useAuthStore } from '../stores/authStore.js'
import { useRouter } from 'vue-router'
import { errorToLog } from '../modules/appUtils.js'
import MyConfig from '../modules/myConfig.js'

export default defineComponent({
  name: 'MainLayoutCopy',
  data() {
    return {}
  },
  components: {
    EssentialLink,
    ThemeSwitcher,
    LanguageSwitcher
  },

  setup() {
    const authStore = useAuthStore()
    const router = useRouter()
    const toggleLeft = ref(false)
    const leftDrawerOpen = ref(false)
    const isAuth = computed(() => authStore.getAuthenticated)
    const user = computed(() => authStore.getUser)

    function logout() {
      authStore.signOut()
      router.push({ path: '/login' })
      toggleLeft.value = false
    }
    function toggleLeftDrawer() {
      if (!isAuth) {
        toggleLeft.value = false
      } else {
        toggleLeft.value = !toggleLeft.value
      }
    }
    function toggleFullScreen() {
      if (!AppFullscreen.isActive) {
        // Requesting fullscreen mode:
        AppFullscreen.request()
          .then(() => {
            // success!
          })
          .catch(err => {
            errorToLog(err)
            //console.log('Full screen request error=> ', err);
          })
      }
    }
    watch(
      () => (isAuth.value, toggleLeft.value),
      () => {
        leftDrawerOpen.value = isAuth.value && toggleLeft.value
      }
    )
    onMounted(() => {
      toggleLeftDrawer()
      window.addEventListener('beforeunload', handleBeforeUnload)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    })
    function handleBeforeUnload(event: any) {
      const confirmationMessage = 'Are you sure you want to leave?'
      event.returnValue = confirmationMessage // Standard for most browsers
      return confirmationMessage // For older browsers
    }
    const convertToUser = (obj: object | null): { name: string; role: string; exp: any } => {
      if (!obj) return { name: 'Unknown', role: 'User', exp: null }
      return obj as { name: string; role: string; exp: any }
    }

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer,
      toggleFullScreen,
      logout,
      convertToUser,
      isAuth,
      user,
      version: MyConfig.instance.AppConfig.Version
    }
  }
})
</script>
<style>
.q-field__native,
.q-field__prefix,
.q-field__suffix,
.q-field__input {
  color: var(--v-primary-base);
}
</style>
