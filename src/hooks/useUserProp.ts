import { ref, computed } from 'vue'
import { useCrudProp } from './useCrudProp'
import User from '../models/user'
import { currentDateTimeStr } from '../modules/appUtils'
import MyConfig from '../modules/myConfig'
export function useUserProp() {
  const crud = useCrudProp<User, User>(
    'userId',
    'users',
    User,
    t => [
      {
        name: 'userId',
        required: true,
        label: t('Id'),
        align: 'left',
        field: 'userId',
        sortable: true
      },
      {
        name: 'userName',
        required: true,
        label: t('Name'),
        align: 'left',
        field: 'userName',
        sortable: true
      },
      {
        name: 'remark',
        required: true,
        label: t('Remark'),
        align: 'left',
        field: 'remark',
        sortable: true
      }
    ],
    undefined,
    undefined
  )
  const filter = ref('')

  const filteredRows = computed(() => {
    if (!filter.value) {
      return crud.items.value
    }

    const lowerFilter = filter.value.toLowerCase()

    return crud.items.value.filter((user: User) => {
      return (
        String(user.userId).toLowerCase().includes(lowerFilter) ||
        String(user.userName).toLowerCase().includes(lowerFilter) ||
        String(user.remark).toLowerCase().includes(lowerFilter)
      )
    })
  })
  const onFilter = (val: string) => {
    filter.value = val
  }
  const onCreateUser = () => {
    crud.onCreate()
    crud.item.value.role = 0
    crud.item.value.createBy = crud.currentUser
    crud.item.value.createOn = currentDateTimeStr
  }
  const hashCredentials = (value: string): string => {
    if (!value) return ''
    const privateKey = MyConfig.instance.AppConfig.PrivateKey
    return btoa(value + privateKey)
  }

  const decryptCredentials = (encryptedValue: string): string => {
    if (!encryptedValue) return ''

    const privateKey = MyConfig.instance.AppConfig.PrivateKey

    try {
      // Step 1: Decode the Base64 string
      const decodedValue = atob(encryptedValue)

      // Step 2: Remove the privateKey suffix from the decoded text
      if (decodedValue.endsWith(privateKey)) {
        return decodedValue.slice(0, -privateKey.length)
      }
    } catch (err) {
      console.error(err)
      // Return raw string if decoding fails (e.g., plain text during initial entry)
      return encryptedValue
    }

    return encryptedValue
  }

  return {
    ...crud,
    filteredRows,
    onFilter,
    onCreateUser,
    hashCredentials,
    decryptCredentials
  }
}
