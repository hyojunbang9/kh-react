import { useEffect, useState } from "react";
import { getList } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
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
  const { page, size, moveToList, moveToRead, refresh } = useCustomMove();
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
            <th>TNO</th>
            <th>TITLE</th>
            <th>DATE</th>
            <th>WRITER</th>
          </tr>
        </thead>
        <tbody>
          {serverData.dtoList.map((todo) => (
            <tr key={todo.tno} onClick={() => moveToRead(todo.tno)}>
              <td className="text-center">{todo.tno}</td>
              <td>{todo.title}</td>
              <td>{todo.dueDate}</td>
              <td>{todo.writer}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <PageComponent serverData={serverData} moveToList={moveToList} />
    </Container>
  );
};
export default ListComponent;
