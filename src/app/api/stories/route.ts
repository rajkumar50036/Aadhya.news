import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const subCategory = searchParams.get('subCategory');
  const search = searchParams.get('q') || searchParams.get('search');
  const isBreaking = searchParams.get('isBreaking') === 'true';
  const isFeatured = searchParams.get('isFeatured') === 'true';
  const isTrending = searchParams.get('isTrending') === 'true';
  const isLive = searchParams.get('isLive') === 'true';
  const limit = parseInt(searchParams.get('limit') || '20', 10);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const skip = (page - 1) * limit;

  try {
    const where: any = {};

    if (category) where.category = category;
    if (subCategory) where.subCategory = subCategory;
    if (isBreaking) where.isBreaking = true;
    if (isFeatured) where.isFeatured = true;
    if (isTrending) where.isTrending = true;
    if (isLive) where.isLive = true;

    if (search && search.trim().length > 0) {
      where.OR = [
        { title: { contains: search } },
        { summary: { contains: search } },
        { content: { contains: search } },
        { sourceName: { contains: search } },
      ];
    }

    const [stories, total] = await Promise.all([
      db.story.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        take: limit,
        skip,
        include: {
          sources: true,
          liveUpdates: {
            orderBy: { publishedAt: 'desc' },
            take: 3,
          },
        },
      }),
      db.story.count({ where }),
    ]);

    return NextResponse.json({
      stories,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch stories' }, { status: 500 });
  }
}
