import "./App.css";
import Viewer from "./components/Viewer";
import Controller from "./components/Controller";
import { useState, useEffect } from "react";
import Even from "./components/Even";

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState(0);

  //마운트 기능(앱 생성 시 자동 실행 기능 : 주로 DB에서 자료를 가져올 떄 활용)
  useEffect(() => {
    console.log(`mount = ${count} input = ${input}`);
  });

  const onClickButton = (value) => {
    setCount(count + value);
  };

  const onChangeInput = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className="App">
      <h1>Simple Counter</h1>
      <section>
        <input
          value={input}
          name={"phone"}
          onChange={onChangeInput}
          type="text"
        />
      </section>
      <section>
        <Viewer count={count} />
        {count % 2 === 0 ? <Even /> : null}
      </section>
      <section>
        <Controller onClickButton={onClickButton} />
      </section>
    </div>
  );
}
export default App;
