import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone } from "lucide-react";
import { handleFormError } from "../../../../utils/errorHandler";
import { toast } from "react-toastify";
import { requestPhoneOtpSchema, type RequestPhoneOtpFormData } from "../../schema/request-phone-otp.schema";
import ButtonSpinner from "../../../../components/common/loading/ButtonSpinner";
import { requestPhoneOtp } from "../../services/users-account-settings.service";

interface RequestPhoneStepProps {
  onSuccess: (phone: string) => void;
  onCancel: () => void;
}

export function RequestPhoneStep({ onSuccess, onCancel }: RequestPhoneStepProps) {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting }} = useForm<RequestPhoneOtpFormData>({resolver: zodResolver(requestPhoneOtpSchema)});

  const onSubmit = async (data: RequestPhoneOtpFormData) => {
    try {
      await requestPhoneOtp({ phone: data.phone.trim() });
      toast.success("OTP sent to your phone number");
      onSuccess(data.phone.trim());
    } catch (error) {
      handleFormError(error, setError, "Unable to send verification code");
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5 pt-5">
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
          Phone Number
        </label>
        <div className="relative flex items-center w-full">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center justify-center">
            <Phone size={18} />
          </span>
          <input
            type="tel"
            autoFocus
            disabled={isSubmitting}
            maxLength={10}
            {...register("phone")}
            placeholder="Enter 10-digit phone number"
            className={`w-full h-11 pl-11 pr-4 text-[0.9375rem] text-[#0f1d2f] bg-white border rounded-xl transition-all placeholder:text-slate-400 focus:outline-none disabled:bg-slate-50 disabled:cursor-not-allowed ${
              errors.phone
                ? "border-red-500 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/12"
                : "border-slate-200/90 hover:border-slate-300 focus:border-[#355982] focus:ring-[3px] focus:ring-[#355982]/12"
            }`}
          />
        </div>
        {errors.phone && (<p className="text-red-500 text-[0.8125rem] mt-1.5 leading-[1.35] font-medium">{errors.phone.message}</p>
        )}
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4 sm:pt-5 border-t border-slate-100">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={onCancel}
          className="w-full sm:w-auto px-4 py-2.5 border border-slate-200/90 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full sm:w-auto min-w-[170px] h-10 px-5 bg-[#2e4d75] hover:bg-[#233b5c] text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-2xs cursor-pointer flex items-center justify-center disabled:opacity-65 disabled:cursor-not-allowed"
        >
          {isSubmitting ? <ButtonSpinner size="sm" /> : "Send Verification Code"}
        </button>
      </div>
    </form>
  );
}

export default RequestPhoneStep;

