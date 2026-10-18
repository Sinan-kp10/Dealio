import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<div>Dealio Homepage</div>} />

            <Route path="/login" element={<div>Login Page</div>} />

            <Route path="/signup/customer" element={<div>Customer Signup Page</div>}/>

            <Route path="/signup/enterprise" element={<div>Enterprise Signup Page</div>}/>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </BrowserRouter>
  );
}
