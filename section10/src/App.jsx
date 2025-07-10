import "./App.css";
import Header from "./components/Header";
import List from "./components/List";
import Edit from "./components/Edit";
import Exam from "./components/Exam";
import { useRef, useState, useReducer, useCallback } from "react";

const mockData = [
  { id: 0, isDone: false, content: "react study", date: new Date().getTime() },
  { id: 1, isDone: false, content: "spring study", date: new Date().getTime() },
  { id: 2, isDone: false, content: "riding", date: new Date().getTime() },
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
  //useCallback에 해당되는 이벤트 핸들러 함수를 딱 한 번만 작동 시키게 한다.
  const onInsert = useCallback((content) => {
    dispatch({
      type: "INSERT",
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  }, []);
  // const newList = {
  // id: idRef.current++,
  // isDone: false,
  // content: content,
  // date: new Date().getTime(),
  // };
  // setList([newList, ...list]);
  // };
  //수정
  // 수정하기
  const onUpdate = useCallback((tagId) => {
    dispatch({ type: "onUpdate", data: tagId });
  }, []);
  // const onUpdate = (tagId) => {
  //   setList(
  //     list.map((data) => {
  //       return data.id === tagId ? { ...data, isDone: !data.isDone } : data;
  //     })
  //   );
  // };

  //삭제
  const onDelete = useCallback((tagId) => {
    dispatch({ type: "onDelete", data: tagId });
  }, []);
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
