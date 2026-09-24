import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ history: [] }, { status: 200 });
    }

    const history = await db.readingHistory.findMany({
      where: { userId: user.id },
      include: {
        article: true,
        blog: true,
      },
      orderBy: { viewedAt: 'desc' },
      take: 50,
    });

    return NextResponse.json({ history });
  } catch (error: any) {
    console.error('Fetch history error:', error);
    return NextResponse.json({ history: [], error: error?.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: 'Anonymous read' }, { status: 200 });
    }

    const body = await req.json();
    const { storyId, articleId, blogId } = body;
    const targetArticleId = articleId || storyId;

    if (!targetArticleId && !blogId) {
      return NextResponse.json({ error: 'articleId or blogId is required' }, { status: 400 });
    }

    const entry = await db.readingHistory.create({
      data: {
        userId: user.id,
        articleId: targetArticleId || null,
        blogId: blogId || null,
      },
    });

    return NextResponse.json({ success: true, entry });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
