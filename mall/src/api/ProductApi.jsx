import axios from "axios";
import jwtAxios from "../util/jwtUtil";

//서버 주소 및 urll(공통 주소)
export const API_SERVER_HOST = "http://localhost:8080"; //서버 주소

const prefix = `${API_SERVER_HOST}/api/products`;

// 1. 선택
export const getOne = async (pno) => {
  const result = await jwtAxios.get(`${prefix}/${pno}`);
  return result.data;
};

// 2. 전체 리스트(페에지 부분)
export const getList = async (pageParam) => {
  const { page, size } = pageParam;
  const result = await jwtAxios.get(`${prefix}/list`, {
    params: { page: page, size: size },
  });

  return result.data;
};

// 3. 삽입
export const postAdd = async (product) => {
  //파일업로드 할때에는 기본값인 ‘Content-Type’: ‘application/json’을 ‘multipart/form-data’ 변경해야됨
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const result = await jwtAxios.post(`${prefix}/`, product, header);
  return result.data;
};

// 4. 수정
export const putOne = async (pno, product) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const result = await jwtAxios.put(`${prefix}/${pno}`, product, header);
  return result.data;
};

// 5. 삭제
export const deleteOne = async (pno) => {
  const result = await jwtAxios.delete(`${prefix}/${pno}`);
  return result.data;
};
