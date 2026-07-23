export type ApplicationTheme = 'bcs-default' | 'bcs-dark' | 'bcs-medium'
export type Breakpoints = 'sm' | 'md' | 'lg' | 'xl'
export type Action = () => void
export type FuncBoolAsync = (arg?: any) => Promise<boolean>
export type ActionSingle<T> = (param: T) => void
export type DefaultValues<T> = {
  [K in keyof T]: T[K] extends object ? DefaultValues<T[K]> : T[K]
}
export type MyRecord = Record<number, string>
export type MyWorkAbilityVal = Record<number, number>
export type OptionalData =
  'customerOptions' | 'portOptions' | 'brokerOptions' | 'allOptions' | 'custBrokerOptions'
//+++++++++++++Interface++++++++++++++++
export interface QSelectOption {
  value: string | number
  label: string
}
export interface PortDetail {
  enble: boolean
  visible: boolean
  description: string
  iconName: string
  actClick: Action
}
