// Automated Background Feed Ingestion Cron Worker
// Periodically fetches, normalizes, deduplicates, and ingests live RSS/Atom news feeds

const http = require('http');

const REFRESH_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

async function triggerIngestion() {
  const timestamp = new Date().toLocaleString();
  console.log(`[${timestamp}] 🔄 Triggering automated real-time feed ingestion cycle...`);

  const req = http.request(
    {
      hostname: 'localhost',
      port: 3000,
      path: '/api/ingestion/run',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          console.log(`[${new Date().toLocaleString()}] ✅ Ingestion cycle complete!`);
          if (parsed.reports) {
            parsed.reports.forEach((r) => {
              console.log(`   - ${r.feedName}: ${r.newStoriesCreated} new stories created, ${r.clusteredCount} clustered.`);
            });
          }
        } catch (e) {
          console.log(`[${new Date().toLocaleString()}] Ingestion output received.`);
        }
      });
    }
  );

  req.on('error', (err) => {
    console.error(`[${new Date().toLocaleString()}] ⚠️ Ingestion trigger error:`, err.message);
  });

  req.end();
}

console.log('🚀 Automated Real-Time News Ingestion Worker Started (Polling every 5 minutes)...');
// Initial run
triggerIngestion();

// Scheduled interval
setInterval(triggerIngestion, REFRESH_INTERVAL_MS);
