import { notification } from 'antd';

export const showSuccessNotification = (description) => {
  notification.config({
    top: 150,
  });
  notification.success({
    message: 'Success',
    description,
  });
};

export const showFailureNotification = (description = 'Something went wrong.') => {
  notification.config({
    top: 150,
  });
  notification.error({
    message: 'Failed',
    description,
  });
};

export const showWarningNotification = (description) => {
  notification.config({
    top: 150,
  });
  notification.warning({
    message: 'Warning',
    description,
  });
};

export const showNotification = (title = 'Warning', message = 'Something went wrong.', type = 'warning') => {
  notification.config({
    top: 150,
  });
  notification[type]({
    message: title,
    description: message,
  });
};
