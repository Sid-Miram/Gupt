import React from 'react';
import NavBar from "../components/NavBar.jsx"

function DocsScreen() {
  return (
    <>
    <NavBar/>
    <div style={styles.container}>
      <h1 style={styles.heading}>Gupt (Chat Messaging App)</h1>
      <p style={styles.text}>
        The plan is to create a messaging app/website/client based on privacy and secure one-on-one communication.
        It's specially designed for investigative journalists or anyone who cares about their privacy.
      </p>

      <h2 style={styles.subheading}>Protocol Used</h2>
      <p style={styles.text}>
        I would be using the Matrix open-source protocol to do that. It's similar to WhatsApp, Discord, and Telegram but also open-source and decentralized.
      </p>

      <h2 style={styles.subheading}>Top Notch Features that would be implemented in the client:</h2>
      <ul style={styles.list}>
        <li>Able to play music synchronously while chatting with another user via Spotify or local library.</li>
        <li>For a particular user, different passwords can be applied for different chats, which are hidden if the password isn't provided.</li>
        <li>Adding SecureDrop for better secure file transfer (under consideration).</li>
        <li>Integrating VirusTotal for checking malicious links, once allowed by the user.</li>
        <li>Dark and Light Modes.</li>
      </ul>

      <h2 style={styles.subheading}>Features by Matrix</h2>
      <ul style={styles.list}>
        <li>
          On first registration, a GPG key is provided. If the app is uninstalled or you log in from another device, you’ll be asked for the GPG key. If not provided, all prior messages will remain encrypted.
        </li>
        <li>Interoperability (More on this later).</li>
        <li>Decentralization.</li>
        <li>Multiple clients to choose from.</li>
      </ul>

      <h2 style={styles.subheading}>Working</h2>

      <h3 style={styles.subSubheading}>1. Decentralization</h3>
      <p style={styles.text}>
        Matrix is decentralized, meaning there is no central authority controlling the network. Anyone can host their own server and have full control over their data.
      </p>
      <ul style={styles.list}>
        <li>Makes it harder for governments or entities to monitor and censor communication.</li>
        <li>Users have more control over their data. You can choose a client and server to keep your data encrypted securely.</li>
        <li>If you don't trust any server, you can host your own.</li>
        <li>Matrix can be more resilient than centralized networks like Instagram, as it continues functioning even if some servers go offline.</li>
      </ul>

      <h3 style={styles.subSubheading}>2. Interoperability</h3>
      <p style={styles.text}>
        Matrix allows interoperability, meaning it can exchange data and messages with other platforms using an Open Standard. This is called "Bridging."
      </p>

      <h2 style={styles.subheading}>My Client</h2>
      <p style={styles.text}>
        My chat app will be a web-based application or PWA, enabling users to chat directly from their browsers.
      </p>
      <p style={styles.text}>
        On opening the website, there will be a landing page with information about the Matrix protocol and features my client offers, along with a button prominently displayed to redirect users to the React chat app. Reviews by real people (to demonstrate my CRUD operations skills) will be at the bottom.
      </p>
      <p style={styles.text}>
        Inspiration drawn from:
      </p>
      0<ul style={styles.list}>
        <li><a href="https://cinny.in/" target="_blank" rel="noopener noreferrer">Cinny</a></li>
        <li><a href="https://element.io/" target="_blank" rel="noopener noreferrer">Element</a></li>
      </ul>
      <p style={styles.text}>
        The app will offer a better UI/UX experience tailored for regular users, with all the features mentioned above.
      </p>
    </div>
    </>
  );
}

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    lineHeight: '1.6',
    maxWidth: '800px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '1.5rem',
    color: 'azure',
  },
  subheading: {
    fontSize: '2rem',
    marginTop: '2rem',
    marginBottom: '1rem',
    color: 'skyblue',
  },
  subSubheading: {
    fontSize: '1.5rem',
    marginTop: '1.5rem',
    marginBottom: '1rem',
    color: 'red',
  },
  text: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    color: 'whitesmoke',
  },
  list: {
    fontSize: '1.2rem',
    marginLeft: '1.5rem',
    marginBottom: '1rem',
    color: 'whiteSmoke',
  }
};

export default DocsScreen;
