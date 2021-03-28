import React, { useState, useEffect, useRef } from "react";
import Start from "./components/Start";
import Image from "./components/Image";
import Header from "./components/Header";
import SubmitTime from "./components/SubmitTime";
import Leaderboard from "./components/Leaderboard";
import "./App.css";

function App() {
  const [page, setPage] = useState("image");

  const characters = ["waldo", "odlaw", "wizard", "wenda", "woof"];
  const [remainingChars, setRemainingChars] = useState(characters);
  if (remainingChars.length === 0) {
    // set timeout to create a small pause to prevent react from crashing
    // when state is changed too many times
    setTimeout(() => setPage("submit-time"), 1200);
  }
  const [time, setTime] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    if (page === "image") {
      intervalRef.current = setInterval(() => setTime(time + 1), 1000);
      return () => clearInterval(intervalRef.current);
    }
  }, [page, time]);

  return (
    <div className="App">
      {page === "start" && <Start setPage={setPage} />}
      {page === "image" && (
        <>
          <Header remainingChars={remainingChars} time={time} />
          <Image
            remainingChars={remainingChars}
            setRemainingChars={setRemainingChars}
            setPage={setPage}
          />
        </>
      )}
      {page === "submit-time" && <SubmitTime time={time} setPage={setPage} />}
      {page === "leaderboard" && <Leaderboard setPage={setPage} />}
    </div>
  );
}

export default App;
