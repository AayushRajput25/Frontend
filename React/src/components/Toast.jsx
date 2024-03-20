import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Toast({ message, type }) {
  const notify = () => {
    switch (type) {
      case 'success':
        toast.success(message, { position: "top-right" });
        break;
      case 'error':
        toast.error(message, { position: "top-right" });
        break;
      case 'warn':
        toast.warn(message, { position: "top-right" });
        break;
      default:
        toast.info(message, { position: "top-right" });
    }
  };

  return (
    <>
      <button onClick={notify}>Notify</button>
      <ToastContainer />
    </>
  );
}

export default Toast;

