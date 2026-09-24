import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const feeds = await db.feed.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { storySources: true },
        },
      },
    });
    return NextResponse.json({ feeds });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, url, category, subCategory, sourceType, trustScore } = body;

    if (!name || !url || !category) {
      return NextResponse.json({ error: 'Name, URL, and category are required' }, { status: 400 });
    }

    const newFeed = await db.feed.create({
      data: {
        name,
        url,
        category,
        subCategory: subCategory || null,
        sourceType: sourceType || 'RSS',
        trustScore: trustScore ? parseFloat(trustScore) : 0.9,
      },
    });

    return NextResponse.json({ success: true, feed: newFeed });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Feed ID is required' }, { status: 400 });

    await db.feed.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
