// Button.jsx
import React from 'react';
import styles from "../styles/Button.module.css";

const Button = ({name,id}) => {
  return (
    <button className={styles.button} id={id}>
      {name}
    </button>
  );
};

export default Button;
