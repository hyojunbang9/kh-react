import "./App.css";
import Header from "./components/Header";
import List from "./components/List";
import Edit from "./components/Edit";
import Exam from "./components/Exam";
import {
  useRef,
  useState,
  useReducer,
  useCallback,
  createContext,
  useMemo,
} from "react";

const mockData = [
  { id: 0, isDone: false, content: "react study", date: new Date().getTime() },
  { id: 1, isDone: false, content: "spring study", date: new Date().getTime() },
  { id: 2, isDone: false, content: "riding", date: new Date().getTime() },
];

function reducer(list, action) {
  switch (action.type) {
    case "INSERT":
      return [action.data, ...list];
    case "onUpdate":
      return list.map((data) => {
        return data.id === action.data
          ? { ...data, isDone: !data.isDone }
          : data;
      });
    case "onDelete":
      return list.filter((data) => {
        return data.id !== action.data;
      });
    default:
      return list;
  }
}

// 1 createContext()생성해서 export 시킨다.(context -> 자바의 static과 유사)
export const ListStateContext = createContext();
// 랜더링 방지를 위해 두 개 생성
export const ListDispatchContext = createContext();

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
  //수정
  const onUpdate = useCallback((tagId) => {
    dispatch({ type: "onUpdate", data: tagId });
  }, []);

  //삭제
  const onDelete = useCallback((tagId) => {
    dispatch({ type: "onDelete", data: tagId });
  }, []);

  // 딱 한 번만 발생 하도록 처리 (useContext에 사용)
  const memorizedDispatch = useMemo(() => {
    return { onInsert, onUpdate, onDelete };
  }, [onInsert, onUpdate, onDelete]);

  return (
    <>
      <div className="App">
        <Header />
        {/* 2 Context로 다 옮기기 */}
        <ListStateContext.Provider value={{ list }}>
          <ListDispatchContext.Provider value={memorizedDispatch}>
            <Edit />
            <List />
          </ListDispatchContext.Provider>
        </ListStateContext.Provider>
      </div>
    </>
  );
}

export default App;
