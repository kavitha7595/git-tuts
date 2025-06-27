import { useState } from "react";
import Child from "./Child";

function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Rocky");
  let address = "KGF";

  return (
    <>
      <h1>count {count}</h1>
      <button onClick={() => setCount(count + 1)}>Change Count</button>
      <button onClick={() => setName("Pushpa")}>Change Name</button>

      <Child name={name} address={address} />
    </>
  );
}

export default Parent;