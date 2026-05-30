bash

cat << 'EOF'
export default async function handler(req, res) {
  // Solo aceptar POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // Permitir CORS desde GitHub Pages
  res.setHeader('Access-Control-Allow-Origin', 'https://infoanitamiro.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { palabra, tamano, colores, cantidad, precio, notas } = req.body;

  const storeId = process.env.TIENDANUBE_STORE_ID;
  const token = process.env.TIENDANUBE_ACCESS_TOKEN;

  try {
    const response = await fetch(`https://api.tiendanube.com/v1/${storeId}/draft_orders`, {
      method: 'POST',
      headers: {
        'Authentication': `bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'AnitaMiroCeramics (anitamiroceramics@gmail.com)'
      },
      body: JSON.stringify({
        products: [{
          variant_id: process.env.TIENDANUBE_VARIANT_ID,
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
EOF
Salida

export default async function handler(req, res) {
  // Solo aceptar POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // Permitir CORS desde GitHub Pages
  res.setHeader('Access-Control-Allow-Origin', 'https://infoanitamiro.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { palabra, tamano, colores, cantidad, precio, notas } = req.body;

  const storeId = process.env.TIENDANUBE_STORE_ID;
  const token = process.env.TIENDANUBE_ACCESS_TOKEN;

  try {
    const response = await fetch(`https://api.tiendanube.com/v1/${storeId}/draft_orders`, {
      method: 'POST',
      headers: {
        'Authentication': `bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'AnitaMiroCeramics (anitamiroceramics@gmail.com)'
      },
      body: JSON.stringify({
        products: [{
          variant_id: process.env.TIENDANUBE_VARIANT_ID,
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
Listo
Copiá todo ese código y pegalo en el editor de GitHub. Después abajo escribí como mensaje "Agrego backend Tiendanube" y hacé clic en "Commit changes".

¿Listo?


