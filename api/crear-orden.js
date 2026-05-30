module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://infoanitamiro.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { palabra, tamano, colores, cantidad, precio, notas } = req.body;

  const storeId = '3574246';
  const token = '00585bcfd8cbc6db471d006d72a1ac8c30b6c96d';

  const VARIANTS = {
    '12cm': 1514494601,
    '8cm':  1382196474
  };
  const variantId = VARIANTS[tamano] || 1514494601;

  try {
    const response = await fetch(`https://api.tiendanube.com/v1/${storeId}/draft_orders`, {
      method: 'POST',
      headers: {
        'Authentication': `bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'AnitaMiroCeramics (infoanitamiro@gmail.com)'
      },
      body: JSON.stringify({
        products: [{
          variant_id: variantId,
          quantity: cantidad,
          price: precio
        }],
        note: `Palabra: ${palabra} | Tamaño: ${tamano} | Colores: ${colores}${notas ? ' | Notas: ' + notas : ''}`
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error Tiendanube:', data);
      return res.status(500).json({ error: 'Error al crear la orden', detalle: data });
    }

    return res.status(200).json({ checkoutUrl: data.abandoned_checkout_url });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
