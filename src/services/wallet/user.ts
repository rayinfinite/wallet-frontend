// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Change Password POST /user/change */
export async function changePassword(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.changePasswordParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString>('/user/change', {
    method: 'POST',
    params: {
      ...params,
      changePassword: undefined,
      ...params['changePassword'],
    },
    ...(options || {}),
  });
}

/** Set book GET /user/setBook/${param0} */
export async function setBook(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.setBookParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseString>(`/user/setBook/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Set default book GET /user/setDefaultBook/${param0} */
export async function setDefaultBook(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.setDefaultBookParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseString>(`/user/setDefaultBook/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Update User POST /user/update */
export async function updateUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateUserParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString>('/user/update', {
    method: 'POST',
    params: {
      ...params,
      updateUser: undefined,
      ...params['updateUser'],
    },
    ...(options || {}),
  });
}
