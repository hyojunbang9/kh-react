import { useEffect, useState } from "react";
import { getList } from "../../api/todoApi";
import useMyMove from "../../hooks/useMyMove";
import { Container, Table } from "react-bootstrap";
import PageComponent from "../common/PageComponent";

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
      console.log(data);
      setServerData(data);
    });
  }, [page, size, refresh]);

  return (
    <Container className="px-5 justify-content-center">
      <Table striped bordered hover size="lg">
        <thead>
          <tr className="text-center">
            <th>tno</th>
            <th>done</th>
            <th>ttitle</th>
            <th>twriter</th>
            <th>tcontent</th>
            <th>dueDate</th>
          </tr>
        </thead>
        <tbody>
          {serverData.dtoList.map((todo) => (
            <tr
              key={todo.tno}
              onClick={() => {
                console.log("페이지 클릭:", todo.tno);
                moveToTodoRead(todo.tno);
              }}
            >
              <td className="text-center">{todo.tno}</td>
              <td className="text-center">
                <input type="checkbox" checked={todo.done} disabled />
              </td>
              <td>{todo.ttitle}</td>
              <td>{todo.twriter}</td>
              <td>{todo.tcontent}</td>
              <td>{todo.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <PageComponent serverData={serverData} moveToList={moveToTodoList} />
    </Container>
  );
};
export default ListComponent;
