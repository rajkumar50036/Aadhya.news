import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

// Handle Vercel serverless read-only filesystem by copying SQLite DB to /tmp/dev.db
if (process.env.VERCEL === '1' || process.env.NEXT_PUBLIC_VERCEL_ENV) {
  try {
    const tmpDbPath = '/tmp/dev.db';
    const localDbPath = path.join(process.cwd(), 'dev.db');

    if (!fs.existsSync(tmpDbPath) && fs.existsSync(localDbPath)) {
      fs.copyFileSync(localDbPath, tmpDbPath);
    }

    if (fs.existsSync(tmpDbPath)) {
      process.env.DATABASE_URL = `file:${tmpDbPath}`;
    }
  } catch (e) {
    console.warn('Vercel SQLite tmp setup notice:', e);
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
