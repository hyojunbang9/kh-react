import { useState, useEffect } from "react";
import "./Register.css";

const Register = ({ onInsert, onUpdate, editingUser }) => {
  const [input, setInput] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
  });

  useEffect(() => {
    if (editingUser) {
      setInput(editingUser);
    } else {
      setInput({ name: "", age: "", gender: "", phone: "" });
    }
  }, [editingUser]);

  const changeUser = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (editingUser) {
      onUpdate(input);
    } else {
      onInsert(input);
    }
    setInput({ name: "", age: "", gender: "", phone: "" });
  };

  return (
    <div className="regist-wrap">
      <h3>{editingUser ? "회원 정보 수정" : "회원 정보 등록"}</h3>
      <hr />
      <div className="input_wrap">
        <label>이름</label>
        <input
          type="text"
          name="name"
          value={input.name}
          onChange={changeUser}
        />
        <label>나이</label>
        <input type="text" name="age" value={input.age} onChange={changeUser} />
        <label>성별</label>
        <input
          type="text"
          name="gender"
          value={input.gender}
          onChange={changeUser}
        />
        <label>전화번호</label>
        <input
          type="text"
          name="phone"
          value={input.phone}
          onChange={changeUser}
        />
      </div>
      <button onClick={handleSubmit}>
        {editingUser ? "회원수정" : "회원등록"}
      </button>
    </div>
  );
};

export default Register;
