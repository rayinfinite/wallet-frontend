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
