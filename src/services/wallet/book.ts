// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Add book POST /book/ */
export async function addBook(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addBookParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString>('/book/', {
    method: 'POST',
    params: {
      ...params,
      addBook: undefined,
      ...params['addBook'],
    },
    ...(options || {}),
  });
}

/** Get book GET /book/${param0} */
export async function getBook(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBookParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseBook>(`/book/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Update book POST /book/${param0} */
export async function updateBook(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateBookParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseString>(`/book/${param0}`, {
    method: 'POST',
    params: {
      ...queryParams,
      addBook: undefined,
      ...queryParams['addBook'],
    },
    ...(options || {}),
  });
}

/** Delete book DELETE /book/${param0} */
export async function deleteBook(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteBookParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseString>(`/book/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Get book list POST /book/list */
export async function getBookList(options?: { [key: string]: any }) {
  return request<API.BaseResponseListBook>('/book/list', {
    method: 'POST',
    ...(options || {}),
  });
}

/** Book Overview GET /book/overview */
export async function overview(options?: { [key: string]: any }) {
  return request<API.BaseResponseListBigDecimal>('/book/overview', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Report Balance GET /book/reportBalance */
export async function reportBalance(options?: { [key: string]: any }) {
  return request<API.BaseResponseListListChartVO>('/book/reportBalance', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Report Expense Category GET /book/reportExpenseCategory */
export async function reportExpenseCategory(options?: { [key: string]: any }) {
  return request<API.BaseResponseListChartVO>('/book/reportExpenseCategory', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Report Income Category GET /book/reportIncomeCategory */
export async function reportIncomeCategory(options?: { [key: string]: any }) {
  return request<API.BaseResponseListChartVO>('/book/reportIncomeCategory', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Get user list POST /book/user */
export async function getUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserListParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListUser>('/book/user', {
    method: 'POST',
    params: {
      ...params,
      book: undefined,
      ...params['book'],
    },
    ...(options || {}),
  });
}
