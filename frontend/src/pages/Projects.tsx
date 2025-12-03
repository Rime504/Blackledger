import { useState, useEffect } from "react";

type Project = {
  id: number;
  client: string;
  name: string;
  status: string;
  amount: number;
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem("projects");
    return saved ? JSON.parse(saved) : [];
  });

  const [client, setClient] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  function addProject() {
    if (!client || !name || !status || !amount) return;

    setProjects([
      ...projects,
      {
        id: Date.now(),
        client,
        name,
        status,
        amount: Number(amount),
      },
    ]);

    setClient("");
    setName("");
    setStatus("");
    setAmount("");
  }

  function deleteProject(id: number) {
    setProjects(projects.filter((project) => project.id !== id));
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Projects
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track work in motion across clients, status, and value.
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="bg-card text-card-foreground rounded-xl shadow-sm border border-border mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
        <input
          className="border border-input bg-background px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/60"
          placeholder="Client Name"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />

        <input
          className="border border-input bg-background px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/60"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border border-input bg-background px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/60"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />

        <input
          className="border border-input bg-background px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/60"
          placeholder="Amount ($)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          onClick={addProject}
          className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium tracking-tight col-span-1 md:col-span-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        >
          Add Project
        </button>
      </div>

      {/* LIST */}
      <div className="bg-card text-card-foreground rounded-xl shadow-sm border border-border overflow-hidden">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-muted/60">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-xs uppercase tracking-wide text-muted-foreground">
                Client
              </th>
              <th className="px-4 py-3 text-left font-medium text-xs uppercase tracking-wide text-muted-foreground">
                Project
              </th>
              <th className="px-4 py-3 text-left font-medium text-xs uppercase tracking-wide text-muted-foreground">
                Status
              </th>
              <th className="px-4 py-3 text-left font-medium text-xs uppercase tracking-wide text-muted-foreground">
                Amount
              </th>
              <th className="px-4 py-3 text-right font-medium text-xs uppercase tracking-wide text-muted-foreground">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                className="border-t border-border/60 even:bg-muted/40"
              >
                <td className="px-4 py-3 align-middle">{project.client}</td>
                <td className="px-4 py-3 align-middle">{project.name}</td>
                <td className="px-4 py-3 align-middle">{project.status}</td>
                <td className="px-4 py-3 align-middle">
                  ${Number(project.amount ?? 0).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right align-middle">
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="text-red-500 text-xs font-medium hover:text-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {projects.length === 0 && (
          <div className="py-10 flex flex-col items-center justify-center gap-2">
            <div className="h-8 w-8 rounded-full border border-dashed border-muted-foreground/40 flex items-center justify-center text-xs text-muted-foreground">
              ◦
            </div>
            <p className="text-sm text-muted-foreground">
              No projects added yet. New work will appear in this table.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
