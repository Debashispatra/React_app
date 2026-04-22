import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import AuditTrial from "./pages/AuditTrial";
import WalletAdjustment from "./pages/WalletAdjustment";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/AuditTrial" element={<AuditTrial />} />
        <Route path="/WalletAdjustment" element={<WalletAdjustment />} /> 
      </Routes>
    </BrowserRouter>
  );
}