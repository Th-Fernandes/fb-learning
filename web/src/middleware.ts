import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  const isRequestMadeByClient = !req.headers.get("referer")?.includes('http://localhost:3000')

  if (pathname.startsWith(`/api/`) && isRequestMadeByClient) 
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  return NextResponse.next()

}

export const config = {
  matcher: ['/((?!_next|fonts|examples|svg|[\\w-]+\\.\\w+).*)'],
}