import axios from "axios";
import { API_SERVER_HOST } from "./diaryApi";

const prefix = `${API_SERVER_HOST}/api/moment`;

export const postAdd = async (moment) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await axios.post(`${prefix}/`, moment, header);
  return res.data;
};

export const getList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${prefix}/list`, {
    params: { page: page, size: size },
  });
  return res.data;
};

export const getOne = async (mno) => {
  const res = await axios.get(`${prefix}/${mno}`);
  return res.data;
};

export const putOne = async (mno, moment) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await axios.put(`${prefix}/${mno}`, moment, header);
  return res.data;
};

export const deleteOne = async (mno) => {
  const res = await axios.delete(`${prefix}/${mno}`);
  return res.data;
};
