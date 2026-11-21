import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import FullPageSpinner from "../../components/common/loading/FullPageSpinner";
import { PublicRoute } from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import { PublicLayout } from "../../components/layouts/PublicLayout";
import CustomerSignupPage from "../../features/auth/pages/CustomerSignupPage";
import EnterpriseSignupPage from "../../features/auth/pages/EnterpriseSignupPage";
import LoginPage from "../../features/auth/pages/LoginPage"
import ForgottenPasswordPage from "../../features/auth/pages/ForgottenPasswordPage";
import ResetPassword from "../../features/auth/pages/ResetPaswordPage";
import NotFoundPage from "../../pages/NotFoundPage";
import ForbiddenPage from "../../pages/ForbiddenPage";
import AccountSuspendedPage from "../../pages/AccountSuspendedPage";
import OtpVerificationPage from "../../features/auth/pages/OtpVerificationPage";
import VerifyPasswordResetOtpPage from "../../features/auth/pages/VerifyPasswordResetOtpPage";
import { HomePage } from "../../features/home/pages/common/HomePage";
const CustomerHomePage = lazy(()=> import("../../features/home/pages/customer/CustomerHomePage"))
const CustomerQuotationsPage = lazy(() => import("../../features/quotations/pages/customer/CustomerQuotationsPage"))
const CustomerQuotationDetailsPage = lazy(() => import("../../features/quotations/pages/customer/CustomerQuotationDetailsPage"))
const CreateQuotationPage = lazy(() => import("../../features/quotations/pages/customer/CreateQuotationPage"))
const CustomerConversationsPage = lazy(() => import("../../features/conversations/pages/customer/CustomerConversationsPage"))
const CustomerSettingsPage = lazy(()=> import("../../features/settings/pages/CustomerSttingsPage"))
const EnterpriseSettingsPage = lazy(()=> import("../../features/settings/pages/EnterpriseSettingsPage"))
const EnterpriseProfilePage = lazy(()=> import("../../features/profile/pages/EnterpriseProfilePage"))
const CustomerProfilePage = lazy(()=> import("../../features/profile/pages/CustomerProfilePage"))
const CustomerLayout = lazy(() => import("../../components/layouts/customer/CustomerLayout"))
const AdminLayout = lazy(()=> import("../../components/layouts/admin/AdminLayout"))
const EnterpriseManagerLayout = lazy(()=> import("../../components/layouts/enterpriseManager/EnterpriseManagerLayout"))
const AdminDashboardPage = lazy(()=> import("../../features/dashboard/pages/AdminDashboardPage"))
const EnterpriseDashboardPage = lazy(()=> import("../../features/dashboard/pages/EnterpriseDashboardPage"))
const EnterpriseQuotationsPage = lazy(() => import("../../features/quotations/pages/enterprise/EnterpriseQuotationsPage"))
const EnterpriseQuotationDetailsPage = lazy(() => import("../../features/quotations/pages/enterprise/EnterpriseQuotationDetailsPage"))
const EnterpriseCreateProposalPage = lazy(() => import("../../features/quotations/pages/enterprise/EnterpriseCreateProposalPage"))
const CustomerManagementPage = lazy(()=> import("../../features/user-management/pages/CustomerManagementPage"))
const EnterpriseManagementPage = lazy(()=> import("../../features/user-management/pages/EnterpriseManagementPage"))
const EnterpriseApprovalsPage = lazy(() => import("../../features/enterprise-approvals/pages/EnterpriseApprovalsPage"))
const EnterpriseApprovalDetailsPage = lazy(() => import("../../features/enterprise-approvals/pages/EnterpriseApprovalDetailsPage"))
const CategoryManagementPage = lazy(()=> import("../../features/category-management/pages/CategoryManagementPage"))

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<FullPageSpinner />}>
        <Routes>

          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/admin/enterprise-approvals" element={<EnterpriseApprovalsPage />} />
              <Route path="/admin/enterprise-approvals/:enterpriseId" element={<EnterpriseApprovalDetailsPage />} />
              <Route path="/admin/customers" element={<CustomerManagementPage />} />
              <Route path="/admin/enterprises" element={<EnterpriseManagementPage />} />
              <Route path="/admin/categories" element={<CategoryManagementPage />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["CUSTOMER"]} />}>
            <Route element={<CustomerLayout />}>
              <Route path="/customer" element={<CustomerHomePage />} />
              <Route path="/customer/quotations" element={<CustomerQuotationsPage />} />
              <Route path="/customer/quotations/create" element={<CreateQuotationPage />} />
              <Route path="/customer/quotations/:id" element={<CustomerQuotationDetailsPage />} />
              <Route path="/customer/conversations" element={<CustomerConversationsPage />} />
              <Route path="/customer/profile" element={<CustomerProfilePage />} />
              <Route path="/customer/settings" element={<CustomerSettingsPage />} />

            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["ENTERPRISE_MANAGER"]} />}>
            <Route element={<EnterpriseManagerLayout />}>
              <Route path="/enterprise" element={<EnterpriseDashboardPage />} />
              <Route path="/enterprise/quotations" element={<EnterpriseQuotationsPage />} />
              <Route path="/enterprise/quotations/:id" element={<EnterpriseQuotationDetailsPage />} />
              <Route path="/enterprise/quotations/:id/proposal" element={<EnterpriseCreateProposalPage />} />
              <Route path="/enterprise/profile" element={<EnterpriseProfilePage />} />
              <Route path="/enterprise/settings" element={<EnterpriseSettingsPage />} />
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
          <Route path="/account-suspended" element={<AccountSuspendedPage />} />
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </Suspense>

    </BrowserRouter>
  );
}