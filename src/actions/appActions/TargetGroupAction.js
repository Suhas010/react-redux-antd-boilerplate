import RequestHandler from '../../components/helpers/RequestHandler';
// import RequestHandlerAxios from '../../components/helpers/RequestHandlerAxios';

export function getTargetGroups() {
  return RequestHandler.get('/target_groups');
}

export function getTargetGroup(id) {
  return RequestHandler.get(`/target_groups/${id}`);
}
