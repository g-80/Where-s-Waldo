import React, { useEffect, useState } from "react";
import { firestore } from "../firebase/config";
import { formatTime } from "../utils/formatTime";
import styles from "./styles/Leaderboard.module.css";
const Leaderboard = () => {
  const [submissions, setSubmissions] = useState([]);

  const getLeaderboard = () => {
    return firestore.collection("leaderboard").orderBy("time").limit(10).get();
  };

  useEffect(() => {
    let isMounted = true;
    getLeaderboard().then((querySnapshot) => {
      if (isMounted) {
        querySnapshot.forEach((doc) => {
          setSubmissions((prev) => [
            ...prev,
            <div
              className={styles.submission}
              key={`${doc.get("name")}-${doc.get("time")}`}
            >
              <span>{doc.get("name")}</span>
              <span>{formatTime(doc.get("time"))}</span>
            </div>,
          ]);
        });
      }
    });
    return () => (isMounted = false);
  }, []);

  return (
    <div className={styles.container}>
      <h2>Leaderboard</h2>
      {submissions}
    </div>
  );
};

export default Leaderboard;
