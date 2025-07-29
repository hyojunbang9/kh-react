import axios from "axios";

//서버 주소
export const API_SERVER_HOST = "http://localhost:8080";

const prefix = `${API_SERVER_HOST}/api/diary`;

export const getOne = async (dno) => {
  const res = await axios.get(`${prefix}/${dno}`);
  return res.data;
};

export const getList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${prefix}/list`, {
    params: { page: page, size: size },
  });
  return res.data;
};

export const postAdd = async (diaryObj) => {
  const res = await axios.post(`${prefix}/`, diaryObj);
  return res.data;
};

export const deleteOne = async (dno) => {
  const res = await axios.delete(`${prefix}/${dno}`);
  return res.data;
};

export const putOne = async (diary) => {
  const res = await axios.put(`${prefix}/${diary.dno}`, diary);
  return res.data;
};
