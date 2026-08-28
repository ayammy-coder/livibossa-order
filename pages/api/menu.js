export default async function handler(req, res) {
  const accessToken = process.env.SQUARE_TOKEN;

  if (!accessToken) {
    return res.status(500).json({ error: 'SQUARE_TOKEN not configured' });
  }

  try {
    const response = await fetch('https://connect.squareup.com/v2/catalog/list', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Square-Version': '2024-01-18'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Square API error:', data);
      return res.status(response.status).json({ 
        error: 'Failed to fetch menu',
        details: data 
      });
    }

    const items = (data.objects || []).filter(obj => obj.type === 'ITEM');
    res.status(200).json(items);
  } catch (error) {
    console.error('Menu API error:', error);
    res.status(500).json({ error: error.message });
  }
}
