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
        // Create a hidden iframe to trigger the file download silently
        const iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.src = signedUrl
        document.body.appendChild(iframe)

        // Clean up the iframe after a few seconds
        setTimeout(() => {
          document.body.removeChild(iframe)
        }, 10000)

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
