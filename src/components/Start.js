import React from "react";
import waldoImage from "../assets/char-waldo.jpg";
import odlawImage from "../assets/char-odlaw.jpg";
import wendaImage from "../assets/char-wenda.jpg";
import wizardImage from "../assets/char-wizard.jpg";
import woofImage from "../assets/char-woof.jpg";
import styles from "./styles/Start.module.css";
const Start = ({ setPage }) => {
  return (
    <div className={styles.startContainer}>
      <h1>Where's Waldo</h1>
      <span>Characters to find:</span>
      <div className={styles.characters}>
        <div className={styles.character}>
          <img src={waldoImage} alt={"waldo"} className={styles.image}></img>
          <span className={styles.charName}>Waldo</span>
        </div>
        <div className={styles.character}>
          <img src={odlawImage} alt={"odlaw"} className={styles.image}></img>
          <span className={styles.charName}>Odlaw</span>
        </div>
        <div className={styles.character}>
          <img src={wendaImage} alt={"wenda"} className={styles.image}></img>
          <span className={styles.charName}>Wenda</span>
        </div>
        <div className={styles.character}>
          <img src={wizardImage} alt={"wizard"} className={styles.image}></img>
          <span className={styles.charName}>Wizard</span>
        </div>
        <div className={styles.character}>
          <img src={woofImage} alt={"woof"} className={styles.image}></img>
          <span className={styles.charName}>Woof</span>
        </div>
      </div>
      <button
        className={`btn btn-primary ${styles.startBtn}`}
        onClick={() => setPage("image")}
      >
        Start
      </button>
    </div>
  );
};

export default Start;
