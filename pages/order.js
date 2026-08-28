import { useEffect, useState } from 'react';

export default function OrderPage() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [seat, setSeat] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSeat(params.get('seat') || '1');

    fetch('/api/menu')
      .then(res => res.json())
      .then(data => setMenu(data))
      .catch(err => console.log('メニュー取得失敗:', err));
  }, []);

  const addToCart = (item) => {
    setCart([...cart, {
      id: item.id,
      name: item.item_data.name,
      price: item.item_data.variations[0]?.item_variation_data?.price_money?.amount / 100 || 0
    }]);
  };

  const submitOrder = async () => {
    if (cart.length === 0) {
      alert('メニューを選択してください');
      return;
    }

    await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seat, items: cart })
    });
    alert('注文完了しました！');
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>座席 {seat}</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 250px', gap: '20px' }}>
        <div>
          <h3>メニュー</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {menu.length === 0 ? (
              <p>メニュー読み込み中...</p>
            ) : (
              menu.map(item => (
                <div
                  key={item.id}
                  onClick={() => addToCart(item)}
                  style={{
                    border: '1px solid #ddd',
                    padding: '10px',
                    cursor: 'pointer',
                    borderRadius: '5px',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#f9f9f9'}
                  onMouseLeave={(e) => e.target.style.background = 'white'}
                >
                  <strong>{item.item_data.name}</strong>
                  <br />
                  ¥{item.item_data.variations[0]?.item_variation_data?.price_money?.amount / 100 || 0}
                </div>
              ))
            )}
          </div>
        </div>

        <div style={{ border: '2px solid #333', padding: '15px', borderRadius: '5px', height: 'fit-content' }}>
          <h3 style={{ marginTop: 0 }}>注文内容</h3>
          <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '10px' }}>
            {cart.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '8px', paddingBottom: '8px', borderBottom: '1px solid #eee' }}>
                <div>{item.name}</div>
                <div style={{ fontSize: '14px', color: '#666' }}>¥{item.price}</div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '2px solid #333', paddingTop: '10px', marginBottom: '10px' }}>
            <strong>合計: ¥{total}</strong>
          </div>
          <button
            onClick={submitOrder}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#333',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              borderRadius: '5px',
              fontWeight: 'bold'
            }}
          >
            注文確定
          </button>
        </div>
      </div>
    </div>
  );
}
