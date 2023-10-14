// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Login POST /login */
export async function login(body: API.Login, options?: { [key: string]: any }) {
  return request<API.BaseResponseString>('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Current User POST /login/current */
export async function CurrentUser(options?: { [key: string]: any }) {
  return request<API.BaseResponseUser>('/login/current', {
    method: 'POST',
    ...(options || {}),
  });
}

/** Forget Password POST /login/forget */
export async function forgetPassword(body: API.ForgetPassword, options?: { [key: string]: any }) {
  return request<API.BaseResponseString>('/login/forget', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Register POST /login/register */
export async function register(body: API.AddUser, options?: { [key: string]: any }) {
  return request<API.BaseResponseString>('/login/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Logout POST /logout */
export async function logout(options?: { [key: string]: any }) {
  return request<API.BaseResponseString>('/logout', {
    method: 'POST',
    ...(options || {}),
  });
}
