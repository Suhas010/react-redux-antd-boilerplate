import RequestHandler from '../../components/helpers/RequestHandler';

export function LoginAction(payload) {
  return RequestHandler.post('users/login', payload);
}

export function forgetPassword(payload) {
  return RequestHandler.post('/users/login', payload);
}

export function getUser(payload) {
  return RequestHandler.get('employees/', payload);
}
