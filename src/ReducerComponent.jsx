

import { useReducer } from "react";

// Reducer function (custom state updation function)
const countReducer = (state, action) => {
  if (action.type === "inc") {
    return state + 1;
  } else if (action.type === "dec") {
    return state - 1;
  } else {
    return state;
  }
};

function ReducerComponent() {
  // Declaration of useReducer
  const [count, countDispatch] = useReducer(countReducer, 100);

  return (
    <>
      <h1>Managing State using useReducer() hook</h1>
      <h2>Count: {count}</h2>

      <button onClick={() => countDispatch({ type: "inc" })}>
        Increment
      </button>

      <button onClick={() => countDispatch({ type: "dec" })}>
        Decrement
      </button>
    </>
  );
}

export default ReducerComponent;


