import { GoogleGenerativeAI } from '@google/generative-ai';
import { CONFIG } from './config';

export interface ProcessedStoryResult {
  title: string;
  summary: string;
  category: string;
  subCategory: string;
  verificationStatus: 'VERIFIED_OFFICIAL' | 'HIGH_CONFIDENCE' | 'MULTIPLE_SOURCES' | 'UNVERIFIED_SINGLE_SOURCE';
  verificationScore: number;
  isBreaking: boolean;
  isTrending: boolean;
  isLive: boolean;
  tags: string[];
}

export async function processStoryWithGemini(
  rawTitle: string,
  rawContent: string,
  sourceName: string,
  sourceType: string = 'RSS'
): Promise<ProcessedStoryResult> {
  const apiKey = CONFIG.geminiApiKey;

  // Try calling Gemini API if key is present
  if (apiKey && apiKey.trim().length > 0) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `You are a neutral, authoritative news editor and classification AI.
Analyze the following raw news article and return a strictly valid JSON object.

RAW TITLE: "${rawTitle}"
SOURCE: "${sourceName}" (Type: "${sourceType}")
RAW CONTENT: "${rawContent.substring(0, 1500)}"

Respond ONLY with valid JSON in this exact structure:
{
  "title": "A clear, factual, objective headline in Title Case without sensationalism",
  "summary": "• Point 1: Key fact or decision\\n• Point 2: Context or background details\\n• Point 3: Impact, schedule, or next step",
  "category": "global" | "india" | "student" | "exams" | "live" | "trending",
  "subCategory": "world" | "usa" | "uk" | "europe" | "asia" | "middle-east" | "africa" | "australia" | "politics" | "business" | "technology" | "science-space" | "sports" | "breaking" | "economy" | "education" | "jobs-careers" | "state",
  "verificationStatus": "VERIFIED_OFFICIAL" | "HIGH_CONFIDENCE" | "MULTIPLE_SOURCES" | "UNVERIFIED_SINGLE_SOURCE",
  "verificationScore": 0.95,
  "isBreaking": false,
  "isTrending": false,
  "isLive": false,
  "tags": ["tag1", "tag2"]
}`;

      const res = await model.generateContent(prompt);
      const text = res.response.text() || '';

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          title: parsed.title || rawTitle,
          summary: parsed.summary || rawContent.substring(0, 250),
          category: parsed.category || determineFallbackCategory(rawTitle, rawContent),
          subCategory: parsed.subCategory || 'general',
          verificationStatus: parsed.verificationStatus || (sourceType === 'GOVERNMENT_PORTAL' ? 'VERIFIED_OFFICIAL' : 'HIGH_CONFIDENCE'),
          verificationScore: parsed.verificationScore || 0.88,
          isBreaking: Boolean(parsed.isBreaking),
          isTrending: Boolean(parsed.isTrending),
          isLive: Boolean(parsed.isLive),
          tags: Array.isArray(parsed.tags) ? parsed.tags : [],
        };
      }
    } catch (error) {
      console.warn('Gemini API call failed or failed to parse, falling back to local NLP engine:', error);
    }
  }

  // Smart local fallback NLP engine when GEMINI_API_KEY is not configured
  return processStoryLocally(rawTitle, rawContent, sourceName, sourceType);
}

function processStoryLocally(
  rawTitle: string,
  rawContent: string,
  sourceName: string,
  sourceType: string
): ProcessedStoryResult {
  // Clean raw title
  const cleanTitle = rawTitle
    .replace(/^(BREAKING|ALERT|NEWS|UPDATE):\s*/i, '')
    .replace(/\s+-\s+[A-Za-z0-9\s]+$/, '')
    .trim();

  const formattedTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);

  // Derive bullet points from content
  const sentences = rawContent
    .replace(/<[^>]+>/g, '')
    .split(/(?<=[.!?])\s+/)
    .filter((s) => s.trim().length > 15)
    .slice(0, 3);

  let summaryBullets = sentences.map((s) => `• ${s.trim()}`).join('\n');
  if (!summaryBullets) {
    summaryBullets = `• ${cleanTitle}\n• Report published by official source ${sourceName}.\n• Key developments are being monitored in real time.`;
  }

  const category = determineFallbackCategory(rawTitle, rawContent);
  const subCategory = determineFallbackSubCategory(rawTitle, rawContent, category);
  
  const isGov = sourceType === 'GOVERNMENT_PORTAL' || sourceType === 'UNIVERSITY' || sourceName.includes('Gov') || sourceName.includes('PIB') || sourceName.includes('NTA');

  return {
    title: formattedTitle,
    summary: summaryBullets,
    category,
    subCategory,
    verificationStatus: isGov ? 'VERIFIED_OFFICIAL' : 'HIGH_CONFIDENCE',
    verificationScore: isGov ? 0.98 : 0.86,
    isBreaking: /breaking|urgent|just in|bulletin/i.test(rawTitle),
    isTrending: /popular|viral|trending|record|top/i.test(rawTitle),
    isLive: /live updates|live coverage|as it happened|blog/i.test(rawTitle),
    tags: [category, subCategory, sourceName.toLowerCase().replace(/\s+/g, '-')],
  };
}

function determineFallbackCategory(title: string, content: string): string {
  const text = (title + ' ' + content).toLowerCase();
  if (/jee|neet|upsc|cat|gate|admit card|hall ticket|syllabus|exam date|cutoff|counseling|answer key|result 202/i.test(text)) {
    return 'exams';
  }
  if (/student|university|college|scholarship|admission|cbse|icse|degree|campus|higher education/i.test(text)) {
    return 'student';
  }
  if (/india|delhi|mumbai|bengaluru|isro|rbi|modi|parliament|lok sabha|state government|pib/i.test(text)) {
    return 'india';
  }
  if (/live|watch live|live blog|live stream|minute-by-minute/i.test(text)) {
    return 'live';
  }
  return 'global';
}

function determineFallbackSubCategory(title: string, content: string, mainCategory: string): string {
  const text = (title + ' ' + content).toLowerCase();
  if (mainCategory === 'global') {
    if (/usa|washington|biden|white house|pentagon|us /i.test(text)) return 'usa';
    if (/uk|london|britain|parliament|downing/i.test(text)) return 'uk';
    if (/europe|eu|germany|france|brussels/i.test(text)) return 'europe';
    if (/asia|china|japan|tokyo|beijing|korea/i.test(text)) return 'asia';
    if (/middle east|gaza|israel|dubai|uae|saudi/i.test(text)) return 'middle-east';
    if (/africa|cairo|south africa|kenya/i.test(text)) return 'africa';
    if (/australia|sydney|canberra/i.test(text)) return 'australia';
    if (/space|nasa|isro|moon|mars|satellite|rocket|astronomy|galaxy/i.test(text)) return 'science-space';
    if (/ai|artificial intelligence|apple|google|microsoft|tech|chip|semiconductor|crypto/i.test(text)) return 'technology';
    if (/stock|market|economy|gdp|inflation|fed|banking|business|ceo/i.test(text)) return 'business';
    if (/cricket|football|olympics|tennis|f1|champion|league|world cup/i.test(text)) return 'sports';
    return 'world';
  }

  if (mainCategory === 'india') {
    if (/exam|jee|neet|cbse|school|college|degree/i.test(text)) return 'education';
    if (/job|recruitment|vacancy|salary|hiring|workplace/i.test(text)) return 'jobs-careers';
    if (/economy|gdp|rbi|sensex|nifty|gst|tax/i.test(text)) return 'economy';
    if (/tech|digital|startup|5g|isro|it ministry/i.test(text)) return 'technology';
    if (/state|governor|chief minister|panchayat|municipal/i.test(text)) return 'state';
    return 'politics';
  }

  return 'general';
}
