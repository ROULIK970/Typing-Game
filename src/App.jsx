import React, { useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleChange, startGame, endGame } from "./redux/index.js";
import "./scss/main.css";

function App() {


  const textBoxRef = useRef(null); 
  const dispatch = useDispatch();
  const { text, isTimeRunning, wordCount, timeRemaining } = useSelector(
    (state) => state
  );
  


  const handleInputChange = () => {
    dispatch(handleChange());
  };

  const handleStartGame = () => {
    dispatch(startGame());
    textBoxRef.current.disabled = false;
    textBoxRef.current.focus();
  };

  const handleEndGame = () => {
    dispatch(endGame());
  };

  

  

  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        dispatch({type: 'DECREMENT_TIME'});
      }, 1000);
    } else if (timeRemaining === 0) {
      handleEndGame();
    }
  }, [timeRemaining, isTimeRunning]);

  return (
    <div className="app">
      <h1>How fast can you type?</h1>
      <textarea
        className="app-text"
        ref={textBoxRef}
        onChange={handleInputChange}
        value={text}
        disabled={!isTimeRunning}
      />
      <h4>Time Remaining: {timeRemaining}</h4>
      <button
        className="app-start"
        onClick={handleStartGame}
        disabled={isTimeRunning}
      >
        START
      </button>
      <h1>Word Count {wordCount}</h1>
    </div>
  );
}

export default App;
