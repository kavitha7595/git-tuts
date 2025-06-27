import { useDispatch, useSelector } from "react-redux";
import { increment } from "./slices/countSlice";

function Child1() {
  const count = useSelector((store) => store.counter); // ✅ Correct key
  const dispatch = useDispatch();

  return (
    <>
      <h1>Redux Toolkit Child Component</h1>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
    </>
  );
}

export default Child1;
