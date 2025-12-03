import { useEffect, useMemo, useState } from "react";

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

type Activity = {
  id: string;
  icon: string;
  title: string;
  description: string;
  timestamp: number;
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
      (sum: number, project: Project) => sum + Number(project.amount ?? 0),
      0
    );

    setRevenue(totalRevenue);
  }, []);

  const activeProjects = projects.length;

  const recentActivity = useMemo<Activity[]>(() => {
    const clientEvents = clients.map((client) => ({
      id: `client-${client.id}`,
      icon: "👤",
      title: `New client • ${client.name}`,
      description: client.company
        ? `Joined from ${client.company}`
        : "Client added",
      timestamp: client.id ?? Date.now(),
    }));

    const projectEvents = projects.map((project) => ({
      id: `project-${project.id}`,
      icon: "📁",
      title: `New project • ${project.name}`,
      description: `${project.client} • ${project.status}`,
      timestamp: project.id ?? Date.now(),
    }));

    return [...clientEvents, ...projectEvents]
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 5);
  }, [clients, projects]);

  const activityEmpty = recentActivity.length === 0;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-baseline justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Overview
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Silent snapshot of your client and revenue performance.
          </p>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 transition-shadow duration-200 hover:shadow-md">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
            Total Clients
          </p>
          <p className="text-5xl font-bold leading-none">{clients.length}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 transition-shadow duration-200 hover:shadow-md">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
            Active Projects
          </p>
          <p className="text-5xl font-bold leading-none">{activeProjects}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 transition-shadow duration-200 hover:shadow-md">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
            Total Revenue
          </p>
          <p className="text-5xl font-bold leading-none text-emerald-600">
            ${revenue.toLocaleString()}
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500">
              Recent Activity
            </p>
            <h2 className="text-xl font-semibold text-gray-900">
              What moved this week
            </h2>
          </div>
        </div>

        {activityEmpty ? (
          <div className="py-10 flex flex-col items-center gap-3 text-center text-gray-500">
            <div className="h-12 w-12 rounded-full border border-dashed border-gray-300 flex items-center justify-center text-xl">
              ✨
            </div>
            <p className="text-sm">
              No activity yet. Add a client or project to begin the story.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {recentActivity.map((activity) => (
              <li
                key={activity.id}
                className="flex items-start gap-4 py-4"
              >
                <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center text-lg">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {activity.description}
                  </p>
                </div>
                <span className="text-xs uppercase tracking-wider text-gray-400">
                  {formatTimestamp(activity.timestamp)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function formatTimestamp(value: number) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value || Date.now()));
  } catch {
    return "—";
  }
}
