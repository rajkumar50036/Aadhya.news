import { EventEmitter } from 'events';

// Global EventEmitter for real-time news updates & live events
class NewsEventEmitter extends EventEmitter {}

const globalForEvents = globalThis as unknown as {
  newsEvents: NewsEventEmitter | undefined;
};

export const newsEvents = globalForEvents.newsEvents ?? new NewsEventEmitter();
if (process.env.NODE_ENV !== 'production') globalForEvents.newsEvents = newsEvents;

// Event names
export const EVENT_TYPES = {
  STORY_PUBLISHED: 'story:published',
  LIVE_UPDATE_ADDED: 'story:live_update',
  BREAKING_ALERT: 'news:breaking',
  FEED_INGESTED: 'feed:ingested',
  LOG_ADDED: 'system:log',
} as const;

export interface RealtimeEventPayload {
  type: string;
  data: any;
  timestamp: string;
}

export function broadcastEvent(type: string, data: any) {
  const payload: RealtimeEventPayload = {
    type,
    data,
    timestamp: new Date().toISOString(),
  };
  newsEvents.emit('event', payload);
  return payload;
}
