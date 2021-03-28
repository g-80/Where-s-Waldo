import React, { useState } from "react";
import image from "../assets/1.jpg";
import TaggingBox from "./TaggingBox";
import styles from "./styles/Image.module.css";

const Image = ({ remainingChars, setRemainingChars }) => {
  const [toggleBox, setToggleBox] = useState(false);
  const [clickCoords, setClickCoords] = useState({
    x: 0,
    y: 0,
    xRelative: 0,
    yRelative: 0,
  });

  const handleClick = (e) => {
    if (toggleBox) {
      setToggleBox(false);
    } else {
      setToggleBox(true);
      const { pageX: x, pageY: y } = e;
      const xRelative = x / e.target.width;
      const yRelative = y / e.target.height;
      setClickCoords({ x, y, xRelative, yRelative });
    }
  };

  return (
    <div className={styles.mainWrapper}>
      {toggleBox && (
        <TaggingBox
          xPos={clickCoords.x}
          yPos={clickCoords.y}
          xRel={clickCoords.xRelative}
          yRel={clickCoords.yRelative}
          remainingChars={remainingChars}
          setRemainingChars={setRemainingChars}
        />
      )}
      <div className={styles.imageContainer} onClick={handleClick}>
        <img src={image} alt="Find Waldo" className={styles.image}></img>
      </div>
    </div>
  );
};

export default Image;

// to do:
// offsetx and y
// space bottom of image
// update db
// tagging box when bottom no space
