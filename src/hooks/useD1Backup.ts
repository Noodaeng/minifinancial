import { ref } from 'vue'
//import { useApi } from '../services/api'

import { showError } from '../modules/appUtils'

import MyConfig from '../modules/myConfig'
export function useD1Backup() {
  const loading = ref(false)
  const errorMessage = ref('')

  async function downloadBackupD1(): Promise<boolean> {
    try {
      loading.value = true
      const secretToken = MyConfig.instance.AppConfig.AuthToken
      const baseUrl = MyConfig.instance.AppConfig.DbUrl
      const accountId = MyConfig.instance.AppConfig.ClientId

      // Call your worker (allowed by CSP connect-src)
      const response = await fetch(`${baseUrl}/api/getBackupD1`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: secretToken,
          accountId: accountId
        })
      })

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}))
        throw new Error((errJson as any)?.message || 'Backup export failed.')
      }

      // Receive the file stream as a blob
      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = blobUrl
      link.download = `d1-backup-${new Date().toISOString().slice(0, 10)}.sql`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      window.URL.revokeObjectURL(blobUrl)
      return true
    } catch (err: any) {
      await showError(err)
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    errorMessage,
    downloadBackupD1
  }
}
