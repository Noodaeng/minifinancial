export interface Env {
  DB: D1Database
}

// Strictly type the expected row structure returning from your D1 table
interface UserRow {
  userId: number
  userName: string
  name: string
  role: string | number
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    // 1. Handle CORS Preflight Requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      })
    }

    // 2. Handle Login API Endpoint
    if (url.pathname === '/api/login' && request.method === 'POST') {
      try {
        const body = await request.json()

        // Match the secret token configured on your frontend
        const AUTH_TOKEN = 'MiniFinancial_Secret_Token_2026_XYZ'
        if (!body.token || body.token !== AUTH_TOKEN) {
          return Response.json(
            {
              status: 'error',
              message: 'Unauthorized',
              reason: 'AUTH_TOKEN mismatch'
            },
            { status: 401, headers: { 'Access-Control-Allow-Origin': '*' } }
          )
        }

        // Match your frontend's AppConfig.PrivateKey to slice it off securely[cite: 2]
        const PRIVATE_KEY = 'YOUR_PRIVATE_KEY'

        const decode = (val: string): string => {
          try {
            // Decodes standard Base64[cite: 2]
            const raw = atob(val)

            // Checks if the decoded string ends with the Private Key and trims it out[cite: 2]
            if (raw.endsWith(PRIVATE_KEY)) {
              return raw.slice(0, -PRIVATE_KEY.length)
            }
            return raw
          } catch {
            throw new Error('Invalid encoding format')
          }
        }

        const username = decode(body.username)
        const password = decode(body.password)

        // 3. Query your D1 Database table
        const user = await env.DB.prepare(
          'SELECT userId, userName, name, role FROM users WHERE userName = ? AND password = ?'
        )
          .bind(username, password)
          .first<UserRow>()

        // 4. Debugging 401 Payload if no user matches
        if (!user) {
          return Response.json(
            {
              status: 'error',
              message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
              debug: {
                processedUsername: username,
                processedPassword: password,
                notice:
                  'If the fields above still contain your private key text at the end, your backend PRIVATE_KEY constant does not match the frontend configuration.'
              }
            },
            { status: 401, headers: { 'Access-Control-Allow-Origin': '*' } }
          )
        }

        // 5. Generate system session token[cite: 2]
        const sessionToken = 'tkn_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7)

        // Save the generated session token in D1
        await env.DB.prepare('UPDATE users SET sessionToken = ? WHERE userId = ?')
          .bind(sessionToken, user.userId)
          .run()

        // 6. Success Response[cite: 2]
        return Response.json(
          {
            status: 'success',
            message: 'เข้าสู่ระบบสำเร็จ',
            token: sessionToken,
            user
          },
          {
            headers: { 'Access-Control-Allow-Origin': '*' }
          }
        )
      } catch (err: any) {
        return Response.json(
          { status: 'error', message: err.message || err.toString() },
          { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
        )
      }
    }

    // Default 404 Route
    return new Response('Not Found', { status: 404 })
  }
}
