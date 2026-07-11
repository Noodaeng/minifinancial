import isEmpty from 'validator/es/lib/isEmpty'
import isInt from 'validator/es/lib/isInt'
import isFloat from 'validator/es/lib/isFloat'

export const floatValidateRange = (val: string, minVal: number, maxVal: number): boolean => {
  return typeof val !== 'undefined' && isFloat(val.toString(), { min: minVal, max: maxVal })
}
export const floatValidateMin = (val: string, minVal: number): boolean => {
  return typeof val !== 'undefined' && isFloat(val.toString(), { min: minVal })
}
export const floatValidate = (val: string): boolean => {
  return typeof val !== 'undefined' && isFloat(val.toString())
}
export const stringValidate = (val: string): boolean => {
  return typeof val !== 'undefined' && !isEmpty(val.toString())
}
export const numberValidate = (val: string): boolean => {
  return typeof val !== 'undefined' && !isNaN(Number(val))
}
export const enumSelectValidate = (val: string): boolean => {
  return typeof val !== 'undefined' && isInt(val.toString())
}

export const intValidate = (val: string): boolean => {
  return typeof val !== 'undefined' && isInt(val.toString())
}
export const intValidateMin = (val: string, minVal: number): boolean => {
  return typeof val !== 'undefined' && isInt(val.toString(), { min: minVal })
}
export const intValidateMinMax = (val: string, minVal: number, maxVal: number): boolean => {
  return typeof val !== 'undefined' && isInt(val.toString(), { min: minVal, max: maxVal })
}
export const ipValidate = (val: string): boolean => {
  const ipv4Regex = /^(\d{1,3}\.){3}(\d{1,3})$/
  return typeof val !== 'undefined' && ipv4Regex.test(val)
}
export const floatValidateStepRange = (val: string, minVal: number, maxVal: number): boolean => {
  return (
    typeof val !== 'undefined' &&
    isFloat(val.toString(), { min: minVal, max: maxVal }) &&
    isStepOk(val.toString())
  )
}
const isStepOk = (val: string): boolean => {
  const chk01 = val.includes('1') || val.includes('5')
  let count = 0
  for (const digitChar of val) {
    const digit = parseInt(digitChar)
    if (!isNaN(digit) && digit > 0) {
      count++
    }
  }
  const chk02 = count === 1
  // console.log('result===>', chk01, chk02);
  return chk01 && chk02
}
