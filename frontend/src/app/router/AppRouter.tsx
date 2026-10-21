import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PublicLayout } from "../../components/layouts/PublicLayout";
import { HomePage } from "../../features/home/pages/HomePage";
import CustomerSignupPage from "../../features/auth/pages/CustomerSignupPage";
import EnterpriseSignupPage from "../../features/auth/pages/EnterpriseSignupPage";
import LoginPage from "../../features/auth/pages/LoginPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>


            <Route path="/login" element={<LoginPage />} />

            <Route path="/signup/customer" element={<CustomerSignupPage />}/>

            <Route path="/signup/enterprise" element={<EnterpriseSignupPage/>}/>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </BrowserRouter>
  );
}
