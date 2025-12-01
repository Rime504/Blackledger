import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Projects from "./pages/Projects";
import Invoices from "./pages/Invoices";
import Revenue from "./pages/Revenue";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 bg-gray-50 p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/revenue" element={<Revenue />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
