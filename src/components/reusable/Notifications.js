import { notification } from 'antd';

export const showSuccessNotification = (description) => {
  notification.success({
    message: 'Success',
    description,
  });
};

export const showFailureNotification = (description = 'Something went wrong.') => {
  notification.error({
    message: 'Failed',
    description,
  });
};

export const showWarningNotification = (description) => {
  notification.warning({
    message: 'Warning',
    description,
  });
};

export const showNotification = (title = 'Warning', message = 'Something went wrong.', type = 'warning') => {
  notification[type]({
    message: title,
    description: message,
  });
};
