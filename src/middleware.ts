import { NextRequest, NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  const _headers = new Headers(req.headers)
  const pathname = new URL(req.url).pathname

  _headers.set("x-current-path", pathname)

  const response = NextResponse.next({
    request: {
      headers: _headers
    }
  })

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|public|_next/static|_next/image|favicon.ico).*)"
  ]
}
