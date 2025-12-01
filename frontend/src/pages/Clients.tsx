import { useState, useEffect } from "react";

type Client = {
  id: number;
  name: string;
  email: string;
  company: string;
};

export default function Clients() {
  const [clients, setClients] = useState<Client[]>(() => {
    const saved = localStorage.getItem("clients");
    return saved ? JSON.parse(saved) : [];
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  // ✅ THIS MUST BE BEFORE RETURN
  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);

  function addClient() {
    if (!name || !email || !company) return;

    setClients([
      ...clients,
      { id: Date.now(), name, email, company },
    ]);

    setName("");
    setEmail("");
    setCompany("");
  }

  function deleteClient(id: number) {
    setClients(clients.filter((client) => client.id !== id));
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Clients</h1>

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            className="border p-2 rounded"
            placeholder="Client Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border p-2 rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border p-2 rounded"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <button
          onClick={addClient}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add Client
        </button>
      </div>

      {/* LIST */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-t">
                <td className="p-3">{client.name}</td>
                <td className="p-3">{client.email}</td>
                <td className="p-3">{client.company}</td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => deleteClient(client.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {clients.length === 0 && (
          <p className="p-4 text-gray-500 text-center">
            No clients added yet.
          </p>
        )}
      </div>
    </div>
  );
}
