import { BrowserRouter, Routes, Route } from "react-router-dom";

import AvishkarLandingPage from "./components/AvishkarLandingPage";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public Website */}
                <Route
                    path="/"
                    element={<AvishkarLandingPage />}
                />

                {/* Admin Login */}
                <Route
                    path="/admin"
                    element={<AdminLogin />}
                />

                {/* Protected Admin Dashboard */}
                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedAdminRoute>
                            <AdminDashboard />
                        </ProtectedAdminRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;