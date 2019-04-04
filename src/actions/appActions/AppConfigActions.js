import RequestHandler from '../../components/helpers/RequestHandler';

export function getConfig() {
  return RequestHandler.get('/config');
}

export function getProfiles() {
  return RequestHandler.profileGet('/config');
}

export function getCategory(categoryID) {
  return RequestHandler.get(`/categories/${categoryID}`);
}

export function getCategories() {
  return RequestHandler.get('/categories');
}

export function addCategory(payload) {
  return RequestHandler.post('/categories', payload);
}

export function updateCategory(id, payload) {
  return RequestHandler.put(`/categories/${id}`, payload);
}

export function deleteCategory(id) {
  return RequestHandler.delete(`/categories/${id}`);
}

export function getSubCategory(subCategoryID) {
  return RequestHandler.get(`/categories/${subCategoryID}`);
}

export function getSubCategories(id) {
  return RequestHandler.get(`/categories/${id}/sub_categories`);
}

export function addSubCategory(categoryID, payload) {
  return RequestHandler.post(`/categories/${categoryID}/sub_categories`, payload);
}

export function updateSubCategory(categoryID, subCategoryID, payload) {
  return RequestHandler.put(`/categories/${categoryID}/sub_categories/${subCategoryID}`, payload);
}

export function deleteSubCategory(id) {
  return RequestHandler.delete(`/categories/${id}`);
}
