// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Get all category GET /category/ */
export async function getAllCategory(options?: { [key: string]: any }) {
  return request<API.BaseResponseListCategory>('/category/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Get category GET /category/${param0} */
export async function getCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCategoryParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseCategory>(`/category/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Update category POST /category/${param0} */
export async function updateCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateCategoryParams,
  body: API.Category,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseString>(`/category/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Delete category DELETE /category/${param0} */
export async function deleteCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteCategoryParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseString>(`/category/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Add category POST /category/add/${param0} */
export async function addCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addCategoryParams,
  body: API.Category,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseString>(`/category/add/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Initialize category GET /category/init */
export async function initCategory(options?: { [key: string]: any }) {
  return request<API.BaseResponseString>('/category/init', {
    method: 'GET',
    ...(options || {}),
  });
}
