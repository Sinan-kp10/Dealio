import { ToastContainer, Slide } from "react-toastify";

export function ToastProvider() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3500}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Slide}
    />
  );
}

export default ToastProvider;
