import { useParams } from "react-router-dom";

const Diary = () => {
  const params = useParams();
  return <div>Diary/{params.id}</div>;
};

export default Diary;
