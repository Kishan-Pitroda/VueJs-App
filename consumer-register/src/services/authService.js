import JwtDecode from "jwt-decode";
// import { toast } from "react-toastify";

const tokenKey = "token";
const jwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSJ9.oFHBG72UhlhMkuZ7mrcAVazGoajttB9k06OHWC9sXFg";

var authStatus = false;

export async function login(email, password) {
  //const { data: consumer } = await http.post(apiEndpoint, { email, password });
  if (!(email == "admin@gmail.com" && password == "admin")) throw "invalid";
  localStorage.setItem(tokenKey, jwt);
  authStatus = true;
}

export async function logout() {
  localStorage.removeItem(tokenKey);
  authStatus = false;
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return JwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getAuthStatus() {
  console.log("status " + authStatus);
  return authStatus;
}

export default {
  login,
  logout,
  getCurrentUser,
};
