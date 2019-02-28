import RequestHandler from '../../components/helpers/RequestHandler';

// get list of target groups
export function getTargetGroups() {
  return RequestHandler.get('/target_groups');
}

// get target group
export function getTargetGroup(id) {
  return RequestHandler.get(`/target_groups/${id}`);
}

// save new target group
export function saveTargetGroup(payload) {
  return RequestHandler.post('/target_groups', payload);
}

// save new target group
export function updateTargetGroup(payload) {
  return RequestHandler.put('/target_groups', payload);
}
