import { HTTP_STANDERD_ERRORS } from '../../utils/constant';

export default (err) => {
  const { status, statusText } = err;
  if (HTTP_STANDERD_ERRORS[status]) {
    return HTTP_STANDERD_ERRORS[status];
  }
  return statusText || 'Something went wrong.';
};
