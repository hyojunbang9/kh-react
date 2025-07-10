import { useState, useReducer } from "react";

function reducer(count, action) {
  switch (action.type) {
    case "PLUS":
      return count + action.data;
    case "MINUS":
      return count + action.data;
  }
}

const Exam = () => {
  // const [count, setCount] = useState(0);
  const [count, dispatch] = useReducer(reducer, 0);

  const onPlus = () => {
    // setCount(count + 1);
    dispatch({ type: "PLUS", data: 1 });
  };
  const onMinus = () => {
    // setCount(count - 1);
    dispatch({ type: "MINUS", data: 1 });
  };
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={onPlus}>+</button>
      <button onClick={onMinus}>-</button>
    </div>
  );
};

export default Exam;
