export interface Env {
  DB: D1Database
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const result = await env.DB.prepare('SELECT sqlite_version() AS version').first()

    return Response.json(result)
  }
}
