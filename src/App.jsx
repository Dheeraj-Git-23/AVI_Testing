import { BrowserRouter, Routes, Route } from "react-router-dom";

import AvishkarLandingPage from "./components/AvishkarLandingPage";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public website */}
        <Route
          path="/"
          element={<AvishkarLandingPage />}
        />

        {/* Admin dashboard */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;