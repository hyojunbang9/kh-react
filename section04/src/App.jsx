import { useState } from "react";
import Bulb from "./compnents/Bulb";
import BulbButton from "./compnents/BulbButton";
import Count from "./compnents/Count";
import CountButton from "./compnents/CountButton";

//Bulb component(전구)

export default function App() {
  //상태 값
  const [light, setLight] = useState("OFF");
  //이벤트 핸들러
  const lightClickBtn = () => {
    setLight(light === "ON" ? "OFF" : "ON");
  };

  //상태 값
  const [count, setCount] = useState(0);
  //이벤ß트 핸들러
  const countClickBtn = () => {
    setCount(count + 1);
  };
  return (
    <>
      <div>
        {/* Bulb 컴포넌트에 매생 상태값 light 전달 객체 생성 */}
        <Bulb light={light} />
        <BulbButton light={light} lightClickBtn={lightClickBtn} />
        <Count count={count} />
        <CountButton countClickBtn={countClickBtn} />
      </div>
    </>
  );
}
//npm run dev
