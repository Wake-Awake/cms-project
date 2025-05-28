
export default function About() {
  const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#f9f9f9',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
    },
    heading: {
      color: '#333',
      fontSize: '2.5rem',
      marginBottom: '20px',
    },
    paragraph: {
      color: '#555',
      fontSize: '1.2rem',
      lineHeight: '1.6',
      marginBottom: '20px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007BFF',
      color: '#fff',
      fontSize: '1rem',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    section: {
      maxWidth: '900px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
  };

  // Handle button hover effect
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div style={styles.container}>
      <section style={styles.section}>
        <h1 style={styles.heading}>About Us</h1>
        <p style={styles.paragraph}>
          Welcome to our company! We strive to offer top-tier services with a
          focus on customer satisfaction. Our team is dedicated, experienced, and
          always here to help.
        </p>
        <p style={styles.paragraph}>
          With years of experience in the industry, we have built strong
          relationships with our clients by offering exceptional services tailored
          to their needs.
        </p>

        <button
          style={{
            ...styles.button,
            ...(isHovered ? styles.buttonHover : {}),
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Get in Touch
        </button>
      </section>
    </div>
  );
}