import { useState } from "react";

function Header() {
  const [count, setCount] = useState(0);
  const [light, setLight] = useState("OFF");

  return (
    <>
      <div>
        <h1>{light}</h1>
        <button
          style={{ border: "1px solid white" }}
          onClick={() => {
            setLight(light == "ON" ? "OFF" : "ON");
          }}
        >
          {light == "ON" ? "끄기" : "켜기"}
        </button>
      </div>
      <div>
        <h1>{count}</h1>
        <button
          style={{ border: "1px solid white" }}
          onClick={(e) => setCount(count + 1)}
        >
          +
        </button>
      </div>
    </>
  );
}
export default Header;
