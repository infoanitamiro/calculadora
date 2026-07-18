module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const {
    palabra, tamano, colores, cantidad, precio, notas,
    direccion, numero, piso, localidad, ciudad, provincia, codigoPostal,
    telefono
  } = req.body;

  const storeId = '3574246';
  const token = process.env.TIENDANUBE_ACCESS_TOKEN;
  const VARIANTS = {
    '12cm': 1514494601,
    '8cm': 1382196474
  };
  const variantId = VARIANTS[tamano] || 1514494601;

  try {
    const orderBody = {
      contact_email: 'infoanitamiro@gmail.com',
      contact_name: 'Cliente',
      contact_lastname: 'Simulador',
      products: [{
        variant_id: variantId,
        quantity: cantidad,
        price: precio
      }],
      note: `Palabra: ${palabra} | Tamaño: ${tamano} | Colores: ${colores}${notas ? ' | Notas: ' + notas : ''}`
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
