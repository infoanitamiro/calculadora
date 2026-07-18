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
