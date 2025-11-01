import { NextResponse } from 'next/server'

// This route simply redirects to the loading page with the OAuth hash.
// The loading page handles the actual token processing and session creation.

export async function GET() {
  const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Auth callback</title>
  </head>
  <body>
    <script>
      window.location.replace('/loading' + window.location.hash);
    </script>
  </body>
</html>`

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
