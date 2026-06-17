export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const target = url.searchParams.get('url');
    if (!target) return new Response('Missing ?url=', { status: 400 });

    const res = await fetch(target, {
      headers: { 'User-Agent': 'DeltaV-IntelHub/1.0' }
    });

    return new Response(res.body, {
      status: res.status,
      headers: {
        'Content-Type': res.headers.get('Content-Type') || 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300',
      }
    });
  }
}
