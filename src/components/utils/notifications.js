import { toast } from 'react-toastify';

// Define notification functions
export const notifySuccess = (message) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
  });
};

export const notifyError = (message) => {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
  });
};

