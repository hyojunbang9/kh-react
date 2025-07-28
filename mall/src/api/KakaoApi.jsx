import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";

const rest_api_key = ``; //${rest_api_key}
const redirect_uri = ``; //redirect_uri=${redirect_uri}
const auth_code_path = ``;
//엑세스 토큰 얻기
const access_token_url = ``;
//보안코드 활성화시 사용
const client_secret = ``;

//https://kauth.kakao.com/oauth/authorize + ?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code 형식
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};

export const getAccessToken = async (authCode) => {
  const header = {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };

  const params = {
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
    client_secret: client_secret,
  };

  const res = await axios.post(access_token_url, params, header);
  const accessToken = res.data.access_token;
  return accessToken;
};

export const getMemberWithAccessToken = async (accessToken) => {
  const res = await axios.get(
    `${API_SERVER_HOST}/api/member/kakao?accessToken=${accessToken}`
  );
  return res.data;
};
