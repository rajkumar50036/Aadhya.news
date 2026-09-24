// Application Global Centralized Configuration
// DO NOT hardcode brand names or contact numbers in UI components!

export const CONFIG = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || process.env.APP_NAME || 'NEWS',
  contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE || process.env.CONTACT_PHONE || '9160788555',
  contactPhoneFormatted: '+91 9160788555',
  contactEmail: 'contact@news-platform.internal',
  contactAddress: 'National News & Innovation Center, Technology Park, India',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  adminSecret: process.env.ADMIN_SECRET || 'admin123',
  isDev: process.env.NODE_ENV !== 'production',
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'hi', 'te', 'ta', 'bn', 'mr'],
  feedRefreshIntervalMs: 5 * 60 * 1000, // 5 minutes
};

export function getDialerUri(phoneNumber: string = CONFIG.contactPhone): string {
  const sanitized = phoneNumber.replace(/[^0-9+]/g, '');
  return `tel:${sanitized}`;
}
