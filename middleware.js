import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host');

  if (hostname === 'hub.siphoxhealth.com') {
    if (url.pathname.startsWith('/hub')) {
      url.pathname = url.pathname.replace('/hub', '');
      return NextResponse.rewrite(url);
    }
  }
  return NextResponse.next();
}
