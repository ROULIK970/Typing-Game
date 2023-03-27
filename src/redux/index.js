import { createStore} from "redux";

const STARTING_TIME = 5;

const initialState = {
  text: "",
  timeRemaining: STARTING_TIME,
  isTimeRunning: false,
  wordCount: 0,
};

export function handleChange(e) {
  return {
    type: "HANDLE_CHANGE",
    payload: e,
  };
}

function calculateWordCount(text) {
  const wordsArr = text.trim().split(" ");
  const wordCount = wordsArr.filter((word) => word !== "").length;
  return wordCount
}

export function startGame() {
  return {
    type: "START_GAME",
  };
}

export function endGame() {
  return {
    type: "END_GAME",
  };
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "HANDLE_CHANGE":
      return {
        ...state,
        text: action.payload.target.value,
      };

    case "START_GAME":
      return {
        ...state,
        isTimeRunning: true,
        timeRemaining: STARTING_TIME,
        text: "",
      };

    case "END_GAME":
      const { text } = state;
      const totalWords = calculateWordCount(text);
      return {
        ...state,
        isTimeRunning: false,
        wordCount: totalWords,
      };

      case "DECREMENT_TIME":
        return {
          ...state,
          timeRemaining: state.timeRemaining - 1
        };

    default:
      return state;
  }
}

const store = createStore(reducer);
export default store;
