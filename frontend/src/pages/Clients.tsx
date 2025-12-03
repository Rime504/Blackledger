import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/Auth";

type Client = {
  id: string;
  name: string;
  email: string;
  company: string;
};

export default function Clients() {
  const { user } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  // ✅ FETCH FROM DATABASE
  async function fetchClients() {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setClients(data);
    } else {
      console.error("Fetch error:", error);
    }
  }

  async function addClient() {
    if (!name || !email || !company) return;
    if (!user) {
      console.error("No user logged in");
      return;
    }
  
    const { data, error } = await supabase.from("clients").insert([
      { 
        name, 
        email, 
        company,
        owner_id: user.id // ✅ Add user ID for RLS
      },
    ]);
  
    console.log("INSERT RESULT:", data);
    console.log("INSERT ERROR:", error);
  
    if (!error) {
      setName("");
      setEmail("");
      setCompany("");
      fetchClients();
    } else {
      console.error("Failed to add client:", error);
    }
  }
  

  // ✅ DELETE FROM DATABASE
  async function deleteClient(id: string) {
    await supabase.from("clients").delete().eq("id", id);
    fetchClients();
  }

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Clients
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage relationships with the people behind your revenue.
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="bg-card text-card-foreground p-6 rounded-xl shadow-sm border border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            className="border border-input bg-background px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/60"
            placeholder="Client Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border border-input bg-background px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/60"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border border-input bg-background px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/60"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <button
          onClick={addClient}
          className="inline-flex items-center justify-center rounded-lg bg-black text-white px-4 py-2 text-sm font-medium tracking-tight shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        >
          Add Client
        </button>
      </div>

      {/* LIST */}
      <div className="bg-card text-card-foreground rounded-xl shadow-sm border border-border overflow-hidden">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-muted/60">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-xs uppercase tracking-wide text-muted-foreground">
                Name
              </th>
              <th className="px-4 py-3 text-left font-medium text-xs uppercase tracking-wide text-muted-foreground">
                Email
              </th>
              <th className="px-4 py-3 text-left font-medium text-xs uppercase tracking-wide text-muted-foreground">
                Company
              </th>
              <th className="px-4 py-3 text-right font-medium text-xs uppercase tracking-wide text-muted-foreground">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr
                key={client.id}
                className="border-t border-border/60 even:bg-muted/40"
              >
                <td className="px-4 py-3 align-middle">{client.name}</td>
                <td className="px-4 py-3 align-middle">{client.email}</td>
                <td className="px-4 py-3 align-middle">{client.company}</td>
                <td className="px-4 py-3 text-right align-middle">
                  <button
                    onClick={() => deleteClient(client.id)}
                    className="text-red-500 text-xs font-medium hover:text-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {clients.length === 0 && (
          <div className="py-10 flex flex-col items-center justify-center gap-2">
            <div className="h-8 w-8 rounded-full border border-dashed border-muted-foreground/40 flex items-center justify-center text-xs text-muted-foreground">
              0
            </div>
            <p className="text-sm text-muted-foreground">
              No clients added yet. Start by creating your first relationship.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
