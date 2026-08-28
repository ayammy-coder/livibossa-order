import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const menu = [
  { id: 1, name: 'コーヒー', price: 800 },
  { id: 2, name: 'ワイン', price: 1200 },
  { id: 3, name: 'ケーキ', price: 600 },
  { id: 4, name: 'パスタ', price: 1800 },
  { id: 5, name: 'サラダ', price: 1500 },
];

export default function OrderPage() {
  const router = useRouter();
  const [seat, setSeat] = useState('');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (router.isReady) {
      setSeat(router.query.seat || '1');
    }
  }, [router.isReady, router.query.seat]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        seat,
        items: cart,
        total,
        timestamp: new Date(),
      }),
    });

    alert('注文を送信しました！');
    setCart([]);
  };

  return (
    <div style={{
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'Arial',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
    }}>
      <h1>座席 {seat}</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <h2>メニュー</h2>
          {menu.map((item) => (
            <div
              key={item.id}
              onClick={() => addToCart(item)}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '10px',
                cursor: 'pointer',
                backgroundColor: '#fff',
              }}
            >
              <strong>{item.name}</strong><br />
              ¥{item.price.toLocaleString()}
            </div>
          ))}
        </div>

        <div style={{
          border: '2px solid #333',
          borderRadius: '8px',
          padding: '15px',
          backgroundColor: '#fff',
        }}>
          <h2>注文内容</h2>
          {cart.length === 0 ? (
            <p style={{ color: '#999' }}>メニューをタップして追加</p>
          ) : (
            <>
              {cart.map((item, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  borderBottom: '1px solid #eee',
                }}>
                  <span>{item.name}</span>
                  <button onClick={() => removeFromCart(idx)} style={{
                    padding: '4px 8px',
                    backgroundColor: '#ddd',
                    border: 'none',
                    cursor: 'pointer',
                  }}>削除</button>
                </div>
              ))}
              <div style={{
                marginTop: '15px',
                paddingTop: '15px',
                borderTop: '2px solid #333',
                fontSize: '18px',
                fontWeight: 'bold',
              }}>
                合計: ¥{total.toLocaleString()}
