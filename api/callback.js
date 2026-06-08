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
    
    // Redirigir al admin de partners después de la instalación
    return res.redirect(302, 'https://partners.tiendanube.com');
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
