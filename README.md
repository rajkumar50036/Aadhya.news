# AUTOMATIC REAL-TIME NEWS PLATFORM

A multi-page automatic real-time news platform built for Web (Desktop, Laptop), Mobile (Android, iOS, Tablets), and Admin Dashboard.

## Architecture Highlights
- **Multi-Channel Ingestion Pipeline**: Ingests RSS, Atom feeds, official government portals (PIB India, NTA, UGC), university portals, and news APIs.
- **Normalizing & Duplicate Clustering Engine**: Deduplicates incoming stories using string similarity and groups related coverage into story nodes.
- **Gemini AI Engine**: Generates non-clickbait factual headlines, bulleted executive summaries, category classification, and verification scoring.
- **Real-Time Stream**: Server-Sent Events (SSE) broadcast at `/api/realtime/stream` for instant breaking news alerts.
- **Centralized Configuration**:
  - `APP_NAME=NEWS`
  - `CONTACT_PHONE=9160788555`
  - Device phone dialer link (`tel:9160788555`) via `CALL US` button.
- **Comprehensive Route Matrix**:
  - `/` (Home)
  - `/global` + 14 Sub-routes (`/global/world`, `/global/usa`, `/global/uk`, `/global/europe`, `/global/asia`, `/global/middle-east`, `/global/africa`, `/global/australia`, `/global/politics`, `/global/business`, `/global/technology`, `/global/science-space`, `/global/sports`, `/global/breaking`)
  - `/india` + 7 Sub-routes (`/india/breaking`, `/india/politics`, `/india/economy`, `/india/education`, `/india/technology`, `/india/jobs-careers`, `/india/state`)
  - `/student`
  - `/exams`
  - `/live`
  - `/trending`
  - `/search`
  - `/story/[slug]`
  - `/contact` (Phone dialer: 9160788555)
  - `/about`, `/privacy`, `/terms`, `/cookies`, `/accessibility`
  - `/admin` (Feed Manager, Story Publisher, AI Prompt Control, System Logs)

## Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Sync SQLite Database & Seed Initial Feeds & Stories
npm run db:push
npm run db:seed

# 3. Start Development Server
npm run dev

# 4. Build for Production
npm run build
npm start
```
