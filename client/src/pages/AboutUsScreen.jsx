import React from 'react';
import { Icon } from '@iconify-icon/react';  // Make sure this import is correct

function AboutUsScreen() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About Us</h1>
      <p style={styles.text}>
        Hi! I'm Sid, a second-year B.Tech student at JECRC University, pursuing Software Product Engineering under the Kalvium program.
        I’m passionate about coding, competitive programming, and creating innovative software solutions. Currently, I’m working on a
        chat messaging app called 'Gupt,' which is designed for privacy-focused communication, especially for investigative journalists.
      </p>
      <p style={styles.text}>
        My tech stack includes Node.js, Express, MongoDB, React, C++, and I'm actively learning more about system design and protocols
        like Matrix. I also participate in competitive programming and enjoy building efficient solutions to complex problems.
      </p>
      <p style={styles.text}>
        Feel free to check out my projects and connect with me on GitHub!
      </p>

      <div style={styles.iconContainer}>
        <a 
          href="https://github.com/Sid-Miram" 
          target="_blank" 
          rel="noopener noreferrer" 
          style={styles.iconLink}
        >
          <Icon icon="skill-icons:github-light" style={{ fontSize: '3rem', color: '#000' }} />
        </a>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    maxWidth: '800px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '1.5rem',
    color: 'skyblue',
  },
  text: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    color: 'white',
    lineHeight: '1.6',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2rem',
  },
  iconLink: {
    textDecoration: 'none',
  },
};

export default AboutUsScreen;
