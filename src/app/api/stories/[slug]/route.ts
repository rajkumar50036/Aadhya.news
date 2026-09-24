import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const story = await db.story.findUnique({
      where: { slug: params.slug },
      include: {
        sources: { orderBy: { publishedAt: 'desc' } },
        liveUpdates: { orderBy: { publishedAt: 'desc' } },
      },
    });

    if (!story) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    // Increment read count
    await db.story.update({
      where: { id: story.id },
      data: { readCount: { increment: 1 } },
    });

    // Fetch related stories from same category
    const related = await db.story.findMany({
      where: {
        category: story.category,
        id: { not: story.id },
      },
      take: 4,
      orderBy: { publishedAt: 'desc' },
    });

    return NextResponse.json({ story, related });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch story' }, { status: 500 });
  }
}
