import {} from 'vue'
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
  // 1. Changed (value: string) to (value: any) to support Booleans and Arrays
  const createRule = (validator: (value: any) => boolean, getMessage: () => string) => {
    return [(value: any) => validator(value) || getMessage()]
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

  // 2. Updated email signature type for consistency
  const email = (message?: string) => [
    (val: any) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(val)) || (message ?? t('Invalid_email'))
  ]

  // 3. NEW: Rule specifically for required checkboxes
  const requiredCheckbox = (message?: string) =>
    createRule(
      val => val === true || val === false,
      () => message ?? t('Field_is_required') // Or a generic translation key like t('Field_is_required')
    )

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
    email,
    requiredCheckbox // Export it here
  }
}
