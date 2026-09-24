import { newsEvents } from '@/lib/events';

export const dynamic = 'force-dynamic';

export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const sendEvent = (eventData: any) => {
        const payload = `data: ${JSON.stringify(eventData)}\n\n`;
        controller.enqueue(encoder.encode(payload));
      };

      // Initial ping
      sendEvent({ type: 'connected', message: 'Real-time news stream active' });

      // Event listener
      const handler = (data: any) => {
        sendEvent(data);
      };

      newsEvents.on('event', handler);

      // Keepalive interval every 20 seconds
      const keepalive = setInterval(() => {
        sendEvent({ type: 'ping', timestamp: new Date().toISOString() });
      }, 20000);

      // Clean up when client disconnects
      return () => {
        clearInterval(keepalive);
        newsEvents.off('event', handler);
      };
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
