import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || 'https://news-platform-eight.vercel.app/api/auth/google/callback';

  if (!clientId) {
    // Graceful fallback for local / quick demo when GOOGLE_CLIENT_ID isn't set yet
    const url = new URL('/api/auth/google/callback', process.env.NEXTAUTH_URL || 'http://localhost:3000');
    url.searchParams.set('code', 'demo_google_code');
    return NextResponse.redirect(url.toString());
  }

  const scope = encodeURIComponent('openid email profile');
  const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&scope=${scope}&prompt=select_account`;

  return NextResponse.redirect(googleUrl);
}
