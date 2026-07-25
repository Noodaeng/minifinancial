import { ref } from 'vue'
import { PortDetail, Action } from '../types/myTypes'
import { EInvestPortType } from '../types/myEnums'
import { i18n } from '../i18n'
export function usePortSession() {
  const { t } = i18n.global
  const sessionClicks = ref<(Action | null | undefined)[]>([null, null, null, null, null, null])

  const getPortSessionInfo = (portType: string | number | EInvestPortType): PortDetail[] => {
    console.log('typeeeee->', Number(portType))

    switch (Number(portType)) {
      case 1:
        return [
          {
            enble: true,
            visible: true,
            description: t('LoanIssued'),
            iconName: 'mdi-cash-minus',
            actClick: () => sessionClicks.value[0]?.()
          },
          {
            enble: true,
            visible: true,
            description: t('LoanRepayment'),
            iconName: 'mdi-cash-plus',
            actClick: () => sessionClicks.value[1]?.()
          },
          {
            enble: true,
            visible: true,
            description: t('InterestAccrual'),
            iconName: 'mdi-cash-fast',
            actClick: () => sessionClicks.value[2]?.()
          },
          {
            enble: true,
            visible: true,
            description: t('BadDebtWriteOff'),
            iconName: 'mdi-cash-remove',
            actClick: () => sessionClicks.value[3]?.()
          },
          {
            enble: true,
            visible: true,
            description: t('ReFinance'),
            iconName: 'mdi-cash-sync',
            actClick: () => sessionClicks.value[4]?.()
          }
        ]
      case 2:
        return [
          {
            enble: true,
            visible: true,
            description: t('SecurityPurchase'),
            iconName: 'mdi-cash-100',
            actClick: () => sessionClicks.value[0]?.()
          },
          {
            enble: true,
            visible: true,
            description: t('SecuritySale'),
            iconName: 'mdi-cash-fast',
            actClick: () => sessionClicks.value[1]?.()
          },

          {
            enble: true,
            visible: true,
            description: t('CouponPayment'),
            iconName: 'mdi-cash-fast',
            actClick: () => sessionClicks.value[2]?.()
          },
          {
            enble: true,
            visible: true,
            description: t('FairValueAdjustment'),
            iconName: 'mdi-cash-multiple',
            actClick: () => sessionClicks.value[3]?.()
          }
        ]
      case 3:
        return [
          {
            enble: true,
            visible: true,
            description: t('EquityPurchase'),
            iconName: 'mdi-network-pos',
            actClick: () => sessionClicks.value[0]?.()
          },
          {
            enble: true,
            visible: true,
            description: t('EquitySale'),
            iconName: 'mdi-cash-fast',
            actClick: () => sessionClicks.value[1]?.()
          },
          {
            enble: true,
            visible: true,
            description: t('DividendReceived'),
            iconName: 'mdi-cash-plus',
            actClick: () => sessionClicks.value[2]?.()
          },
          {
            enble: true,
            visible: true,
            description: t('EquityMethodAdjustment'),
            iconName: 'mdi-cash-sync',
            actClick: () => sessionClicks.value[3]?.()
          }
        ]
      case 4:
        return [
          {
            enble: true,
            visible: true,
            description: t('RealEstatePurchase'),
            iconName: 'mdi-home-group',
            actClick: () => sessionClicks.value[0]?.()
          },
          {
            enble: true,
            visible: true,
            description: t('RentalIncome'),
            iconName: 'mdi-cash-multiple',
            actClick: () => sessionClicks.value[1]?.()
          },
          {
            enble: true,
            visible: true,
            description: t('MutualFundInvestment'),
            iconName: 'mdi-cash-multiple',
            actClick: () => sessionClicks.value[2]?.()
          },
          {
            enble: true,
            visible: true,
            description: t('DisposalGain'),
            iconName: 'mdi-cash-plus',
            actClick: () => sessionClicks.value[3]?.()
          },
          {
            enble: true,
            visible: true,
            description: t('DisposalLoss'),
            iconName: 'mdi-cash-minus',
            actClick: () => sessionClicks.value[3]?.()
          }
        ]
      default:
        console.log('returnnnnnnnnn->', portType)
        return [
          {
            enble: true,
            visible: true,
            description: t('Deposit'),
            iconName: 'mdi-cash-plus',
            actClick: () => sessionClicks.value[0]?.()
          },
          {
            enble: true,
            visible: true,
            description: t('Withdrawal'),
            iconName: 'mdi-cash-minus',
            actClick: () => sessionClicks.value[1]?.()
          },
          {
            enble: true,
            visible: true,
            description: t('InterestIncome'),
            iconName: 'mdi-cash-fast',
            actClick: () => sessionClicks.value[2]?.()
          },
          {
            enble: true,
            visible: true,
            description: t('Transfer'),
            iconName: 'mdi-cash-refund',
            actClick: () => sessionClicks.value[3]?.()
          }
        ]
    }
  }
  return { getPortSessionInfo, sessionClicks }
}
// // Other Investments
// export enum OtherTransactionType {
//   RealEstatePurchase = 0, // ซื้ออสังหาริมทรัพย์
//   RentalIncome = 1, // รับค่าเช่า
//   MutualFundInvestment = 2, // ลงทุนกองทุนรวม
//   DisposalGain = 3 // กำไร/ขาดทุนจากการจำหน่าย
// }
