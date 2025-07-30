import { useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const getNum = (param, defaultValue) => {
  if (!param) {
    return defaultValue;
  }
  return parseInt(param);
};

const useMyMove = () => {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [queryParams] = useSearchParams();
  const page = getNum(queryParams.get("page"), 1);
  const size = getNum(queryParams.get("size"), 10);
  const queryDefault = createSearchParams({ page, size }).toString(); //새로 추가

  const moveToList = (pageParam) => {
    let queryStr = "";
    if (pageParam) {
      const pageNum = getNum(pageParam.page, page);
      const sizeNum = getNum(pageParam.size, size);
      queryStr = createSearchParams({
        page: pageNum,
        size: sizeNum,
      }).toString();
    } else {
      queryStr = queryDefault;
    }
    navigate({
      pathname: `../diary/list`,
      search: queryStr,
    });
    setRefresh(!refresh); //추가
  };

  const moveToMomentList = (pageParam) => {
    let queryStr = "";
    if (pageParam) {
      const pageNum = getNum(pageParam.page, page);
      const sizeNum = getNum(pageParam.size, size);
      queryStr = createSearchParams({
        page: pageNum,
        size: sizeNum,
      }).toString();
    } else {
      queryStr = queryDefault;
    }

    navigate({
      pathname: `../moment/list`,
      search: queryStr,
    });
    setRefresh(!refresh); //추가
  };

  const moveToModify = (num) => {
    console.log(queryDefault);
    navigate({
      pathname: `../diary/modify/${num}`,
      search: queryDefault, //수정시에 기존의 쿼리 스트링 유지를 위해
    });
  };

  const moveToMomentModify = (num) => {
    console.log(queryDefault);
    navigate({
      pathname: `../moment/modify/${num}`,
      search: queryDefault, //수정시에 기존의 쿼리 스트링 유지
    });
  };

  const moveToRead = (num) => {
    navigate({
      pathname: `../diary/read/${num}`,
      search: queryDefault, //수정시에 기존의 쿼리 스트링 유지를 위해
    });
  };

  const moveToMomentRead = (num) => {
    console.log(queryDefault);
    navigate({
      pathname: `../moment/read/${num}`,
      search: queryDefault,
    });
  };

  return {
    moveToMomentList,
    moveToList,
    moveToModify,
    moveToMomentModify,
    moveToMomentRead,
    moveToRead,
    page,
    size,
    refresh,
  }; //moveToModify 추가
};
export default useMyMove;
