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

  const enumSelect = (message?: string) =>
    createRule(
      val => enumSelectValidate(val),
      () => message ?? t('Field_is_required')
    )

  const number = (message?: string) =>
    createRule(
      val => numberValidate(val),
      () => message ?? t('Invalid_number')
    )

  const float = (message?: string) =>
    createRule(
      val => floatValidate(val),
      () => message ?? t('Invalid_number')
    )

  const floatMin = (min: number, message?: string) =>
    createRule(
      val => floatValidateMin(val, min),
      () => message ?? `${t('Please_use_value')} >= ${min}`
    )

  const floatRange = (min: number, max: number, message?: string) =>
    createRule(
      val => floatValidateRange(val, min, max),
      () => message ?? `${t('Please_use_value')} : ${min} - ${max}`
    )

  const floatStepRange = (min: number, max: number, message?: string) =>
    createRule(
      val => floatValidateStepRange(val, min, max),
      () => message ?? `${t('Please_use_value')} : ${min} - ${max}`
    )

  const integer = (message?: string) =>
    createRule(
      val => intValidate(val),
      () => message ?? t('Invalid_integer')
    )

  const intMin = (min: number, message?: string) =>
    createRule(
      val => intValidateMin(val, min),
      () => message ?? `${t('Please_use_value')} >= ${min}`
    )

  const intRange = (min: number, max: number, message?: string) =>
    createRule(
      val => intValidateMinMax(val, min, max),
      () => message ?? `${t('Please_use_value')} : ${min} - ${max}`
    )

  const ip = (message?: string) =>
    createRule(
      val => ipValidate(val),
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
