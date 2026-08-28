import { ref, computed } from 'vue'
import { EDataState } from '../types/myEnums'

export function useDataState() {
  const state = ref(EDataState.None)
  const canUserEdit = ref(false)
  const canUserDel = ref(false)

  const stateCtrl = (
    isInit: boolean,
    isSelected: boolean,
    isValidated: boolean,
    reqCreate: boolean
  ) => {
    // console.log(
    //   'state control--->',
    //   state.value,
    //   `init-> ${isInit} select->${isSelected} valid->${isValidated} req->${reqCreate}`
    // )
    if (isInit) {
      state.value = EDataState.Init
      return
    }
    switch (state.value) {
      case EDataState.None:
        break
      case EDataState.Init:
        if (isSelected) {
          state.value = EDataState.Selected
        } else if (reqCreate) {
          state.value = EDataState.New
        }
        break
      case EDataState.Selected:
        if (isValidated) {
          state.value = EDataState.ValidEdit
        } else if (reqCreate) {
          state.value = EDataState.New
        }
        break
      case EDataState.New:
        if (isValidated) {
          state.value = EDataState.ValidNew
        }
        break
      case EDataState.ValidEdit:
        if (!isValidated) {
          state.value = EDataState.Selected
        }
        break
      case EDataState.ValidNew:
        if (!isValidated) {
          state.value = EDataState.New
        }
        break
      default:
        break
    }
  }

  const canCreate = computed(() => {
    return state.value === EDataState.Init || state.value === EDataState.Selected
  })

  // Fixed the logical OR expression inside the parenthesis
  const canDelete = computed(() => {
    const isValidState = state.value === EDataState.Selected || state.value === EDataState.ValidEdit
    return isValidState && canUserDel.value
  })

  const canSave = computed(() => {
    return (
      (state.value === EDataState.ValidEdit && canUserEdit.value) ||
      state.value === EDataState.ValidNew
    )
  })

  // Unwrapped canSave.value properly
  const resetDataState = () => {
    if (canSave.value) {
      stateCtrl(false, false, false, false)
    } else {
      stateCtrl(true, false, false, false)
    }
  }

  return {
    state,
    canCreate,
    canDelete,
    canSave,
    canUserDel,
    canUserEdit,
    stateCtrl,
    resetDataState
  }
}
