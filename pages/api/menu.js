export default async function handler(req, res) {
  const token = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID;

  try {
    const response = await fetch('https://connect.squareup.com/v2/catalog/list', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Square-Version': '2024-01-18'
      }
    });

    const data = await response.json();
    
    // ITEMタイプのみを抽出
    const items = data.objects
      .filter(obj => obj.type === 'ITEM' && obj.item_data)
      .map(obj => ({
        id: obj.id,
        name: obj.item_data.name,
        price: obj.item_data.variations[0]?.item_variation_data?.price_money?.amount / 100 || 0,
      }));

    res.status(200).json(items);
  } catch (error) {
    console.error('Square API Error:', error);
    res.status(500).json({ error: error.message });
  }
}
