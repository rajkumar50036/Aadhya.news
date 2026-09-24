const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Clearing old demo records and setting up 100% live feeds...');

  // Remove any demo flagged items
  await prisma.story.deleteMany({ where: { isDemoData: true } });

  // 1. Configure Live Sources
  const liveFeeds = [
    {
      name: 'The Hindu National News',
      url: 'https://www.thehindu.com/news/national/feeder/default.rss',
      category: 'india',
      subCategory: 'politics',
      sourceType: 'RSS',
      trustScore: 0.95,
    },
    {
      name: 'NDTV Top National Stories',
      url: 'https://feeds.feedburner.com/ndtvnews-top-stories',
      category: 'india',
      subCategory: 'breaking',
      sourceType: 'RSS',
      trustScore: 0.92,
    },
    {
      name: 'BBC World News',
      url: 'http://feeds.bbci.co.uk/news/world/rss.xml',
      category: 'global',
      subCategory: 'world',
      sourceType: 'RSS',
      trustScore: 0.94,
    },
    {
      name: 'NASA Space & Science',
      url: 'https://www.nasa.gov/rss/dyn/breaking_news.rss',
      category: 'global',
      subCategory: 'science-space',
      sourceType: 'RSS',
      trustScore: 0.98,
    },
    {
      name: 'TechCrunch Global Technology',
      url: 'https://techcrunch.com/feed/',
      category: 'global',
      subCategory: 'technology',
      sourceType: 'RSS',
      trustScore: 0.90,
    },
    {
      name: 'Indian Express Education & Exams',
      url: 'https://indianexpress.com/section/education/feed/',
      category: 'exams',
      subCategory: 'education',
      sourceType: 'RSS',
      trustScore: 0.93,
    },
    {
      name: 'Jagran Josh Competitive Exams',
      url: 'https://www.jagranjosh.com/rss/josh/articles_rule.xml',
      category: 'exams',
      subCategory: 'education',
      sourceType: 'RSS',
      trustScore: 0.91,
    },
  ];

  for (const f of liveFeeds) {
    await prisma.feed.upsert({
      where: { url: f.url },
      update: f,
      create: f,
    });
  }

  console.log('Live feeds configured successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
