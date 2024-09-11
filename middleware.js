import { NextResponse } from 'next/server';

const protectedRoutes = ['/pages/Dashboard'];

export function middleware(req) {
  const { pathname } = req.nextUrl; 
  const token = req.cookies.get('token')?.value;
  if (protectedRoutes.includes(pathname)) {
    if (!token) {
      const loginUrl = new URL('/pages/Login', req.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }
  
  if (pathname === '/pages/Login' || pathname === '/pages/Signup'||pathname === '/') {
    if (token) {
      const dashboardUrl = new URL('/pages/Dashboard', req.url);
      return NextResponse.redirect(dashboardUrl);
    }
    return NextResponse.next();
  }
  return NextResponse.next();
}
// Pages where this middleware will apply
export const config = {
  matcher: ['/','/pages/Dashboard', '/pages/Login', '/pages/Signup'], 
};