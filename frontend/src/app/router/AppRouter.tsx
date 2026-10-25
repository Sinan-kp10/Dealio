import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PublicLayout } from "../../components/layouts/PublicLayout";
import { HomePage } from "../../features/home/pages/HomePage";
import CustomerSignupPage from "../../features/auth/pages/CustomerSignupPage";
import EnterpriseSignupPage from "../../features/auth/pages/EnterpriseSignupPage";
import LoginPage from "../../features/auth/pages/LoginPage";
import ForgottenPasswordPage from "../../features/auth/pages/ForgottenPasswordPage";
import ResetPassword from "../../features/auth/pages/ResetPasword";
import NotFoundPage from "../../pages/NotFoundPage";
import OtpVerificationPage from "../../features/auth/pages/OtpVerificationPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgottenPasswordPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/register/customer" element={<CustomerSignupPage />}/>

          <Route path="/register/enterprise" element={<EnterpriseSignupPage/>}/>
          <Route path="/verify-email" element={<OtpVerificationPage />}/>


          <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </BrowserRouter>
  );
}
