import { ref } from 'vue'
//import { useApi } from '../services/api'

import { showError } from '../modules/appUtils'

import MyConfig from '../modules/myConfig'
export function useD1Backup() {
  const loading = ref(false)
  const errorMessage = ref('')

  // Helper function to check if the device is a PC/Laptop (Desktop)
  function isDesktopDevice(): boolean {
    const userAgent = navigator.userAgent.toLowerCase()

    // Check for common mobile/tablet keywords in the user agent string
    const isMobileOrTablet =
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(userAgent)

    // Additional check: mobile devices usually have touch points and smaller viewports,
    // but checking userAgent combined with maxTouchPoints helps filter out iPads posing as desktops.
    const isTouchMac = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1

    return !isMobileOrTablet && !isTouchMac
  }

  async function downloadBackupD1(isAutomatic = false): Promise<boolean> {
    try {
      // 1. Guard check: Prevent download if it's not a PC or Laptop
      if (!isDesktopDevice()) {
        const restrictionMsg = 'Database backups can only be downloaded from a PC or laptop.'
        errorMessage.value = restrictionMsg
        if (!isAutomatic) {
          await showError(restrictionMsg) // or your preferred notification method
        }
        return false
      }

      loading.value = true
      const secretToken = MyConfig.instance.AppConfig.AuthToken
      const baseUrl = MyConfig.instance.AppConfig.DbUrl
      const accountId = MyConfig.instance.AppConfig.ClientId

      const response = await fetch(`${baseUrl}/api/getBackupD1`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: secretToken, accountId: accountId })
      })

      if (!response.ok) {
        throw new Error('Backup export failed.')
      }

      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)

      const todayStr = new Date().toISOString().slice(0, 10) // e.g. "2026-09-16"
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = `d1-backup-${todayStr}.sql`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      window.URL.revokeObjectURL(blobUrl)

      // Save today's date as the last backup date in browser storage
      localStorage.setItem('last_d1_backup_date', todayStr)
      return true
    } catch (err: any) {
      errorMessage.value = err.message || 'An error occurred'
      if (!isAutomatic) await showError(err)
      return false
    } finally {
      loading.value = false
    }
  }

  // Check if an auto-backup is needed (e.g., if last backup is > 30 days old or never done)
  async function checkAndAutoBackup() {
    // Optional: skip auto-backup checks entirely on mobile/tablet
    if (!isDesktopDevice()) return

    const lastBackupDate = localStorage.getItem('last_d1_backup_date')

    if (!lastBackupDate) {
      // Never backed up on this browser profile yet
      await downloadBackupD1(true)
      return
    }

    const lastDate = new Date(lastBackupDate)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - lastDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    // If it's been 30 days or more, trigger automatic backup
    if (diffDays >= 30) {
      console.log('Last backup is over 30 days old. Triggering automatic backup...')
      await downloadBackupD1(true)
    }
  }

  return {
    loading,
    errorMessage,
    downloadBackupD1,
    checkAndAutoBackup
  }
}
