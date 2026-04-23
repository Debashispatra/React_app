import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import AuditTrial from "./pages/AuditTrial";
import WalletAdjustment from "./pages/WalletAdjustment";
import CreateCBC from "./pages/CreateCBC";
import CbcRequest from "./pages/CbcRequest";
import MainLayout from "./components/layouts/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-cbc-user"
          element={
            <ProtectedRoute allowedRoles={["ROLE_OPS_MAKER"]}>
              <MainLayout>
                <CreateCBC />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/cbc-request"
          element={
            <ProtectedRoute allowedRoles={["ROLE_OPS_MAKER"]}>
              <MainLayout>
                <CbcRequest />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={["ROLE_OPS_CHECKER"]}>
              <MainLayout>
                <Users />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/AuditTrial"
          element={
            <ProtectedRoute allowedRoles={["ROLE_OPS_CHECKER", "ROLE_OPS_MAKER"]}>
              <MainLayout>
                <AuditTrial />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/WalletAdjustment"
          element={
            <ProtectedRoute allowedRoles={["ROLE_OPS_CHECKER", "ROLE_OPS_MAKER"]}>
              <MainLayout>
                <WalletAdjustment />
              </MainLayout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}