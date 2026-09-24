import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { db } from '@/lib/db';
import { CONFIG } from '@/lib/config';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic, category = 'Analysis', publishStatus = 'DRAFT', authorName = 'Editorial Team' } = body;

    if (!topic) {
      return NextResponse.json({ error: 'Topic or prompt is required.' }, { status: 400 });
    }

    const apiKey = CONFIG.geminiApiKey || process.env.GEMINI_API_KEY;

    let generatedData = {
      title: `Editorial Column: ${topic}`,
      excerpt: `An insightful analysis on ${topic}, exploring systemic causes and key implications.`,
      content: `<p>Welcome to our deep dive into <strong>${topic}</strong>.</p><p>As events unfold across global and national spheres, understanding the structural impacts is paramount.</p><p>Stay tuned as our analytical team continues monitoring key developments.</p>`,
      tags: ['editorial', category.toLowerCase(), 'analysis'],
    };

    if (apiKey && apiKey.trim().length > 0) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const prompt = `You are an expert op-ed journalist and blogger writing an engaging, thoughtful blog post about: "${topic}".
Category: ${category}

Respond ONLY with valid JSON:
{
  "title": "Captivating Blog Title",
  "excerpt": "A concise 2-sentence hook/summary of the blog post",
  "content": "<p>Paragraph 1 with strong opinion/analysis</p><p>Paragraph 2 with context</p><p>Paragraph 3 concluding thoughts</p>",
  "tags": ["tag1", "tag2", "tag3"]
}`;

        const res = await model.generateContent(prompt);
        const text = res.response.text();
        const match = text.match(/\{[\s\S]*\}/);
        if (match) {
          const parsed = JSON.parse(match[0]);
          generatedData = {
            title: parsed.title || generatedData.title,
            excerpt: parsed.excerpt || generatedData.excerpt,
            content: parsed.content || generatedData.content,
            tags: Array.isArray(parsed.tags) ? parsed.tags : generatedData.tags,
          };
        }
      } catch (geminiError) {
        console.warn('Gemini blog generation failed, using template:', geminiError);
      }
    }

    const slug = generatedData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);

    const newBlog = await db.blog.create({
      data: {
        title: generatedData.title,
        excerpt: generatedData.excerpt,
        content: generatedData.content,
        category,
        authorName,
        status: publishStatus,
        slug,
        tags: JSON.stringify(generatedData.tags),
      },
    });

    return NextResponse.json({
      success: true,
      blog: newBlog,
      message: `Blog post generated and saved as ${publishStatus}`,
    });
  } catch (error: any) {
    console.error('Generate Blog Error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to generate blog post.' }, { status: 500 });
  }
}
