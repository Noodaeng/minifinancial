<template>
  <q-layout view="lHh lpR lFf" class="window-height window-width">
    <!-- Header -->
    <q-header elevated class="bg-appLayout text-appText">
      <q-toolbar class="q-px-md row no-wrap items-center justify-between" style="min-height: 64px">
        <!-- Left Section: Menu Button & Title -->
        <div class="row items-center no-wrap q-gutter-sm">
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
          <q-toolbar-title class="text-weight-bold text-subtitle1 text-sm-h6 no-wrap">
            💰 {{ $t('Mini_Financial') }} 💰
          </q-toolbar-title>
        </div>

        <!-- Right Section: Actions & User Meta -->
        <div class="row items-center no-wrap q-gutter-sm sm-gutter-md">
          <!-- Fullscreen Switcher Utility -->
          <q-btn
            flat
            round
            dense
            :icon="isFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            color="white"
            @click="toggleFullScreen"
          />

          <ThemeSwitcher />
          <LanguageSwitcher />

          <q-separator vertical dark inset class="q-mx-sm gt-xs" />

          <!-- User Display Profile Profile Card -->
          <div class="row items-center no-wrap gt-xs q-gutter-sm">
            <div class="text-right column justify-center">
              <span class="text-weight-medium text-caption text-sm-body2 text-white">
                {{ convertToUser(user).name }}
              </span>
              <span class="text-grey-4" style="font-size: 10px"> v{{ version }} </span>
            </div>
            <q-btn
              flat
              round
              dense
              icon="logout"
              color="negative"
              @click="logout"
              class="q-ml-xs"
            />
          </div>

          <!-- Mobile Quick Logout Control Only -->
          <q-btn flat round dense icon="logout" color="negative" @click="logout" class="lt-sm" />
        </div>
      </q-toolbar>
    </q-header>

    <!-- Navigation Drawer Layout Structure -->
    <q-drawer v-model="leftDrawerOpen" class="bg-appLayout text-appText" :breakpoint="700" bordered>
      <q-list>
        <q-item class="bg-appLayout text-appText q-py-md">
          <q-item-section avatar>
            <q-avatar icon="fas fa-cogs" color="primary" text-color="white" size="md"></q-avatar>
          </q-item-section>
          <q-item-section class="text-weight-bold">
            {{ $t('Configuration') }}
          </q-item-section>
        </q-item>

        <q-separator dark />

        <EssentialLink
          class="bg-appLayout text-appText"
          v-for="link in essentialLinks || []"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <!-- Main Dynamic Application Container Target Space -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Footer Area Base Component Layout -->
    <q-footer
      bordered
      class="bg-appLayout text-appText q-px-md row items-center justify-between"
      style="min-height: 32px"
    >
      <div class="text-caption text-grey-5 lt-sm">v{{ version }}</div>
      <div class="text-caption text-grey-5 lt-sm">{{ convertToUser(user).name }}</div>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, onBeforeUnmount, watch } from 'vue'
import EssentialLink from './EssentialLink.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'
import ThemeSwitcher from './ThemeSwitcher.vue'
import linksList from './menuList'
import { AppFullscreen } from 'quasar'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'
import { errorToLog } from '../modules/appUtils'
import MyConfig from '../modules/myConfig'

export default defineComponent({
  name: 'MainLayout',
  components: {
    EssentialLink,
    ThemeSwitcher,
    LanguageSwitcher
  },

  setup() {
    const authStore = useAuthStore()
    const router = useRouter()

    const leftDrawerOpen = ref(false)
    const isFullscreen = ref(false)

    const isAuth = computed(() => authStore.getAuthenticated)
    const user = computed(() => authStore.getUser)

    function logout() {
      authStore.signOut()
      router.push({ path: '/login' })
      leftDrawerOpen.value = false
    }

    function toggleLeftDrawer() {
      if (isAuth.value) {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }

    function toggleFullScreen() {
      if (!AppFullscreen.isActive) {
        AppFullscreen.request()
          .then(() => {
            isFullscreen.value = true
          })
          .catch(err => {
            errorToLog(err)
          })
      } else {
        AppFullscreen.exit().then(() => {
          isFullscreen.value = false
        })
      }
    }

    // Keep active monitoring tracking updated full screen state changes via ESC keys
    watch(
      () => AppFullscreen.isActive,
      val => {
        isFullscreen.value = val
      }
    )

    // Automatically hide navigation drawer if authorization cuts out
    watch(isAuth, authenticated => {
      if (!authenticated) leftDrawerOpen.value = false
    })

    onMounted(() => {
      window.addEventListener('beforeunload', handleBeforeUnload)
      // Open drawer on load if authenticated and screen size is generous
      if (isAuth.value && window.innerWidth > 700) {
        leftDrawerOpen.value = true
      }
    })

    onBeforeUnmount(() => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    })

    function handleBeforeUnload(event: any) {
      const confirmationMessage = 'Are you sure you want to leave?'
      event.returnValue = confirmationMessage
      return confirmationMessage
    }

    const convertToUser = (obj: object | null): { name: string; role: string; exp: any } => {
      if (!obj) return { name: 'Unknown', role: 'User', exp: null }
      return obj as { name: string; role: string; exp: any }
    }

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      isFullscreen,
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

<style scoped>
.q-field__native,
.q-field__prefix,
.q-field__suffix,
.q-field__input {
  color: var(--v-primary-base);
}
</style>
