import { Ref, isRef } from 'vue';
import isEmpty from 'validator/es/lib/isEmpty';
import isInt from 'validator/es/lib/isInt';
import isFloat from 'validator/es/lib/isFloat';

export const floatValidateRange = (
  val: string,
  isOk: boolean | Ref<boolean>,
  minVal: number,
  maxVal: number,
  updateValid: () => void,
): boolean => {
  if (isRef(isOk)) {
    isOk.value =
      typeof val !== 'undefined' &&
      isFloat(val.toString(), { min: minVal, max: maxVal });
    updateValid();
    return isOk.value;
  } else {
    return true;
  }
};
export const floatValidateMin = (
  val: string,
  isOk: boolean | Ref<boolean>,
  minVal: number,
  updateValid: () => void,
): boolean => {
  if (isRef(isOk)) {
    isOk.value =
      typeof val !== 'undefined' && isFloat(val.toString(), { min: minVal });
    updateValid();
    return isOk.value;
  } else {
    return true;
  }
};
export const floatValidate = (
  val: string,
  isOk: boolean | Ref<boolean>,
  updateValid: () => void,
): boolean => {
  if (isRef(isOk)) {
    isOk.value = typeof val !== 'undefined' && isFloat(val.toString());
    updateValid();
    return isOk.value;
  } else {
    return true;
  }
};
export const stringValidate = (
  val: string,
  isOk: boolean | Ref<boolean>,
  updateValid: () => void,
): boolean => {
  if (isRef(isOk)) {
    isOk.value = typeof val !== 'undefined' && !isEmpty(val.toString());
    updateValid();
    return isOk.value;
  } else {
    return true;
  }
};
export const numberValidate = (
  val: string,
  isOk: boolean | Ref<boolean>,
  updateValid: () => void,
): boolean => {
  if (isRef(isOk)) {
    isOk.value = typeof val !== 'undefined' && !isNaN(Number(val));
    updateValid();
    return isOk.value;
  } else {
    return true;
  }
};
export const enumSelectValidate = (
  val: string,
  isOk: boolean | Ref<boolean>,
  updateValid: () => void,
): boolean => {
  if (isRef(isOk)) {
    isOk.value = typeof val !== 'undefined' && isInt(val.toString());
    updateValid();
    return isOk.value;
  } else {
    return true;
  }
};

export const intValidate = (
  val: string,
  isOk: boolean | Ref<boolean>,
  updateValid: () => void,
): boolean => {
  if (isRef(isOk)) {
    isOk.value = typeof val !== 'undefined' && isInt(val.toString());
    updateValid();
    return isOk.value;
  } else {
    return true;
  }
};
export const intValidateMin = (
  val: string,
  isOk: boolean | Ref<boolean>,
  minVal: number,
  updateValid: () => void,
): boolean => {
  if (isRef(isOk)) {
    isOk.value =
      typeof val !== 'undefined' && isInt(val.toString(), { min: minVal });
    updateValid();
    return isOk.value;
  } else {
    return true;
  }
};
export const intValidateMinMax = (
  val: string,
  isOk: boolean | Ref<boolean>,
  minVal: number,
  maxVal: number,
  updateValid: () => void,
): boolean => {
  if (isRef(isOk)) {
    isOk.value =
      typeof val !== 'undefined' &&
      isInt(val.toString(), { min: minVal, max: maxVal });
    updateValid();
    return isOk.value;
  } else {
    return true;
  }
};
export const ipValidate = (
  val: string,
  isOk: boolean | Ref<boolean>,
  updateValid: () => void,
): boolean => {
  if (isRef(isOk)) {
    const ipv4Regex = /^(\d{1,3}\.){3}(\d{1,3})$/;
    isOk.value = typeof val !== 'undefined' && ipv4Regex.test(val);
    updateValid();
    return isOk.value;
  } else {
    return true;
  }
};
export const floatValidateStepRange = (
  val: string,
  isOk: boolean | Ref<boolean>,
  minVal: number,
  maxVal: number,
  updateValid: () => void,
): boolean => {
  if (isRef(isOk)) {
    isOk.value =
      typeof val !== 'undefined' &&
      isFloat(val.toString(), { min: minVal, max: maxVal }) &&
      isStepOk(val.toString());
    updateValid();
    return isOk.value;
  } else {
    return true;
  }
};
const isStepOk = (val: string): boolean => {
  const chk01 = val.includes('1') || val.includes('5');
  let count = 0;
  for (const digitChar of val) {
    const digit = parseInt(digitChar);
    if (!isNaN(digit) && digit > 0) {
      count++;
    }
  }
  const chk02 = count === 1;
  // console.log('result===>', chk01, chk02);
  return chk01 && chk02;
};
