import { Router } from "express";
import { authMiddleware } from "../../../../../app/middlewares/auth.middleware";
import { validateRequest } from "../../../../../app/middlewares/validate-request.middleware";
import { authLimiter, otpRateLimiter, resendOtpRateLimiter } from "../../../../../app/middlewares/rate-limiter.middleware";
import { accountController,authenticatedUserController,loginController,otpController,passwordResetController,refreshTokenController,registrationController,} from "../../../infrastructure/container/auth.container";
import { registerCustomerSchema } from "../validators/register-customer.schema";
import { registerEnterpriseSchema } from "../validators/register-enterprise.schema";
import { verifyOtpSchema } from "../validators/verify-otp.validator";
import { resendOtpSchema } from "../validators/resend-otp.schema";
import { loginSchema } from "../validators/login.schema";
import { emailSchema } from "../validators/email.schema";
import { resetPasswordSchema } from "../validators/reset-password.schema";
import { changePasswordSchema } from "../validators/change-password.schema";
import { requestEmailChangeSchema } from "../validators/request-email-change.schema";
import { verifyEmailChangeSchema } from "../validators/verify-email-change.schema";
import { requestPhoneOtpSchema } from "../validators/request-phone-otp.schema";
import { verifyPhoneOtpSchema } from "../validators/verify-phone-otp.schema";

const authRouter = Router();

//Registration
authRouter.post("/register/customer", authLimiter, validateRequest(registerCustomerSchema), registrationController.registerCustomer);
authRouter.post("/register/enterprise", authLimiter, validateRequest(registerEnterpriseSchema), registrationController.registerEnterprise);

// Registration Email OTP Verification
authRouter.post("/customer/verify-email-otp", otpRateLimiter, validateRequest(verifyOtpSchema), otpController.verifyCustomerOtp);
authRouter.post("/enterprise/verify-email-otp", otpRateLimiter, validateRequest(verifyOtpSchema), otpController.verifyEnterpriseOtp);
authRouter.post("/resend-email-otp", resendOtpRateLimiter, validateRequest(resendOtpSchema), otpController.resendOtp);

//Authentication
authRouter.post("/login", validateRequest(loginSchema), loginController.login);
authRouter.post("/refresh", refreshTokenController.refresh);
authRouter.post("/logout", authMiddleware, loginController.logout);
authRouter.get("/me", authMiddleware, authenticatedUserController.getAuthenticatedUser);

// Password Reset
authRouter.post("/forgot-password", validateRequest(emailSchema), passwordResetController.forgotPassword);
authRouter.post("/verify-password-reset-otp", otpRateLimiter, validateRequest(verifyOtpSchema), passwordResetController.verifyPasswordResetOtp);
authRouter.post("/reset-password", validateRequest(resetPasswordSchema), passwordResetController.resetPassword);
authRouter.post("/change-password", authMiddleware, validateRequest(changePasswordSchema), passwordResetController.changePassword);

// Email Change
authRouter.post("/request-email-change", authMiddleware, otpRateLimiter, validateRequest(requestEmailChangeSchema), accountController.requestEmailChange);
authRouter.post("/verify-email-change", authMiddleware, otpRateLimiter, validateRequest(verifyEmailChangeSchema), accountController.verifyEmailChange);
authRouter.post("/resend-email-change-otp", authMiddleware, resendOtpRateLimiter, accountController.resendEmailChangeOtp);

// Phone Number Verification
authRouter.post("/request-phone-otp", authMiddleware, otpRateLimiter, validateRequest(requestPhoneOtpSchema), accountController.requestPhoneOtp);
authRouter.post("/verify-phone-otp", authMiddleware, otpRateLimiter, validateRequest(verifyPhoneOtpSchema), accountController.verifyPhoneOtp);
authRouter.post("/resend-phone-otp", authMiddleware, resendOtpRateLimiter, accountController.resendPhoneOtp);

export { authRouter };
