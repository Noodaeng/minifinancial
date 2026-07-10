import { Ref } from 'vue'
import type { ComposerTranslation } from 'vue-i18n'

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

export function useValidationRules(t: ComposerTranslation) {
  const createRule = (validator: (value: string) => boolean, getMessage: () => string) => {
    return [(value: string) => validator(value) || getMessage()]
  }

  const string = (message?: string) =>
    createRule(
      val => stringValidate(val),
      () => message ?? t('Field_is_required')
    )

  const enumSelect = (isValid: Ref<boolean>, updateValid: () => void, message?: string) =>
    createRule(
      val => enumSelectValidate(val, isValid, updateValid),
      () => message ?? t('Field_is_required')
    )

  const number = (isValid: Ref<boolean>, updateValid: () => void, message?: string) =>
    createRule(
      val => numberValidate(val, isValid, updateValid),
      () => message ?? t('Invalid_number')
    )

  const float = (isValid: Ref<boolean>, updateValid: () => void, message?: string) =>
    createRule(
      val => floatValidate(val, isValid, updateValid),
      () => message ?? t('Invalid_number')
    )

  const floatMin = (
    isValid: Ref<boolean>,
    min: number,
    updateValid: () => void,
    message?: string
  ) =>
    createRule(
      val => floatValidateMin(val, isValid, min, updateValid),
      () => message ?? `${t('Please_use_value')} >= ${min}`
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
      () => message ?? `${t('Please_use_value')} : ${min} - ${max}`
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
      () => message ?? `${t('Please_use_value')} : ${min} - ${max}`
    )

  const integer = (isValid: Ref<boolean>, updateValid: () => void, message?: string) =>
    createRule(
      val => intValidate(val, isValid, updateValid),
      () => message ?? t('Invalid_integer')
    )

  const intMin = (isValid: Ref<boolean>, min: number, updateValid: () => void, message?: string) =>
    createRule(
      val => intValidateMin(val, isValid, min, updateValid),
      () => message ?? `${t('Please_use_value')} >= ${min}`
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
      () => message ?? `${t('Please_use_value')} : ${min} - ${max}`
    )

  const ip = (isValid: Ref<boolean>, updateValid: () => void, message?: string) =>
    createRule(
      val => ipValidate(val, isValid, updateValid),
      () => message ?? t('Invalid_IP_Address')
    )

  const email = (message?: string) => [
    (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || (message ?? t('Invalid_email'))
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
