import { ToastContainer, Slide } from "react-toastify";
import { CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react";

export function ToastProvider() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={true}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      limit={2}
      theme="dark"
      transition={Slide}
      icon={({ type }) => {
        switch (type) {
          case "success":
            return <CheckCircle2 className="w-5 h-5 text-[#25B66A] shrink-0" strokeWidth={2.2} />
          case "error":
            return <AlertCircle className="w-5 h-5 text-[#EF4444] shrink-0" strokeWidth={2.2} />
          case "warning":
            return <AlertTriangle className="w-5 h-5 text-[#F59E0B] shrink-0" strokeWidth={2.2} />
          case "info":
          default:
            return <Info className="w-5 h-5 text-[#69ACCC] shrink-0" strokeWidth={2.2} />
        }
      }}
    />
  );
}

export default ToastProvider

