import RequestHandler from '../../components/helpers/RequestHandler';

export function getConfig() {
  return RequestHandler.get('/config');
}

export function getCategories() {
  return RequestHandler.get('/categories');
}

export function getSubCategories(id) {
  return RequestHandler.get(`/categories/${id}/sub_categories`);
}
