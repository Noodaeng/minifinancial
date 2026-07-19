import { ref, computed } from 'vue'
import { EDataState } from '../types/myEnums'

export function useDataState() {
  const state = ref(EDataState.None)

  const stateCtrl = (
    isInit: boolean,
    isSelected: boolean,
    isValidated: boolean,
    reqCreate: boolean
  ) => {
    // console.log(
    //   'state control--->',
    //   `init-> ${isInit} select->${isSelected} valid->${isValidated} req->${reqCreate} `
    //)
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
          return
        } else if (reqCreate) {
          state.value = EDataState.New
          return
        }
        break
      case EDataState.Selected:
        if (isValidated) {
          state.value = EDataState.ValidEdit
          return
        } else if (reqCreate) {
          state.value = EDataState.New
          return
        }
        break
      case EDataState.New:
        if (isValidated) {
          state.value = EDataState.ValidNew
          return
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
    }
  }
  const canCreate = computed(() => {
    return state.value === EDataState.Init || state.value === EDataState.Selected
  })

  const canDelete = computed(() => {
    return state.value === EDataState.Selected || state.value === EDataState.ValidEdit
  })

  const canSave = computed(() => {
    return state.value === EDataState.ValidEdit || state.value === EDataState.ValidNew
  })
  const resetDataState = () => {
    if (canSave) {
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
    stateCtrl,
    resetDataState
  }
}
