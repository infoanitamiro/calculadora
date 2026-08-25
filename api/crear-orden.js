module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const {
    palabra, tamano, colores, cantidad, precio, notas,
    formas, // array: [{ shapeId, name, size, color, qty }]
    direccion, numero, piso, localidad, ciudad, provincia, codigoPostal,
    telefono
  } = req.body;

  const storeId = '3574246';
  const token = '972e9259d28d295342039d46fcbe6ec9b172d02d';

  // Letras
  const VARIANTS = {
    '12cm': 1514494601,
    '8cm': 1382196474
  };

  // Formas Bubble: variant_id por forma y tamaño
  const SHAPE_VARIANTS = {
    corazon: { original: 1582879701, mini: 1582881102 },
    nube:    { original: 1582879702, mini: 1582881103 },
    smile:   { original: 1582879704, mini: 1582881104 },
    avion:   { original: 1582879706, mini: 1582881105 },
    banana:  { original: 1582879707, mini: 1582881106 },
    flor:    { original: 1582879709, mini: 1582881107 }
  };
  const SHAPE_PRICES = { original: 39750, mini: 29500 };

  const products = [];

  if (cantidad && cantidad > 0) {
    const variantId = VARIANTS[tamano] || 1514494601;
    products.push({ variant_id: variantId, quantity: cantidad, price: precio });
  }

  const formasList = Array.isArray(formas) ? formas : [];
  formasList.forEach(f => {
    const variantId = SHAPE_VARIANTS[f.shapeId]?.[f.size];
    if (!variantId) return;
    products.push({
      variant_id: variantId,
      quantity: f.qty || 1,
      price: SHAPE_PRICES[f.size]
    });
  });

  if (products.length === 0) {
    return res.status(400).json({ error: 'No hay letras ni formas en el pedido' });
  }

  const formasNote = formasList.length
    ? ' | Formas: ' + formasList.map(f => `${f.name}(${f.size === 'original' ? '12cm' : '8cm'}/${f.color})`).join(', ')
    : '';

  try {
    const orderBody = {
      contact_email: 'infoanitamiro@gmail.com',
      contact_name: 'Cliente',
      contact_lastname: 'Simulador',
      products,
      note: `${cantidad > 0 ? `Palabra: ${palabra} | Tamaño: ${tamano} | Colores: ${colores}` : 'Pedido de formas'}${formasNote}${notas ? ' | Notas: ' + notas : ''}`
    };

    if (telefono) {
      orderBody.contact_phone = telefono;
    }

    if (direccion || codigoPostal) {
      orderBody.shipping = {
        shipping_address: {
          address: direccion || '',
          number: numero || '',
          floor: piso || '',
          locality: localidad || '',
          city: ciudad || '',
          province: provincia || '',
          zipcode: codigoPostal || ''
        }
      };
    }

    console.log('ENVIANDO A TIENDANUBE:', JSON.stringify(orderBody.shipping));

    const response = await fetch(`https://api.tiendanube.com/v1/${storeId}/draft_orders`, {
      method: 'POST',
      headers: {
        'Authentication': `bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'AnitaMiroCeramics (infoanitamiro@gmail.com)'
      },
      body: JSON.stringify(orderBody)
    });

    const data = await response.json();

    console.log('RESPUESTA TIENDANUBE - shipping fields:', JSON.stringify({
      shipping_address: data.shipping_address,
      shipping_city: data.shipping_city,
      shipping_province: data.shipping_province,
      shipping_zipcode: data.shipping_zipcode,
      shipping_option: data.shipping_option,
      shipping_option_code: data.shipping_option_code
    }));

    if (!response.ok) {
      console.error('Error Tiendanube:', data);
      return res.status(500).json({ error: 'Error al crear la orden', detalle: data });
    }
    return res.status(200).json({ checkoutUrl: data.abandoned_checkout_url });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
