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
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Revenue
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            High‑level view of the cash flowing through your projects.
          </p>
        </div>
      </div>

      <div className="bg-card text-card-foreground p-6 rounded-xl shadow-sm border border-border max-w-xl">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2">
          Total Revenue
        </p>
        <h2 className="text-4xl font-semibold leading-none">
          ${total.toLocaleString()}
        </h2>
      </div>

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
                Amount
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
                <td className="px-4 py-3 align-middle">
                  ${Number(project.amount ?? 0).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {projects.length === 0 && (
          <div className="py-10 flex flex-col items-center justify-center gap-2">
            <div className="h-8 w-8 rounded-full border border-dashed border-muted-foreground/40 flex items-center justify-center text-xs text-muted-foreground">
              $
            </div>
            <p className="text-sm text-muted-foreground">
              No revenue yet. As projects close, they’ll appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
