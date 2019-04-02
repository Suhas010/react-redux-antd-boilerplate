import RequestHandler from '../../components/helpers/RequestHandler';

// get list of users
export function getUsers() {
  return RequestHandler.get('/users');
}

// get user
export function getUser(id) {
  return RequestHandler.get(`/target_groups/${id}`);
}

// save new user
export function saveUser(payload) {
  return RequestHandler.post('/target_groups', payload);
}

// save new user
export function updateUser(targetID, payload) {
  return RequestHandler.put(`/target_groups/${targetID}`, payload);
}

// delete user
export function deleteUser(targetID, payload) {
  return RequestHandler.put(`/target_groups/${targetID}`, payload);
}
