import { useState } from "react";

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

  const onChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div>
        <input
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
    </div>
  );
}
export default Register;
