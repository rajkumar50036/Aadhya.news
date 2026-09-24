import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { db } from '@/lib/db';
import { CONFIG } from '@/lib/config';
import { LANGUAGE_NAMES } from '@/lib/i18n';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { storyId, blogId, targetLanguage } = body;

    if (!targetLanguage || (!storyId && !blogId)) {
      return NextResponse.json(
        { error: 'targetLanguage and storyId or blogId are required.' },
        { status: 400 }
      );
    }

    if (targetLanguage === 'en') {
      return NextResponse.json({ message: 'Source content is already in English' });
    }

    const langName = LANGUAGE_NAMES[targetLanguage as keyof typeof LANGUAGE_NAMES] || targetLanguage;

    // 1. Article Translation
    if (storyId) {
      const existing = await db.articleTranslation.findUnique({
        where: {
          articleId_languageCode: {
            articleId: storyId,
            languageCode: targetLanguage,
          },
        },
      });

      if (existing) {
        return NextResponse.json({ success: true, translation: existing, cached: true });
      }

      const story = await db.story.findUnique({ where: { id: storyId } });
      if (!story) {
        return NextResponse.json({ error: 'Story not found.' }, { status: 404 });
      }

      let translatedTitle = story.title;
      let translatedSummary = story.summary;
      let translatedContent = story.content;

      const apiKey = CONFIG.geminiApiKey || process.env.GEMINI_API_KEY;

      if (apiKey && apiKey.trim().length > 0) {
        try {
          const genAI = new GoogleGenerativeAI(apiKey);
          const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
          const prompt = `Translate the following news story into ${langName} (${targetLanguage}).
Maintain HTML tags like <p>, <strong> in the content string.

Original Title: "${story.title}"
Original Summary: "${story.summary}"
Original Content: "${story.content}"

Respond ONLY with valid JSON:
{
  "title": "Translated title",
  "summary": "Translated summary",
  "content": "Translated content with HTML tags"
}`;

          const res = await model.generateContent(prompt);
          const text = res.response.text();
          const match = text.match(/\{[\s\S]*\}/);
          if (match) {
            const parsed = JSON.parse(match[0]);
            translatedTitle = parsed.title || story.title;
            translatedSummary = parsed.summary || story.summary;
            translatedContent = parsed.content || story.content;
          }
        } catch (geminiError) {
          console.warn('Gemini translation failed, saving original with language flag:', geminiError);
        }
      }

      const translation = await db.articleTranslation.create({
        data: {
          articleId: story.id,
          languageCode: targetLanguage,
          title: translatedTitle,
          excerpt: translatedSummary,
          content: translatedContent,
        },
      });

      return NextResponse.json({ success: true, translation });
    }

    // 2. Blog Translation
    if (blogId) {
      const existing = await db.blogTranslation.findUnique({
        where: {
          blogId_languageCode: {
            blogId,
            languageCode: targetLanguage,
          },
        },
      });

      if (existing) {
        return NextResponse.json({ success: true, translation: existing, cached: true });
      }

      const blog = await db.blog.findUnique({ where: { id: blogId } });
      if (!blog) {
        return NextResponse.json({ error: 'Blog post not found.' }, { status: 404 });
      }

      let translatedTitle = blog.title;
      let translatedExcerpt = blog.excerpt;
      let translatedContent = blog.content;

      const apiKey = CONFIG.geminiApiKey || process.env.GEMINI_API_KEY;

      if (apiKey && apiKey.trim().length > 0) {
        try {
          const genAI = new GoogleGenerativeAI(apiKey);
          const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
          const prompt = `Translate the following blog post into ${langName} (${targetLanguage}).
Maintain HTML tags like <p>, <strong> in the content string.

Original Title: "${blog.title}"
Original Excerpt: "${blog.excerpt}"
Original Content: "${blog.content}"

Respond ONLY with valid JSON:
{
  "title": "Translated title",
  "excerpt": "Translated excerpt",
  "content": "Translated content with HTML tags"
}`;

          const res = await model.generateContent(prompt);
          const text = res.response.text();
          const match = text.match(/\{[\s\S]*\}/);
          if (match) {
            const parsed = JSON.parse(match[0]);
            translatedTitle = parsed.title || blog.title;
            translatedExcerpt = parsed.excerpt || blog.excerpt;
            translatedContent = parsed.content || blog.content;
          }
        } catch (geminiError) {
          console.warn('Gemini blog translation failed:', geminiError);
        }
      }

      const translation = await db.blogTranslation.create({
        data: {
          blogId: blog.id,
          languageCode: targetLanguage,
          title: translatedTitle,
          excerpt: translatedExcerpt,
          content: translatedContent,
        },
      });

      return NextResponse.json({ success: true, translation });
    }

    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  } catch (error: any) {
    console.error('Translation Error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to translate content.' }, { status: 500 });
  }
}
