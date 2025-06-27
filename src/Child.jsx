import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement,reset } from "./redux/reduxtoolkit/slices/countSlice"; // ✅ correct path

function Child() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
       <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
}

export default Child;