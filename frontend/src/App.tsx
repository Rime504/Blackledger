import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./lib/Auth";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Projects from "./pages/Projects";
import Invoices from "./pages/Invoices";
import Revenue from "./pages/Revenue";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  const { session, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!session) {
    return (
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <div className="flex h-screen max-h-screen overflow-hidden">
          <Sidebar />

          <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-50 to-white">
            <Navbar />

            <main className="flex-1 overflow-auto px-4 py-6 md:px-8 md:py-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/revenue" element={<Revenue />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}
