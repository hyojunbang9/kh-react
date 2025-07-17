import { useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

//param 값이 true면 자신의 값을 정수로 변환 리ㅣ턴, False면 defaultValue
const getNum = (param, defaultValue) => {
  if (!param) {
    return defaultValue;
  }
  return parseInt(param);
};

const useCustomMove = () => {
  //<a href = ""></a>
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [queryParams] = useSearchParams();
  const page = getNum(queryParams.get("page"), 1);
  const size = getNum(queryParams.get("size"), 5);
  //?page=2&size=10
  const queryDefault = createSearchParams({ page, size }).toString();

  const moveToList = (pageParam) => {
    let queryStr = "";
    if (pageParam) {
      //?page=4&size=10
      const pageNum = getNum(pageParam.page, page);
      const sizeNum = getNum(pageParam.size, size);
      queryStr = createSearchParams({
        page: pageNum,
        size: sizeNum,
      }).toString();
    } else {
      //?page=1&size=10
      queryStr = queryDefault;
    }
    navigate({
      //../list?page=1&size=10
      pathname: `../todo/list`,
      search: queryStr,
    });

    //계속 요청 시 값이 변하지 않더라도 지속 랜더링히게 설정
    setRefresh(!refresh);
  };
  const moveToModify = (num) => {
    console.log(queryDefault);
    navigate({
      //../modify/45?page=1&size=10

      pathname: `../todo/modify/${num}`,
      search: queryDefault, //수정시에 기존의 쿼리 스트링 유지를 위해
    });
  };
  const moveToRead = (num) => {
    console.log(queryDefault);
    navigate({
      //../modify/45?page=1&size=10
      pathname: `../todo/read/${num}`,
      search: queryDefault, //수정시에 기존의 쿼리 스트링 유지를 위해
    });
  };
  return { moveToList, moveToModify, moveToRead, page, size }; //moveToModify 추가
};
export default useCustomMove;
