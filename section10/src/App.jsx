import "./App.css";
import Header from "./components/Header";
import List from "./components/List";
import Edit from "./components/Edit";
import Exam from "./components/Exam";
import { useRef, useState, useReducer } from "react";

const mockData = [
  { id: 0, isDone: false, content: "react study", date: new Date().getTime() },
  { id: 1, isDone: false, content: "spring study", date: new Date().getTime() },
  {
    id: 2,
    isDone: false,
    content: "motocycle riding",
    date: new Date().getTime(),
  },
];

function reducer(list, action) {
  switch (action.type) {
    case "INSERT":
      return [action.data, ...list];
    case "UPDATE":
      return list.map((data) => {
        return data.id === action.tagId
          ? { ...data, isDone: !data.isDone }
          : data;
      });
    case "DELETE":
      return list.filter((data) => {
        return data.id !== action.tagId;
      });
    default:
      return list;
  }
}

function App() {
  //상태 관리 (전체 데이터)
  // const [list, setList] = useState(mockData);
  const [list, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3); // {current : 3}

  //삽입
  const onInsert = (content) => {
    dispatch({
      type: "INSERT",
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
    // const newList = {
    // id: idRef.current++,
    // isDone: false,
    // content: content,
    // date: new Date().getTime(),
    // };
    // setList([newList, ...list]);
  };
  //수정
  const onUpdate = (tagId) => {
    dispatch({
      type: "UPDATE",
      tagId: tagId,
    });
  };
  // const onUpdate = (tagId) => {
  //   setList(
  //     list.map((data) => {
  //       return data.id === tagId ? { ...data, isDone: !data.isDone } : data;
  //     })
  //   );
  // };

  //삭제
  const onDelete = (tagId) => {
    dispatch({
      type: "DELETE",
      tagId: tagId,
    });
  };
  // const onDelete = (tagId) => {
  //   setList(
  //     list.filter((data) => {
  //       return data.id !== tagId;
  //     })
  //   );
  // };
  return (
    <>
      <div className="App">
        <Header />
        <Edit onInsert={onInsert} />
        <List list={list} onUpdate={onUpdate} onDelete={onDelete} />
      </div>
    </>
  );
}

export default App;
