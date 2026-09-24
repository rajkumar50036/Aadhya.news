import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { createAuthToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get('code');
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || 'https://news-platform-eight.vercel.app/api/auth/google/callback';

  let email = 'user.gmail@gmail.com';
  let name = 'Google Reader';

  if (code && code !== 'demo_google_code' && clientId && clientSecret) {
    try {
      // Exchange code for token
      const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
        }),
      });

      const tokenData = await tokenRes.json();

      if (tokenData.access_token) {
        // Fetch user profile from Google
        const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: { Authorization: `Bearer ${tokenData.access_token}` },
        });

        const userData = await userRes.json();
        if (userData.email) {
          email = userData.email.toLowerCase();
          name = userData.name || email.split('@')[0];
        }
      }
    } catch (err) {
      console.error('Failed to exchange Google OAuth code:', err);
    }
  }

  try {
    const user = await db.user.upsert({
      where: { email },
      update: { name },
      create: {
        email,
        name,
        role: 'USER',
        preferredLanguage: 'en',
      },
    });

    const sessionUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      preferredLanguage: user.preferredLanguage,
    };

    const token = createAuthToken(sessionUser);

    const baseUrl = req.nextUrl.origin || 'http://localhost:3000';
    const response = NextResponse.redirect(new URL('/', baseUrl));

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('Google callback DB error:', error);
    const baseUrl = req.nextUrl.origin || 'http://localhost:3000';
    return NextResponse.redirect(new URL('/login?error=oauth_failed', baseUrl));
  }
}
