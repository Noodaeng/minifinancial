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

      const result = response.data?.data
      console.log('Worker Result Data:', result)

      // If Cloudflare returns a direct signed URL immediately
      if (result?.signedUrl) {
        triggerDownload(result.signedUrl)
        return result.signedUrl
      }

      // If Cloudflare returns an active/polling status
      if (result?.status === 'active') {
        alert(
          'Backup generation has started in the background! Please check your server/Cloudflare dashboard or try again in a few seconds.'
        )
      } else {
        alert('Backup triggered successfully, but no download URL was returned immediately.')
      }

      return null
    } catch (err: any) {
      await showError(err)
      return null
    } finally {
      loading.value = false
    }
  }

  function triggerDownload(url: string) {
    const link = document.createElement('a')
    link.href = url
    link.download = `d1-backup-${new Date().toISOString().slice(0, 10)}.sql`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return {
    loading,
    errorMessage,
    downloadBackupD1
  }
}
