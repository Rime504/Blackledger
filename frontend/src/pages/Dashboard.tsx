import { useEffect, useState } from "react";

type Client = {
  id: number;
  name: string;
  email: string;
  company: string;
};

type Project = {
  id: number;
  client: string;
  name: string;
  status: string;
  amount: number;
};

export default function Dashboard() {
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    const savedClients = localStorage.getItem("clients");
    const savedProjects = localStorage.getItem("projects");

    const parsedClients = savedClients ? JSON.parse(savedClients) : [];
    const parsedProjects = savedProjects ? JSON.parse(savedProjects) : [];

    setClients(parsedClients);
    setProjects(parsedProjects);

    const totalRevenue = parsedProjects.reduce(
      (sum: number, p: Project) => sum + p.amount,
      0
    );

    setRevenue(totalRevenue);
  }, []);

  const activeProjects = projects.length;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm mb-2">Total Clients</p>
          <h2 className="text-3xl font-bold">{clients.length}</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm mb-2">Active Projects</p>
          <h2 className="text-3xl font-bold">{activeProjects}</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm mb-2">Total Revenue</p>
          <h2 className="text-3xl font-bold">${revenue}</h2>
        </div>
      </div>
    </div>
  );
}
