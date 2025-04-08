import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {

  const response = NextResponse.next();


  if (request.nextUrl.pathname.startsWith('/api/holidays')) {

    response.headers.set(
      'Cache-Control',
      'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400'
    );
  }

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
