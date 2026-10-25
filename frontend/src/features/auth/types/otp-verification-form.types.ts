export interface OtpVerificationFormProps {
  email: string;
  title: string;
  countdownKey: string;
  onSubmit: (otp: string) => Promise<void>;
  onResend: () => Promise<void>;
}
