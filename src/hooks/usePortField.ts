import { ref, Ref } from 'vue'
import { EPortType } from '../types/myEnums'
export function usePortField() {
  const portType: Ref<string | number | EPortType> = ref(EPortType.CashAndDeposits)
  // Define field rules per EPortType (e.g., 1 = EPortType.Loan or similar)
  const isFieldVisible = (fieldName: string, portSubType: number): boolean => {
    const currentPortType = Number(portType.value)

    switch (fieldName) {
      case 'period':
        return [1].includes(currentPortType) && ![100].includes(portSubType)
      case 'paymentRate':
        return [1].includes(currentPortType)
      case 'paymentTerm':
        return [1].includes(currentPortType)
      case 'interest':
        return [1].includes(currentPortType)

      case 'brokerId':
        // Example: Show broker for type 1 or 2
        return [1, 2, 3, 4].includes(currentPortType)

      case 'customerId':
        return [1].includes(currentPortType)
      case 'amount':
        return [1].includes(currentPortType)
      case 'description':
      case 'status':
      case 'remark':
      case 'isActive':
      default:
        // Always visible
        return true
    }
  }
  return {
    portType,
    isFieldVisible
  }
}
