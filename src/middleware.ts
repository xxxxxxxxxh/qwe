export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/:path*/account', '/:path*/@me']
};
