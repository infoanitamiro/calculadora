export default async function handler(req, res) {
  // Preflight CORS
  res.setHeader('Access-Control-Allow-Origin', 'https://infoanitamiro.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { palabra, tamano, colores, cantidad, precio, notas } = req.body;

  const storeId = process.env.TIENDANUBE_STORE_ID;
  const token = process.env.TIENDANUBE_ACCESS_TOKEN;

  // Elegir variant_id según tamaño
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
        'Content-Typ

