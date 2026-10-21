import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PublicLayout } from "../../components/layouts/PublicLayout";
import { HomePage } from "../../features/home/pages/HomePage";
import CustomerSignupPage from "../../features/auth/pages/CustomerSignupPage";
import EnterpriseSignupPage from "../../features/auth/pages/EnterpriseSignupPage";
import LoginPage from "../../features/auth/pages/LoginPage";
import NotFoundPage from "../../pages/NotFoundPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>

          <Route path="/login" element={<LoginPage />} />

          <Route path="/register/customer" element={<CustomerSignupPage />}/>

          <Route path="/register/enterprise" element={<EnterpriseSignupPage/>}/>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </BrowserRouter>
  );
}
