import { useEffect, useState } from "react";
import { getList, putOne } from "../../api/todoApi";
import useMyMove from "../../hooks/useMyMove";
import PageComponent from "../common/PageComponent";
import "./ListComponent.css";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totoalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const ListComponent = () => {
  const { page, size, moveToTodoList, moveToTodoRead, refresh } = useMyMove();
  const [serverData, setServerData] = useState(initState);

  useEffect(() => {
    getList({ page, size }).then((data) => {
      const sortedDtoList = data.dtoList.sort((a, b) => {
        return new Date(b.dueDate) - new Date(a.dueDate);
      });
      setServerData({ ...data, dtoList: sortedDtoList });
    });
  }, [page, size, refresh]);

  const handleDoneChange = async (tno, done) => {
    const todo = serverData.dtoList.find((item) => item.tno === tno);
    if (todo) {
      await putOne({ ...todo, done: !done });
      setServerData((prev) => ({
        ...prev,
        dtoList: prev.dtoList.map((item) =>
          item.tno === tno ? { ...item, done: !done } : item
        ),
      }));
    }
  };

  return (
    <div className="todo-list-container">
      {serverData.dtoList.map((todo) => (
        <div key={todo.tno} className="todo-note">
          <div className="status">
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => handleDoneChange(todo.tno, todo.done)}
            />
          </div>
          <div className="title" onClick={() => moveToTodoRead(todo.tno)}>
            {todo.ttitle}
          </div>
          <div className="due-date">{todo.dueDate}</div>
        </div>
      ))}
      <PageComponent serverData={serverData} moveToList={moveToTodoList} />
    </div>
  );
};
export default ListComponent;
