import { newsEvents } from '@/lib/events';

export const dynamic = 'force-dynamic';

export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const sendEvent = (eventData: any) => {
        try {
          const payload = `data: ${JSON.stringify(eventData)}\n\n`;
          controller.enqueue(encoder.encode(payload));
        } catch (e) {}
      };

      // Initial ping
      sendEvent({ type: 'connected', message: 'Ultra-fast real-time news stream active' });

      // Event listener
      const handler = (data: any) => {
        sendEvent(data);
      };

      newsEvents.on('event', handler);

      // Continuous 1-second ticker heartbeat interval for real-time live clock & stream sync
      const heartbeat = setInterval(() => {
        sendEvent({
          type: 'tick',
          timestamp: new Date().toISOString(),
          timeString: new Date().toLocaleTimeString(),
        });
      }, 1000);

      // Clean up when client disconnects
      return () => {
        clearInterval(heartbeat);
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
