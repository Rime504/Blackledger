import { useState } from "react";
import jsPDF from "jspdf";

export default function Invoices() {
  const [client, setClient] = useState("");
  const [project, setProject] = useState("");
  const [amount, setAmount] = useState("");

  function generateInvoice() {
    if (!client || !project || !amount) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("INVOICE", 20, 20);

    doc.setFontSize(12);
    doc.text(`Client: ${client}`, 20, 40);
    doc.text(`Project: ${project}`, 20, 50);
    doc.text(`Amount: $${amount}`, 20, 60);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 70);

    doc.text("Thank you for your business.", 20, 90);

    doc.save(`invoice-${client}.pdf`);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Invoice Generator</h1>

      <div className="bg-white p-6 rounded-xl shadow max-w-xl">
        <input
          className="border p-2 rounded w-full mb-4"
          placeholder="Client Name"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />

        <input
          className="border p-2 rounded w-full mb-4"
          placeholder="Project Name"
          value={project}
          onChange={(e) => setProject(e.target.value)}
        />

        <input
          className="border p-2 rounded w-full mb-6"
          placeholder="Amount ($)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          onClick={generateInvoice}
          className="bg-black text-white px-6 py-2 rounded"
        >
          Generate PDF Invoice
        </button>
      </div>
    </div>
  );
}
