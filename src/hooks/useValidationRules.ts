// composables/useValidationRules.ts

import { Ref } from 'vue'
import { useI18n } from 'vue-i18n'

import {
  stringValidate,
  numberValidate,
  enumSelectValidate,
  floatValidate,
  floatValidateMin,
  floatValidateRange,
  floatValidateStepRange,
  intValidate,
  intValidateMin,
  intValidateMinMax,
  ipValidate
} from '@/modules/dataValidator'

export function useValidationRules() {
  const { t } = useI18n()

  const createRule = (validator: (value: string) => boolean, message: string) => {
    return [(value: string) => validator(value) || message]
  }

  const string = (
    isValid: Ref<boolean>,
    updateValid: () => void,
    message = t('Field_is_required')
  ) => createRule(val => stringValidate(val, isValid, updateValid), message)

  const enumSelect = (
    isValid: Ref<boolean>,
    updateValid: () => void,
    message = t('Field_is_required')
  ) => createRule(val => enumSelectValidate(val, isValid, updateValid), message)

  const number = (isValid: Ref<boolean>, updateValid: () => void, message = t('Invalid_number')) =>
    createRule(val => numberValidate(val, isValid, updateValid), message)

  const float = (isValid: Ref<boolean>, updateValid: () => void, message = t('Invalid_number')) =>
    createRule(val => floatValidate(val, isValid, updateValid), message)

  const floatMin = (
    isValid: Ref<boolean>,
    min: number,
    updateValid: () => void,
    message?: string
  ) =>
    createRule(
      val => floatValidateMin(val, isValid, min, updateValid),
      message ?? `${t('Please_use_value')} >= ${min}`
    )

  const floatRange = (
    isValid: Ref<boolean>,
    min: number,
    max: number,
    updateValid: () => void,
    message?: string
  ) =>
    createRule(
      val => floatValidateRange(val, isValid, min, max, updateValid),
      message ?? `${t('Please_use_value')} : ${min} - ${max}`
    )

  const floatStepRange = (
    isValid: Ref<boolean>,
    min: number,
    max: number,
    updateValid: () => void,
    message?: string
  ) =>
    createRule(
      val => floatValidateStepRange(val, isValid, min, max, updateValid),
      message ?? `${t('Please_use_value')} : ${min} - ${max}`
    )

  const integer = (
    isValid: Ref<boolean>,
    updateValid: () => void,
    message = t('Invalid_integer')
  ) => createRule(val => intValidate(val, isValid, updateValid), message)

  const intMin = (isValid: Ref<boolean>, min: number, updateValid: () => void, message?: string) =>
    createRule(
      val => intValidateMin(val, isValid, min, updateValid),
      message ?? `${t('Please_use_value')} >= ${min}`
    )

  const intRange = (
    isValid: Ref<boolean>,
    min: number,
    max: number,
    updateValid: () => void,
    message?: string
  ) =>
    createRule(
      val => intValidateMinMax(val, isValid, min, max, updateValid),
      message ?? `${t('Please_use_value')} : ${min} - ${max}`
    )

  const ip = (isValid: Ref<boolean>, updateValid: () => void, message = t('Invalid_IP_Address')) =>
    createRule(val => ipValidate(val, isValid, updateValid), message)

  const email = (message = t('Invalid_email')) => [
    (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || message
  ]

  return {
    string,
    enumSelect,
    number,
    float,
    floatMin,
    floatRange,
    floatStepRange,
    integer,
    intMin,
    intRange,
    ip,
    email
  }
}
