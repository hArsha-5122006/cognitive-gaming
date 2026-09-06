function Footer() {
  return (
    <footer style={{
      background: 'rgba(255,255,255,0.5)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      borderTop: '1px solid rgba(255,255,255,0.3)',
      padding: '20px 32px',
      textAlign: 'center',
      color: '#7a928a',
      fontSize: '0.85rem',
    }}>
      <p style={{ margin: 0 }}>© 2024 MindPlay. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
