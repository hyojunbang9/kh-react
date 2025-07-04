import { useState, useRef } from "react";

function Register() {
  //값을 입력해서 화면에 보여야 하는 곳은 useState
  //값이 계속 유지 돼야 하는 곳도 useState
  //값이 변동 될 경우 화면이 랜더링 돼야 하는 곳도 useState
  const [input, setInput] = useState({
    name: "",
    birth: "",
    country: "",
    bio: "",
  });
  //상태 값 => 값을 잃어버리지 않는다.(리랜더링 xx), 객체 참조
  const countRef = useRef(0); // const countRef = {current:0}
  const nameRef = useRef(); // const countRef = {current: undefined}

  //input 변경 이벤트 핸들러
  const onChangeInput = (e) => {
    countRef.current++;
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  //submit 클릭 이벤트 핸들러
  const onSubmit = (e) => {
    if (nameRef.current.value === "") {
      alert("이름을 입력해주세요.");
      nameRef.current.focus();
    } else {
      alert("자료 전송 완료");
    }
  };

  return (
    <div>
      <h3>이벤트 발생 횟수{countRef.current}</h3>
      <div>
        <input
          ref={nameRef}
          value={input.name}
          name={"name"}
          onChange={onChangeInput}
          placeholder={"이름"}
        />
      </div>

      <div>
        <input
          value={input.birth}
          name={"birth"}
          onChange={onChangeInput}
          type="date"
        />
      </div>
      <div>
        <select value={input.country} name="country" onChange={onChangeInput}>
          <option value=""></option>
          <option value="kr">한국</option>
          <option value="us">미국</option>
          <option value="uk">영국</option>
        </select>
        {input.country}
      </div>
      <div>
        <textarea
          value={input.bio}
          name="bio"
          onChange={onChangeInput}
          placeholder="어떤 인생을 살아오셨나요?"
        />
      </div>

      <div>
        <button onClick={onSubmit}>서버로 전송</button>
      </div>
    </div>
  );
}
export default Register;
