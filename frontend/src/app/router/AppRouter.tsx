import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PublicLayout } from "../../components/layouts/PublicLayout";
import { HomePage } from "../../features/home/pages/HomePage";
import CustomerSignupPage from "../../features/auth/pages/CustomerSignupPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>


            <Route path="/login" element={<div>Login Page</div>} />

            <Route path="/signup/customer" element={<CustomerSignupPage />}/>

            <Route path="/signup/enterprise" element={<div>Enterprise Signup Page</div>}/>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </BrowserRouter>
  );
}
