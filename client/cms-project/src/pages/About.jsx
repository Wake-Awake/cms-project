export default function About(){
    const styles = {
        container: {
          padding: '20px',
          backgroundColor: '#f9f9f9',
          fontFamily: 'Arial, sans-serif',
          maxWidth: '800px',
          margin: '0 auto',
        },
        heading: {
          color: '#333',
          textAlign: 'center',
          fontSize: '2.5rem',
        },
        paragraph: {
          color: '#555',
          fontSize: '1.2rem',
          lineHeight: '1.6',
        },
      };
    
      return (
        <div style={styles.container}>
          <h1 style={styles.heading}>About Us</h1>
          <p style={styles.paragraph}>
            Welcome to our company! We strive to offer top-tier services with a focus on customer satisfaction. Our team is dedicated, experienced, and always here to help.
          </p>
        </div>
      );
}