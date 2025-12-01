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
    <div>
      <h1 className="text-3xl font-bold mb-6">Projects</h1>

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl shadow mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Client Name"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />

        <input
          className="border p-2 rounded"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 rounded"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />

        <input
          className="border p-2 rounded"
          placeholder="Amount ($)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          onClick={addProject}
          className="bg-black text-white px-4 py-2 rounded col-span-1 md:col-span-4"
        >
          Add Project
        </button>
      </div>

      {/* LIST */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Client</th>
              <th className="p-3 text-left">Project</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-t">
                <td className="p-3">{project.client}</td>
                <td className="p-3">{project.name}</td>
                <td className="p-3">{project.status}</td>
                <td className="p-3">${project.amount}</td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {projects.length === 0 && (
          <p className="p-4 text-gray-500 text-center">
            No projects added yet.
          </p>
        )}
      </div>
    </div>
  );
}
