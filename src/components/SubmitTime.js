import React, { useState } from "react";
import { formatTime } from "../utils/formatTime";
import { firestore } from "../firebase/config";
import styles from "./styles/SubmitTime.module.css";

const SubmitTime = ({ time, setPage }) => {
  const [display, setDisplay] = useState("ask-user");
  const [name, setName] = useState();

  const createAskUser = () => {
    return (
      <>
        <p>
          You took {formatTime(time)} to find all characters. Would you like to
          submit your time?
        </p>
        <div className={styles.btnsContainer}>
          <button
            className="btn btn-primary"
            onClick={() => setDisplay("submit-form")}
          >
            Yes
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setPage("leaderboard")}
          >
            No
          </button>
        </div>
      </>
    );
  };

  const createConfirmation = () => {
    return (
      <>
        <p>Your time was submitted.</p>
        <button
          className="btn btn-primary"
          onClick={() => setPage("leaderboard")}
        >
          OK
        </button>
      </>
    );
  };

  const createError = () => {
    return (
      <>
        <p>There was an error submitting your time.</p>
        <div className={styles.btnsContainer}>
          <button
            className="btn btn-primary"
            style={{ padding: "0.7em" }}
            onClick={handleSubmit}
          >
            Try again
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setPage("leaderboard")}
          >
            Cancel
          </button>
        </div>
      </>
    );
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    firestore
      .collection("leaderboard")
      .add({ name, time })
      .then(() => {
        setDisplay("confirmation");
      })
      .catch(() => {
        setDisplay("error");
      });
  };

  const createSubmitForm = () => {
    return (
      <form className={styles.form}>
        <div className={styles.nameAndTime}>
          <div className={styles.nameField}>
            <label htmlFor="submit-name">Name</label>
            <input
              type="text"
              id="submit-name"
              className={styles.nameInput}
              autoComplete="off"
              onChange={handleNameChange}
            ></input>
          </div>
          <span>{formatTime(time)}</span>
        </div>
        <div className={styles.btnsContainer}>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setDisplay("ask-user")}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  };

  const getComponentToRender = () => {
    switch (display) {
      case "ask-user":
        return createAskUser();
      case "submit-form":
        return createSubmitForm();
      case "confirmation":
        return createConfirmation();
      case "error":
        return createError();
      default:
        return createAskUser();
    }
  };

  return (
    <div className={styles.submitTimeContainer}>{getComponentToRender()}</div>
  );
};

export default SubmitTime;
