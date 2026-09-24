import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ bookmarks: [] }, { status: 200 });
    }

    const bookmarks = await db.bookmark.findMany({
      where: { userId: user.id },
      include: {
        article: {
          include: {
            translations: true,
          },
        },
        blog: {
          include: {
            translations: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ bookmarks });
  } catch (error: any) {
    console.error('Fetch bookmarks error:', error);
    return NextResponse.json({ bookmarks: [], error: error?.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await req.json();
    const { storyId, articleId, blogId } = body;
    const targetArticleId = articleId || storyId;

    if (!targetArticleId && !blogId) {
      return NextResponse.json({ error: 'articleId or blogId is required' }, { status: 400 });
    }

    const existing = await db.bookmark.findFirst({
      where: {
        userId: user.id,
        articleId: targetArticleId || undefined,
        blogId: blogId || undefined,
      },
    });

    if (existing) {
      await db.bookmark.delete({ where: { id: existing.id } });
      return NextResponse.json({ success: true, bookmarked: false, message: 'Bookmark removed' });
    }

    const newBookmark = await db.bookmark.create({
      data: {
        userId: user.id,
        articleId: targetArticleId || null,
        blogId: blogId || null,
      },
    });

    return NextResponse.json({ success: true, bookmarked: true, bookmark: newBookmark });
  } catch (error: any) {
    console.error('Bookmark toggle error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to toggle bookmark' }, { status: 500 });
  }
}
