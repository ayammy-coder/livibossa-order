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

  return (
    <div style={{
      padding: '20px',
      maxWidth: '900px',
      margin: '0 auto',
      fontFamily: 'Arial',
    }}>
      <h1>座席 {seat}</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <h2>📋 メニュー</h2>
          {menu.map((item) => (
            <div
              key={item.id}
              onClick={() => addToCart(item)}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '10px',
                cursor: 'pointer',
                backgroundColor: '#fff',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
            >
              <strong style={{ fontSize: '16px' }}>{item.name}</strong><br />
              <span style={{ color: '#ff6b6b', fontSize: '18px', fontWeight: 'bold' }}>
                ¥{item.price.toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        <div style={{
          border: '3px solid #333',
          borderRadius: '8px',
          padding: '20px',
          backgroundColor: '#f9f9f9',
          height: 'fit-content',
        }}>
          <h2>🛒 注文内容</h2>
          {cart.length === 0 ? (
            <p style={{ color: '#999', fontStyle: 'italic' }}>
              左からメニューを選択して追加
            </p>
          ) : (
            <>
              {cart.map((item, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: '1px solid #ddd',
                }}>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                    <div style={{ color: '#ff6b6b' }}>¥{item.price}</div>
                  </div>
                  <button
                    onClick={() => removeFromCart(idx)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#ddd',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    削除
                  </button>
                </div>
              ))}
              <div style={{
                marginTop: '15px',
                paddingTop: '15px',
                borderTop: '2px solid #333',
                fontSize: '20px',
                fontWeight: 'bold',
              }}>
                合計: ¥{total.toLocaleString()}
              </div>
              <button
                style={{
                  width: '100%',
                  padding: '15px',
                  marginTop: '15px',
                  backgroundColor: '#333',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}
              >
                支払う
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
