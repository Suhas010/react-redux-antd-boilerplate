import { HTTP_STANDARD_ERRORS } from '../../utils/constant';

export default (err) => {
  const { status, statusText } = err;
  if (HTTP_STANDARD_ERRORS[status]) {
    return HTTP_STANDARD_ERRORS[status];
  }
  return statusText || 'Something went wrong.';
};
