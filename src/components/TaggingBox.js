import React, { useState } from "react";
import { firestore } from "../firebase/config";
import styles from "./styles/TaggingBox.module.css";

const TaggingBox = ({
  xPos,
  yPos,
  xRel,
  yRel,
  remainingChars,
  setRemainingChars,
}) => {
  const [message, setMessage] = useState(undefined);

  const capitalise = (string) => {
    return `${string[0].toUpperCase()}${string.substring(1)}`;
  };

  const getCharacterCoords = async (character) => {
    const docRef = await firestore
      .collection("characters")
      .doc(character)
      .get();
    const xStart = docRef.get("xStart");
    const xEnd = docRef.get("xEnd");
    const yStart = docRef.get("yStart");
    const yEnd = docRef.get("yEnd");
    return { xStart, xEnd, yStart, yEnd };
  };

  const handleClick = async (character) => {
    const { xStart, xEnd, yStart, yEnd } = await getCharacterCoords(character);
    const xContainChar = xStart <= xRel && xRel <= xEnd;
    const yContainChar = yStart <= yRel && yRel <= yEnd;
    if (xContainChar && yContainChar) {
      setMessage(`You found ${character}`);
      setRemainingChars((prev) => {
        const updatedArray = prev.filter(
          (characterInState) => characterInState !== character
        );
        return updatedArray;
      });
    } else {
      setMessage("Keep looking...");
    }
  };

  return (
    <div
      className={styles.container}
      style={{
        top: `calc(${yPos}px - 2.3rem)`,
        left: `calc(${xPos}px - 2.3rem)`,
      }}
    >
      {message && <span className={styles.message}>{message}</span>}
      <div className={styles.taggingbox}></div>
      <ul className={styles.charsList}>
        {remainingChars.map((character) => {
          return (
            <li
              className={styles.char}
              key={`${character}-char`}
              onClick={() => handleClick(character)}
            >
              {capitalise(character)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TaggingBox;
