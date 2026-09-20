import axiosClient from './axiosClient'

// POST /auth/login  ->  { token, tokenType }
export async function login({ email, password }) {
  const response = await axiosClient.post('/auth/login', {
    email: email.trim(),
    password,
  })
  return response.data
}


export function signup(payload) {
  return axiosClient
    .post("/auth/signup", payload)
    .then((response) => response.data);
}