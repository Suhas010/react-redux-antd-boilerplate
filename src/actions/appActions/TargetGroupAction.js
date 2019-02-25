import RequestHandler from '../../components/helpers/RequestHandler';
import RequestHandlerAxios from '../../components/helpers/RequestHandlerAxios';

export function getTargetGroups() {
  return RequestHandlerAxios.get('/target_groups');
}

export function editTargetGroups() {
  return RequestHandler.get('/target_groups');
}
