import { useEffect, useState } from "react";

type Project = {
  id: number;
  client: string;
  name: string;
  status: string;
  amount: number;
};

export default function Revenue() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const savedProjects = localStorage.getItem("projects");
    const parsedProjects = savedProjects ? JSON.parse(savedProjects) : [];

    setProjects(parsedProjects);

    const revenue = parsedProjects.reduce(
      (sum: number, p: Project) => sum + p.amount,
      0
    );

    setTotal(revenue);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Revenue</h1>

      <div className="bg-white p-6 rounded-xl shadow mb-8 max-w-xl">
        <p className="text-gray-500 mb-2">Total Revenue</p>
        <h2 className="text-4xl font-bold">${total}</h2>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Client</th>
              <th className="p-3 text-left">Project</th>
              <th className="p-3 text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-t">
                <td className="p-3">{project.client}</td>
                <td className="p-3">{project.name}</td>
                <td className="p-3">${project.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {projects.length === 0 && (
          <p className="p-4 text-gray-500 text-center">
            No revenue yet.
          </p>
        )}
      </div>
    </div>
  );
}
