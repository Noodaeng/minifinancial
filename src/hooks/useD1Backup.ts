import { ref } from 'vue'
//import { useApi } from '../services/api'

import { showError } from '../modules/appUtils'

import MyConfig from '../modules/myConfig'
export function useD1Backup() {
  const loading = ref(false)
  const errorMessage = ref('')

  async function downloadBackupD1(isAutomatic = false): Promise<boolean> {
    try {
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
      if (!isAutomatic) await showError(err)
      return false
    } finally {
      loading.value = false
    }
  }

  // Check if an auto-backup is needed (e.g., if last backup is > 30 days old or never done)
  async function checkAndAutoBackup() {
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
