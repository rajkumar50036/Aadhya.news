import { NextResponse } from 'next/server';
import { ingestAllActiveFeeds } from '@/lib/ingestion';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const reports = await ingestAllActiveFeeds();
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      reports,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Ingestion execution error' },
      { status: 500 }
    );
  }
}
