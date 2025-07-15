import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";

const Edit = () => {
  // /edit/3 3번에 해당되는 다이어리 정보 가져오기
  const params = useParams();
  //화면이동
  const nav = useNavigate();
  //공동 자료(이벤트 삭제,수정)
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
  //공동 자료(data:모든 일기 정보)
  const data = useContext(DiaryStateContext); //전체 데이터를 가져오기
  //공동 자료에서 3번에 해당하는
  const [curDiaryItem, setCurDiaryItem] = useState();
  //useEffect 마운트 일 때, params.id가 변할 때마다 작동
  useEffect(() => {
    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(params.id)
    );
    if (!currentDiaryItem) {
      window.alert("존재하지 않는 일기입니다.");
      nav("/", { replace: true });
    }
    setCurDiaryItem(currentDiaryItem);
  }, [params.id]);

  const onClickDelete = () => {
    if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
      // 일기 삭제 로직
      onDelete(Number(params.id));
      // 뒤로가기 방지
      nav("/", { replace: true });
    }
  };

  const onSubmit = (input) => {
    if (window.confirm("일기를 정말 수정할까요?")) {
      onUpdate(
        Number(params.id),
        input.createdDate.getTime(),
        input.emotionId,
        input.content
      );
      //뒤로가기 방지
      nav("/", { replace: true });
    }
  };
  return (
    <div>
      <Header
        title={"일기 수정하기"}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />}
        rightChild={
          <Button onClick={onClickDelete} text={"삭제하기"} type={"NEGATIVE"} />
        }
      />
      <Editor initData={curDiaryItem} onSubmit={onSubmit} />
    </div>
  );
};
export default Edit;
