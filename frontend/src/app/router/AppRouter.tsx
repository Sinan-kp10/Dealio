import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PublicLayout } from "../../components/layouts/PublicLayout";
import { HomePage } from "../../features/home/pages/HomePage";
import CustomerSignupPage from "../../features/auth/pages/CustomerSignupPage";
import EnterpriseSignupPage from "../../features/auth/pages/EnterpriseSignupPage";
import LoginPage from "../../features/auth/pages/LoginPage";
import ForgottenPasswordPage from "../../features/auth/pages/ForgottenPasswordPage";
import ResetPassword from "../../features/auth/pages/ResetPaswordPage";
import NotFoundPage from "../../pages/NotFoundPage";
import ForbiddenPage from "../../pages/ForbiddenPage";
import OtpVerificationPage from "../../features/auth/pages/OtpVerificationPage";
import VerifyPasswordResetOtpPage from "../../features/auth/pages/VerifyPasswordResetOtpPage";
import CustomerLayout from "../../components/layouts/customer/CustomerLayout";
import CustomerQuotationsPage from "../../features/customer/pages/CustomerQuotationsPage";
import AdminLayout from "../../components/layouts/admin/AdminLayout";
import AdminDashboardPage from "../../features/admin/pages/AdminDashboardPage";
import EnterpriseDashboardPage from "../../features/enterpriseManager/pages/EnterpriseDashboardPage";
import EnterpriseManagerLayout from "../../components/layouts/enterpriseManager/EnterpriseManagerLayout";
import ProtectedRoute from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<ProtectedRoute allowedRoles={["CUSTOMER"]} />}>
          <Route element={<CustomerLayout />}>
            <Route path="/customer" element={<CustomerQuotationsPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["ENTERPRISE_MANAGER"]} />}>
          <Route element={<EnterpriseManagerLayout />}>
            <Route path="/enterprise" element={<EnterpriseDashboardPage />} />
          </Route>
        </Route>


        <Route element={<PublicRoute />}>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgottenPasswordPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-reset-otp" element={<VerifyPasswordResetOtpPage />} />

          <Route path="/register/customer" element={<CustomerSignupPage />} />
          <Route path="/register/enterprise" element={<EnterpriseSignupPage />} />
          <Route path="/verify-email" element={<OtpVerificationPage />} />
        </Route>

        <Route path="/forbidden" element={<ForbiddenPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </BrowserRouter>
  );
}
