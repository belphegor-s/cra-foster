import React from "react";
import styles from "./App.module.css";
import { star } from "../star";

const App = () => {
  return (
    <>
      <h1 className={styles.heading}>Start Your Project</h1>
      <img src={star.image} alt="star" className={styles.star} />
    </>
  );
};

export default App;
