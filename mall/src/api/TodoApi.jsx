import axios from "axios";
import jwtAxios from "../util/jwtUtil";

//서버 주소 및 url 세팅 (공통 주소)
export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/todo`;

//선택
export const getOne = async (tno) => {
  // await => 서버 주소 === 서버에서 답변을 기다리는 중
  // await axios.get(`${prefix}/${tno}`);

  // const result => 응답을 기다렸다가 값을 받아서 저장
  const result = await jwtAxios.get(`${prefix}/${tno}`);

  return result.data;
};

//페이징
export const getList = async (pageParam) => {
  const { page, size } = pageParam;
  const result = await jwtAxios.get(`${prefix}/list`, {
    params: { page: page, size: size },
  });
  return result.data;
};

//삽입
export const postAdd = async (todoObj) => {
  const result = await jwtAxios.post(`${prefix}/`, todoObj);
  return result.data;
};

//수정
export const putOne = async (todo) => {
  const result = await jwtAxios.put(`${prefix}/${todo.tno}`, todo);
  return result.data;
};

//삭제
export const deleteOne = async (tno) => {
  const result = await jwtAxios.delete(`${prefix}/${tno}`);
  return result.data;
};

const TodoApi = () => {
  return <div>todoApi</div>;
};

export default TodoApi;
