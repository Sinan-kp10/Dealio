import { Router } from "express";
import { validateRequest } from "../../../../../app/middlewares/validate-request.middleware";
import { registerCustomerSchema } from "../validators/register-customer.schema";
import {  currentUserController, loginController, otpController, passwordResetController, registrationController} from "../../../infrastructure/container/auth.container";
import { registerEnterpriseSchema } from "../validators/register-enterprise.schema";
import { verifyOtpSchema } from "../validators/verify-otp.validator";
import { loginSchema } from "../validators/login.schema";
import { emailSchema } from "../validators/email.schema";
import { resetPasswordSchema } from "../validators/reset-password.schema";
import { resendOtpSchema } from "../validators/resend-otp.schema";
import { authMiddleware } from "../../../../../app/middlewares/auth.middleware";


const authRouter = Router();

authRouter.post("/register/customer",validateRequest(registerCustomerSchema),registrationController.registerCustomer)
authRouter.post("/register/enterprise", validateRequest(registerEnterpriseSchema),registrationController.registerEnterprise)
authRouter.post("/customer/verify-email-otp", validateRequest(verifyOtpSchema), otpController.verifyCustomerOtp)
authRouter.post("/enterprise/verify-email-otp", validateRequest(verifyOtpSchema), otpController.verifyEnterpriseOtp)
authRouter.post("/resend-email-otp", validateRequest(resendOtpSchema), otpController.resendOtp)
authRouter.post("/login", validateRequest(loginSchema), loginController.login)
authRouter.post("/forgot-password", validateRequest(emailSchema), passwordResetController.forgotPassword)
authRouter.post("/verify-password-reset-otp", validateRequest(verifyOtpSchema),passwordResetController.verifyPasswordResetOtp)
authRouter.post("/reset-password",validateRequest(resetPasswordSchema),passwordResetController.resetPassword)
authRouter.post("/logout",authMiddleware, loginController.logout)
authRouter.get("/me", authMiddleware, currentUserController.handle);

export { authRouter };