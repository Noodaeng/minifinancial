import BaseModel from './baseModel'
export default class Session extends BaseModel {
  sessionId = '' // TEXT PRIMARY KEY
  portId = '' // TEXT NOT NULL
  sessionType = 0 // INTEGER NOT NULL
  amount = 0 // REAL NOT NULL
  creditPortId = '' // TEXT NOT NULL
  debitPortId = '' // TEXT NOT NULL
}
