import RequestHandler from '../../components/helpers/RequestHandler';

export default function getConfig() {
  return RequestHandler.get('/login');
}
