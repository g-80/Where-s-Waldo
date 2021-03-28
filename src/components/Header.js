import React from "react";
import { formatTime } from "../utils/formatTime";
import styles from "./styles/Header.module.css";
const Header = ({ remainingChars, time }) => {
  return (
    <header className={styles.header}>
      <div>Where's Waldo</div>
      <div className={styles.time}>{`Time: ${formatTime(time)}`}</div>
      <div>Characters remaining to be found: {remainingChars.length}</div>
    </header>
  );
};

export default Header;
