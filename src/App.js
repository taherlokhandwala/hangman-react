import React, { useState, useEffect } from "react";
import "./App.css";
import { Header, Figure, Wrong, Word, Popup, Notification } from "./components";

const words = ["application", "programming", "interface", "wizard"];
let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  const notify = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  const playAgain = () => {
    setPlayable(true);
    setCorrectLetters([]);
    setWrongLetters([]);
    selectedWord = words[Math.floor(Math.random() * words.length)];
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((curr) => [...curr, letter]);
          } else {
            notify();
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((curr) => [...curr, letter]);
          } else {
            notify();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
    //eslint-disable-next-line
  }, [correctLetters, wrongLetters, playable]);

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <Wrong wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default App;
