export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('No llegó ningún código');
  }

  try {
    const response = await fetch('https://www.tiendanube.com/apps/authorize/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.TIENDANUBE_CLIENT_ID,
        client_secret: process.env.TIENDANUBE_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code
      })
    });

    const data = await response.json();

    if (data.access_token) {
      return res.status(200).send(`
        <h2>✅ ¡Autorización exitosa!</h2>
        <p>Guardá este access
