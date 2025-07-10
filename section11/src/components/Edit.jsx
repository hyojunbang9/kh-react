import "./Edit.css";
import { useState, useRef, useContext } from "react";
import { ListDispatchContext } from "../App";

const Edit = () => {
  const { onInsert } = useContext(ListDispatchContext);
  const [content, setContent] = useState("");
  const inputRef = useRef();

  const onChangeInput = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = () => {
    if (content === "") {
      window.alert("값 지정 해주세용");
      inputRef.current.focus();
      return;
    }
    onInsert(content);
    setContent("");
  };

  const onKeyDown = (e) => {
    //e.keyCode === 13 엔터
    if (e.keyCode === 13) {
      if (content === "") {
        window.alert("값 지정 해주세용");
        inputRef.current.focus();
        return;
      }
      onSubmit();
    }
  };

  return (
    <div className="Edit">
      <input
        ref={inputRef}
        value={content}
        placeholder="새로운 Todo..."
        type="text"
        onChange={onChangeInput}
        onKeyDown={onKeyDown}
      />
      <button onClick={onSubmit}>추가</button>
    </div>
  );
};

export default Edit;
