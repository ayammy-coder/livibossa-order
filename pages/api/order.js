export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { seat, items } = req.body;

  console.log(`座席 ${seat} からの注文:`, items);

  // 後でGoogle Sheetsに連携
  // 今は成功を返すだけ

  res.status(200).json({ 
    success: true, 
    message: '注文を受け付けました' 
  });
}
