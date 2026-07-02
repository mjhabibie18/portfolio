import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'id'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Exclude static files, api, _next, etc.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return;
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Check if there is a cookie for language
  const cookie = request.cookies.get('.AspNetCore.Culture');
  let locale = defaultLocale;
  
  if (cookie && cookie.value) {
    const match = cookie.value.match(/c=([^|]+)/);
    if (match && match[1]) {
      locale = match[1].substring(0, 2).toLowerCase(); // 'en-US' -> 'en'
    }
  }

  // Redirect if there is no locale
  if (!locales.includes(locale)) locale = defaultLocale;
  
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
