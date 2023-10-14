// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Add transaction POST /transaction/ */
export async function addTransaction(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addTransactionParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString>('/transaction/', {
    method: 'POST',
    params: {
      ...params,
      addTransaction: undefined,
      ...params['addTransaction'],
    },
    ...(options || {}),
  });
}

/** Get transaction GET /transaction/${param0} */
export async function getTransaction(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTransactionParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseTransaction>(`/transaction/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Update transaction POST /transaction/${param0} */
export async function updateTransaction(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateTransactionParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseString>(`/transaction/${param0}`, {
    method: 'POST',
    params: {
      ...queryParams,
      addTransaction: undefined,
      ...queryParams['addTransaction'],
    },
    ...(options || {}),
  });
}

/** Delete transaction DELETE /transaction/${param0} */
export async function deleteTransaction(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteTransactionParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseString>(`/transaction/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Get transaction page GET /transaction/page */
export async function getTransactionPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTransactionPageParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageTransaction>('/transaction/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Get transaction page by timestamp range GET /transaction/range */
export async function getTransactionRange(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTransactionRangeParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageTransaction>('/transaction/range', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
