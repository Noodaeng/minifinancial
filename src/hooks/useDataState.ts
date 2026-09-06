import { ref, computed, readonly } from 'vue'
import { EDataState } from '../types/myEnums'

export interface StateCtrlParams {
  isInit?: boolean
  isSelected?: boolean
  isValidated?: boolean
  reqCreate?: boolean
}

export function useDataState() {
  const state = ref<EDataState>(EDataState.None)
  const canUserEdit = ref(false)
  const canUserDel = ref(false)

  // Explicit state transition mapping makes logic easy to trace & maintain
  const stateCtrl = ({
    isInit = false,
    isSelected = false,
    isValidated = false,
    reqCreate = false
  }: StateCtrlParams = {}) => {
    if (isInit) {
      state.value = EDataState.Init
      return
    }

    switch (state.value) {
      case EDataState.Init:
        if (isSelected) state.value = EDataState.Selected
        else if (reqCreate) state.value = EDataState.New
        break

      case EDataState.Selected:
        if (isValidated) state.value = EDataState.ValidEdit
        else if (reqCreate) state.value = EDataState.New
        break

      case EDataState.New:
        if (isValidated) state.value = EDataState.ValidNew
        break

      case EDataState.ValidEdit:
        if (!isValidated) state.value = EDataState.Selected
        break

      case EDataState.ValidNew:
        if (!isValidated) state.value = EDataState.New
        break

      default:
        break
    }
  }

  // Set lookup collections for cleaner computed states
  const CAN_CREATE_STATES = new Set([EDataState.Init, EDataState.Selected])
  const CAN_DELETE_STATES = new Set([EDataState.Selected, EDataState.ValidEdit])

  const canCreate = computed(() => CAN_CREATE_STATES.has(state.value))

  const canDelete = computed(() => CAN_DELETE_STATES.has(state.value) && canUserDel.value)

  const canSave = computed(() => {
    const isEditing = state.value === EDataState.ValidEdit && canUserEdit.value
    const isNew = state.value === EDataState.ValidNew
    return isEditing || isNew
  })

  const resetDataState = () => {
    stateCtrl({ isInit: !canSave.value })
  }

  return {
    // Readonly prevents external direct modification without using stateCtrl
    state: readonly(state),
    canUserEdit,
    canUserDel,
    canCreate,
    canDelete,
    canSave,
    stateCtrl,
    resetDataState
  }
}
