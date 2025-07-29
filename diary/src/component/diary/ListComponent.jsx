import { useEffect, useState } from "react";
import { getList } from "../../api/diaryApi";
import useCustomMove from "../../hooks/useMyMove";
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
  const { page, size, moveToList, moveToRead, refresh } = useMyMove();
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
            <th>DNO</th>
            <th>TITLE</th>
            <th>DATE</th>
          </tr>
        </thead>
        <tbody>
          {serverData.dtoList.map((diary) => (
            <tr key={diary.dno} onClick={() => moveToRead(diary.dno)}>
              <td className="text-center">{diary.dno}</td>
              <td>{diary.title}</td>
              <td>{diary.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <PageComponent serverData={serverData} moveToList={moveToList} />
    </Container>
  );
};
export default ListComponent;
