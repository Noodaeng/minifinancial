// เปลี่ยนมาใช้ var เพื่อป้องกันปัญหาตัวแปรชนกันข้ามไฟล์ (กรณีรวมโค้ดในโปรเจกต์เดียวกัน)
var AUTH_TOKEN = 'MiniFinancial_Secret_Token_2026_XYZ'

function doGet(e) {
  try {
    // 1. ตรวจสอบพารามิเตอร์พื้นฐานเพื่อป้องกันระบบ Error
    if (!e || !e.parameter) {
      return createJsonResponse({ status: 'error', message: 'Bad Request: พารามิเตอร์ไม่ถูกต้อง' })
    }

    // 🔒 ตรวจสอบสิทธิ์ความปลอดภัยผ่าน URL parameter
    if (!e.parameter.token || e.parameter.token !== AUTH_TOKEN) {
      return createJsonResponse({
        status: 'error',
        message: 'Unauthorized: ไม่ได้รับสิทธิ์เข้าถึงข้อมูล รหัสผ่าน API ไม่ถูกต้อง'
      })
    }

    var sheetName = e.parameter.sheet || 'customers'
    var targetId = e.parameter.id

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName)
    if (!sheet) {
      return createJsonResponse({
        status: 'error',
        message: 'ไม่พบชื่อ Sheet ที่ระบุ (' + sheetName + ')'
      })
    }

    // 💡 ปรับปรุง: ใช้ getLastRow เพื่อดึงเฉพาะแถวที่มีข้อมูลจริง ป้องกันแถวว่าง
    var lastRow = sheet.getLastRow()
    var lastColumn = sheet.getLastColumn()

    if (lastRow <= 1) return createJsonResponse([])

    // ดึงค่าข้อมูลทั้งหมดมาเก็บไว้
    var data = sheet.getRange(1, 1, lastRow, lastColumn).getValues()
    var headers = data[0]
    var jsonArray = []

    for (var i = 1; i < data.length; i++) {
      // 💡 ปรับปรุง: ข้ามแถวที่ไม่มีข้อมูล ID ในคอลัมน์แรกเพื่อความสะอาดของข้อมูล
      if (data[i][0] === '' || data[i][0] === null) continue

      var obj = {}
      for (var j = 0; j < headers.length; j++) {
        var val = data[i][j]

        // 💡 ปรับปรุง: แปลงค่าที่เป็น "วันที่" ให้กลายเป็นข้อความ Format ทั่วไปให้อ่านง่าย
        if (val instanceof Date) {
          obj[headers[j]] = Utilities.formatDate(
            val,
            Session.getScriptTimeZone(),
            'yyyy-MM-dd HH:mm:ss'
          )
        } else {
          obj[headers[j]] = val
        }
      }

      // หากมีการระบุ ID เจาะจงคอลัมน์แรก (คอลัมน์ A)
      if (targetId) {
        if (data[i][0].toString() === targetId.toString()) {
          if (sheetName === 'users') delete obj.password // ซ่อนรหัสผ่านเพื่อความปลอดภัย
          return createJsonResponse(obj)
        }
      } else {
        if (sheetName === 'users') delete obj.password // ซ่อนรหัสผ่านหากดึงรายชื่อทั้งหมด
        jsonArray.push(obj)
      }
    }

    // กรณีวนลูปจนจบแล้วแต่ไม่เจอ ID ที่ค้นหา
    if (targetId) {
      return createJsonResponse({
        status: 'error',
        message: 'ไม่พบข้อมูลรหัส ID ที่ระบุ (' + targetId + ')'
      })
    }

    return createJsonResponse(jsonArray)
  } catch (error) {
    // ดักจับ Error เผื่อเกิดกรณีไม่คาดคิด แอปจะได้ไม่ค้าง
    return createJsonResponse({
      status: 'error',
      message: 'Internal Server Error: ' + error.toString()
    })
  }
}

// =========================================================================
// 📤 2. ฟังก์ชันหลักสำหรับจัดการข้อมูล (POST) รองรับ LOGIN, INSERT, UPDATE, DELETE
// =========================================================================
function doPost(e) {
  try {
    // 💡 แก้ไขจุดที่ 1: ตรวจสอบและดึงข้อมูล jsonPayload จาก e.postData.contents
    var jsonPayload = {}
    if (e.postData && e.postData.contents) {
      try {
        jsonPayload = JSON.parse(e.postData.contents)
      } catch (ex) {
        // หากฝั่ง Client ไม่ได้ส่งเป็น JSON หรือรูปแบบผิด
        return createJsonResponse({ status: 'error', message: 'รูปแบบ JSON Payload ไม่ถูกต้อง' })
      }
    }

    // รวมข้อมูลจากทั้ง URL Parameter และ Body JSON เพื่อให้เรียกใช้ได้ยืดหยุ่น
    var parameter = e.parameter || {}
    var token = parameter.token || jsonPayload.token
    var sheetName = parameter.sheet || jsonPayload.sheet
    var action = parameter.action || jsonPayload.action

    // 🔒 ตรวจสอบสิทธิ์ความปลอดภัยผ่าน Token
    if (!token || token !== AUTH_TOKEN) {
      return createJsonResponse({
        status: 'error',
        message: 'Unauthorized: ไม่ได้รับสิทธิ์เข้าถึงข้อมูล รหัสผ่าน API ไม่ถูกต้อง'
      })
    }

    if (!sheetName) {
      return createJsonResponse({ status: 'error', message: 'กรุณาระบุชื่อ Sheet' })
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName)
    if (!sheet) {
      return createJsonResponse({
        status: 'error',
        message: 'ไม่พบชื่อ Sheet ที่ระบุ (' + sheetName + ')'
      })
    }

    // 🔐 2.1 ระบบตรวจสอบการเข้าสู่ระบบ (Authentication Login)
    if (action === 'login') {
      var inputUsername = parameter.username || jsonPayload.username
      var inputPassword = parameter.password || jsonPayload.password

      if (!inputUsername || !inputPassword) {
        return createJsonResponse({ status: 'error', message: 'กรุณากรอก username และ password' })
      }

      var data = sheet.getDataRange().getValues()
      var headers = data[0]

      var idxUser = headers.indexOf('username')
      var idxPass = headers.indexOf('password')

      if (idxUser === -1 || idxPass === -1) {
        return createJsonResponse({
          status: 'error',
          message: 'โครงสร้างตาราง users ไม่ถูกต้อง ต้องมีคอลัมน์ username และ password'
        })
      }

      for (var i = 1; i < data.length; i++) {
        if (
          data[i][idxUser].toString() === inputUsername.toString() &&
          data[i][idxPass].toString() === inputPassword.toString()
        ) {
          var randomString = Math.random().toString(36).substring(2, 7)
          var sessionToken = 'tkn_' + new Date().getTime() + '_' + randomString

          var idxSession = headers.indexOf('session_token')
          var targetCol = idxSession !== -1 ? idxSession + 1 : headers.length + 1

          // กรณีไม่มีคอลัมน์ session_token ให้สร้างหัวตารางใหม่ในคอลัมน์ถัดไป
          if (idxSession === -1) {
            sheet.getRange(1, targetCol).setValue('session_token')
          }

          sheet.getRange(i + 1, targetCol).setValue(sessionToken)

          var userObj = {}
          for (var j = 0; j < headers.length; j++) {
            if (headers[j] !== 'password') {
              userObj[headers[j]] = data[i][j]
            }
          }
          userObj['session_token'] = sessionToken

          return createJsonResponse({
            status: 'success',
            message: 'เข้าสู่ระบบสำเร็จ',
            token: sessionToken,
            user: userObj
          })
        }
      }
      return createJsonResponse({ status: 'error', message: 'Username หรือ Password ไม่ถูกต้อง' })
    }

    // ➕ 2.2 คำสั่งเพิ่มข้อมูล (Insert) พร้อมสร้าง Auto-Increment ID
    if (action === 'insert') {
      var rowData = jsonPayload.data
      if (!rowData || !Array.isArray(rowData)) {
        return createJsonResponse({
          status: 'error',
          message: "ข้อมูลที่ส่งมาต้องเป็น Array ใน field 'data'"
        })
      }

      // 💡 กำหนด Prefix ตามชื่อ Sheet (สามารถเพิ่มเงื่อนไขต่อได้ตามต้องการ)
      var prefix = 'CUST-'
      if (sheetName === 'users') {
        prefix = 'USER-'
      }

      // 🔍 เรียกใช้ฟังก์ชันส่วนกลางเพื่อดึง ID ล่าสุดมาบวกเพิ่มอัตโนมัติ
      var newId = generateNextId(sheetName, prefix)

      // นำ ID ที่สร้างเสร็จแล้วไปใส่ไว้ในตำแหน่งแรกสุด (Column A) ของตาราง
      rowData[0] = newId

      sheet.appendRow(rowData)
      return createJsonResponse({
        status: 'success',
        message: 'เพิ่มข้อมูลสำเร็จ',
        generated_id: newId
      })
    }

    // ✏️❌ 2.3 คำสั่งแก้ไข (Update) หรือ ลบข้อมูล (Delete)
    else if (action === 'update' || action === 'delete') {
      var targetId = jsonPayload.id
      if (!targetId) {
        return createJsonResponse({ status: 'error', message: 'กรุณาระบุ ID ที่ต้องการจัดการ' })
      }

      var data = sheet.getDataRange().getValues()
      var targetRowIndex = -1

      for (var i = 1; i < data.length; i++) {
        if (data[i][0].toString() === targetId.toString()) {
          targetRowIndex = i + 1
          break
        }
      }

      if (targetRowIndex === -1) {
        return createJsonResponse({ status: 'error', message: 'ไม่พบข้อมูล ID ที่ต้องการจัดการ' })
      }

      if (action === 'update') {
        var updatedData = jsonPayload.data
        if (!updatedData || !Array.isArray(updatedData)) {
          return createJsonResponse({
            status: 'error',
            message: "ข้อมูลแก้ไขต้องเป็น Array ใน field 'data'"
          })
        }
        var range = sheet.getRange(targetRowIndex, 1, 1, updatedData.length)
        range.setValues([updatedData])
        return createJsonResponse({ status: 'success', message: 'แก้ไขข้อมูลสำเร็จ' })
      } else if (action === 'delete') {
        sheet.deleteRow(targetRowIndex)
        return createJsonResponse({ status: 'success', message: 'ลบข้อมูลสำเร็จ' })
      }
    }

    return createJsonResponse({ status: 'error', message: 'คำสั่ง Action ไม่ถูกต้อง' })
  } catch (error) {
    return createJsonResponse({ status: 'error', message: error.toString() })
  }
}

/**
 * ฟังก์ชันสร้าง JSON Response สำหรับส่งกลับไปยัง Client
 */
function createJsonResponse(output) {
  return ContentService.createTextOutput(JSON.stringify(output)).setMimeType(
    ContentService.MimeType.JSON
  )
}

/**
 * ฟังก์ชันสำหรับสร้าง Auto-Increment ID รูปแบบ Prefix-YYMMDDXXXX
 * รีเซ็ตเลขวิ่ง (XXXX) เริ่มต้นใหม่ที่ 0001 ทุกวัน
 */
function generateNextId(sheetName, prefix) {
  prefix = prefix || 'CUST-'
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName)

  // 1. สร้างข้อความวันที่ปัจจุบันในรูปแบบ YYMMDD
  var today = new Date()
  var yy = String(today.getFullYear()).slice(-2)
  var mm = String(today.getMonth() + 1).padStart(2, '0')
  var dd = String(today.getDate()).padStart(2, '0')
  var dateStr = yy + mm + dd // ผลลัพธ์ เช่น "260710" (ปี 2026 เดือน 07 วันที่ 10)

  // ค่าเริ่มต้นสำหรับวันใหม่
  var defaultId = prefix + dateStr + '0001'

  if (!sheet) return defaultId

  var lastRow = sheet.getLastRow()
  if (lastRow > 1) {
    // 2. ดึง ID ล่าสุดจากแถวท้ายสุด คอลัมน์แรก (A)
    var lastIdStr = sheet.getRange(lastRow, 1).getValue().toString()

    // ตัดส่วน Prefix ออกเพื่อให้เหลือแค่ YYMMDDXXXX
    var cleanIdStr = lastIdStr.replace(prefix, '')

    // แยกส่วนวันที่ และ เลขวิ่งออกจากกัน
    var lastIdDate = cleanIdStr.substring(0, 6) // ส่วน YYMMDD ของ ID ล่าสุด
    var lastIdNumStr = cleanIdStr.substring(6) // ส่วน XXXX ของ ID ล่าสุด
    var lastIdNum = parseInt(lastIdNumStr, 10)

    // 3. ตรวจสอบว่า ID ล่าสุดตรงกับวันที่ปัจจุบันหรือไม่
    if (lastIdDate === dateStr && !isNaN(lastIdNum)) {
      // เป็นวันเดียวกัน -> เพิ่มเลขวิ่งขึ้น 1 ค่า และเติมศูนย์ให้ครบ 4 หลัก
      var nextNumStr = String(lastIdNum + 1).padStart(4, '0')
      return prefix + dateStr + nextNumStr
    }
  }

  // แผ่นงานว่างเปล่า หรือ เป็นการขึ้นวันใหม่ -> ส่งค่าเริ่มต้นของวันกลับไป
  return defaultId
}
