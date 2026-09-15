import { ref } from 'vue'
import { useApi } from '../services/api'

import { showError } from '../modules/appUtils'

import MyConfig from '../modules/myConfig'
export function useD1Backup() {
  const loading = ref(false)
  const errorMessage = ref('')

  async function downloadBackupD1(): Promise<string | null> {
    try {
      loading.value = true
      const secretToken = MyConfig.instance.AppConfig.AuthToken
      const baseUrl = MyConfig.instance.AppConfig.DbUrl
      const accountId = MyConfig.instance.AppConfig.ClientId
      const api = useApi()

      const response = await api.post(`${baseUrl}/api/getBackupD1`, {
        token: secretToken,
        accountId: accountId
      })

      const signedUrl = response.data?.data?.signedUrl
      if (signedUrl) {
        // Fetch the file as a blob so the browser doesn't trigger navigation warnings
        const fileResponse = await fetch(signedUrl)
        const blob = await fileResponse.blob()

        const blobUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = blobUrl
        link.download = `d1-backup-${new Date().toISOString().slice(0, 10)}.sql`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        // Clean up the object URL
        window.URL.revokeObjectURL(blobUrl)
        return signedUrl
      }

      throw new Error('No download URL returned from server.')
    } catch (err: any) {
      await showError(err)
      return null
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
