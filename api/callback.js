export default async function handler(req, res) {
  try {
    const response = await fetch('https://www.tiendanube.com/apps/authorize/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.TIENDANUBE_CLIENT_ID,
        client_secret: process.env.TIENDANUBE_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: req.query.code || ''
      })
    });
    const data = await response.json();
    // Mostrar el token en pantalla
    return res.status(200).send(`
      <h1>Token obtenido</h1>
      <p><strong>access_token:</strong> ${data.access_token}</p>
      <p><strong>user_id:</strong> ${data.user_id}</p>
    `);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
