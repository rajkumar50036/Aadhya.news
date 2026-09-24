import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { broadcastEvent, EVENT_TYPES } from '@/lib/events';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      summary,
      content,
      category,
      subCategory,
      sourceName,
      sourceUrl,
      imageUrl,
      isBreaking,
      isFeatured,
      isTrending,
      isLive,
      verificationStatus,
    } = body;

    if (!title || !summary || !category) {
      return NextResponse.json({ error: 'Title, summary, and category are required' }, { status: 400 });
    }

    const slugBase = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    const slug = `${slugBase}-${Math.random().toString(36).substring(2, 7)}`;

    const story = await db.story.create({
      data: {
        title,
        slug,
        rawTitle: title,
        summary,
        content: content || summary,
        category,
        subCategory: subCategory || 'general',
        sourceName: sourceName || 'Official Admin Publisher',
        sourceUrl: sourceUrl || 'https://news-platform.internal',
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&auto=format&fit=crop&q=80',
        isBreaking: Boolean(isBreaking),
        isFeatured: Boolean(isFeatured),
        isTrending: Boolean(isTrending),
        isLive: Boolean(isLive),
        verificationStatus: verificationStatus || 'VERIFIED_OFFICIAL',
        verificationScore: 0.99,
        isDemoData: false,
        publishedAt: new Date(),
      },
    });

    broadcastEvent(EVENT_TYPES.STORY_PUBLISHED, story);

    return NextResponse.json({ success: true, story });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, summary, content, category, subCategory, verificationStatus, isBreaking, isFeatured, isTrending, isLive } = body;

    if (!id) return NextResponse.json({ error: 'Story ID is required' }, { status: 400 });

    const updated = await db.story.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(summary && { summary }),
        ...(content && { content }),
        ...(category && { category }),
        ...(subCategory && { subCategory }),
        ...(verificationStatus && { verificationStatus }),
        ...(isBreaking !== undefined && { isBreaking }),
        ...(isFeatured !== undefined && { isFeatured }),
        ...(isTrending !== undefined && { isTrending }),
        ...(isLive !== undefined && { isLive }),
      },
    });

    return NextResponse.json({ success: true, story: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Story ID is required' }, { status: 400 });

    await db.story.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
