import NotifyMsg from '../models/notifyMsg'
import { i18n } from '../i18n'
import { EAlarmLevel } from '../types/myEnums'
import { FuncBoolAsync, QSelectOption } from '../types/myTypes'
import { Notify, QVueGlobals } from 'quasar'
import MyConfig from './myConfig'

export const showError = async (err: any) => {
  if (err) {
    if (err.response) {
      await showNotify(err.response.data, 4)
    } else if (err.message) {
      await showNotify(err.message, 5)
    }
  }
}
export const showNotify = async (msg: string, alarmLevel = 1) => {
  try {
    if (!isNullOrEmpty(msg)) {
      const msgModel = new NotifyMsg()
      msgModel.Descrip = msg
      msgModel.AlarmLevel = alarmLevel
      await showAlarm(msgModel)
    }
  } catch (err) {
    await errorToLog(err)
  }
}
export const isNullOrEmpty = (str: string): boolean => {
  return str === null || str === '' || str === undefined
}
export const showAlarm = async (msgModel: NotifyMsg) => {
  try {
    const { t } = i18n.global
    const description = 'Alarm_' + msgModel.AlarmId + '_Descrip'
    // console.warn('Alarm====>', description);
    const msg =
      msgModel.AlarmId > 0
        ? msgModel.AlarmId + ' : ' + t(description)
        : t(
            typeof msgModel.Descrip === 'string'
              ? msgModel.Descrip
              : JSON.stringify(msgModel.Descrip, null, 2)
          )
    const caption = msgModel.CompId > 0 ? t(msgModel.CompDescrip) + '-' + msgModel.CompId : ''
    switch (msgModel.AlarmLevel as EAlarmLevel) {
      default:
        Notify.create({
          message: msg,
          caption: caption,
          multiLine: true,
          icon: 'mdi-bell-outline',
          color: 'stateNotify',
          textColor: 'appText',
          position: 'bottom-right'
        })
        break
      case EAlarmLevel.Information:
        Notify.create({
          message: msg,
          caption: caption,
          multiLine: true,
          icon: 'mdi-information-outline',
          color: 'stateInfo',
          textColor: 'appText',
          position: 'bottom-right'
        })
        break
      case EAlarmLevel.Success:
        Notify.create({
          message: msg,
          caption: caption,
          multiLine: true,
          icon: 'mdi-check-circle-outline',
          color: 'stateSuccess',
          textColor: 'appText',
          position: 'bottom-right'
        })
        break
      case EAlarmLevel.Warning:
        Notify.create({
          message: msg,
          caption: caption,
          multiLine: true,
          icon: 'mdi-alert-circle-outline',
          color: 'stateWarning',
          textColor: 'appText',
          position: 'bottom-right'
        })
        break
      case EAlarmLevel.Error:
        Notify.create({
          message: msg,
          caption: caption,
          multiLine: true,
          icon: 'mdi-close-circle-outline',
          color: 'stateError',
          textColor: 'appText',
          position: 'bottom-right'
        })
        break
    }
  } catch (err) {
    await errorToLog(err)
  }
}
export const errorToLog = async (err: unknown) => {
  console.error(
    'Client Id:',
    MyConfig.instance.AppConfig.ClientId,
    '=>Message:',
    err instanceof Error ? err.message : '',
    err
  )
}
export const msgToLog = async (msg: string) => {
  console.log(
    'Client :id',
    MyConfig.instance.AppConfig.ClientId,
    ' name:' + MyConfig.instance.LoginBy,
    '=>Message:',
    msg
  )
}
export const modelConverter = <T>(model: object): T | undefined => {
  try {
    if (model && model != null) {
      return model as T
    } else {
      return undefined
    }
  } catch (err) {
    console.error('Error', err)
    return undefined
  }
}
export const modelsConverter = <T>(models: object): T[] | undefined => {
  try {
    return models as T[]
  } catch (err) {
    console.error('Error', err)
    return undefined
  }
}

export const enumToQSelectOptions = (myEnum: Record<string, string | number>): QSelectOption[] => {
  const { t } = i18n.global
  return Object.keys(myEnum)
    .filter(key => isNaN(Number(key)))
    .map(key => ({
      // Using the non-null assertion operator (!) tells TypeScript
      // we guarantee this key exists on the enum object.
      value: myEnum[key]!,
      label: t(key)
    }))
}
export const enumToString = (myEnum: Record<string, number | string>, enumKey: number): string => {
  const { t } = i18n.global
  for (const key in myEnum) {
    if (Number(myEnum[key]) === enumKey) {
      return t(String(key))
    }
  }
  return '-'
}
export const confirmDelete = (
  $q: QVueGlobals,
  info: string,
  delFunc: FuncBoolAsync
): Promise<boolean> => {
  const { t } = i18n.global

  return new Promise(resolve => {
    $q.dialog({
      title: t('Confirm'),
      message: `${t('Would_you_like_to_delete')} ${info} ?`,
      persistent: true,
      class: 'bg-body text-appText',
      cancel: { label: t('Cancel'), color: 'body' },
      ok: { label: t('OK'), color: 'body' }
    })
      .onOk(async () => {
        try {
          $q.loading.show({ message: 'Deleting...' })

          if (delFunc) {
            const success = await delFunc()
            if (success) {
              $q.notify({
                type: 'positive',
                message: t('Item_deleted_successfully')
              })
            }
          }

          resolve(true) // Success
        } catch (err) {
          $q.notify({
            type: 'negative',
            message: `${t('Failed_to_delete_item')} ${err instanceof Error ? err.message : ''}`
          })
          resolve(false) // Failed
        } finally {
          $q.loading?.hide()
        }
      })
      .onCancel(() => {
        console.log(t('Deletion_cancelled_by_user'))
        resolve(false) // Cancelled
      })
  })
}
// Options to control the output parts precisely
const formatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Bangkok',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false // Use 24-hour clock
})

export const currentDateTimeStr = formatter.format(new Date())
