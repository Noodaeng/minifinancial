import { useI18n } from 'vue-i18n'

export function useRules() {
  const { t } = useI18n()

  const required =
    (message = 'Field_is_required') =>
    (value: unknown) =>
      value !== null && value !== undefined && value !== '' ? true : t(message)

  const range = (min: number, max: number, message: string) => (value: string | number) => {
    const num = Number(value)

    return !isNaN(num) && num >= min && num <= max ? true : message
  }

  const custom =
    (validator: (value: unknown) => boolean, message = 'Field_is_required') =>
    (value: unknown) =>
      validator(value) ? true : t(message)

  return {
    required,
    range,
    custom
  }
}
