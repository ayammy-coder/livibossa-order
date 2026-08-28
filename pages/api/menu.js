export default async function handler(req, res) {
  const token = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID;

  console.log('Token exists:', !!token);
  console.log('Location ID exists:', !!locationId);

  if (!token || !locationId) {
    return res.status(500).json({ 
      error: '環境変数が設定されていません',
      hasToken: !!token,
      hasLocationId: !!locationId
    });
  }

  try {
    const response = await fetch('https://connect.squareup.com/v2/catalog/list', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Square-Version': '2024-01-18'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: 'Square API Error',
        details: data
      });
    }

    if (!data.objects) {
      return res.status(200).json([]);
    }

    const items = data.objects
      .filter(obj => obj.type === 'ITEM' && obj.item_data)
      .map(obj => ({
        id: obj.id,
        name: obj.item_data.name,
        price: obj.item_data.variations?.[0]?.item_variation_data?.price_money?.amount / 100 || 0,
      }));

    res.status(200).json(items);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: error.message });
  }
}
