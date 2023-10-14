// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Add account POST /account/ */
export async function addAccount(body: API.AddAccount, options?: { [key: string]: any }) {
  return request<API.BaseResponseString>('/account/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get account GET /account/${param0} */
export async function getAccount(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAccountParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseAccount>(`/account/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Update account POST /account/${param0} */
export async function updateAccount(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateAccountParams,
  body: API.AddAccount,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseString>(`/account/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Delete account DELETE /account/${param0} */
export async function deleteAccount(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteAccountParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseString>(`/account/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Get account page GET /account/page */
export async function getAccountPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAccountPageParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageAccount>('/account/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
