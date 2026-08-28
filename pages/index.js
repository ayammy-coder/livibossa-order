export default function Home() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>🎉 LiviBossa 座席QR注文</h1>
      <p style={{ fontSize: '18px', color: '#666' }}>システムが正常に動作しています</p>
      <br />
      <a href="/order?seat=1" style={{
        display: 'inline-block',
        padding: '15px 30px',
        backgroundColor: '#333',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '8px',
        fontSize: '16px'
      }}>
        座席1で注文する
      </a>
    </div>
  );
}
