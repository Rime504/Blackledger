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
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Invoice Generator
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create clean, branded PDF invoices in a single click.
          </p>
        </div>
      </div>

      <div className="bg-card text-card-foreground p-6 rounded-xl shadow-sm border border-border max-w-xl">
        <input
          className="border border-input bg-background px-3 py-2 rounded-lg w-full mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring/60"
          placeholder="Client Name"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />

        <input
          className="border border-input bg-background px-3 py-2 rounded-lg w-full mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring/60"
          placeholder="Project Name"
          value={project}
          onChange={(e) => setProject(e.target.value)}
        />

        <input
          className="border border-input bg-background px-3 py-2 rounded-lg w-full mb-6 text-sm focus:outline-none focus:ring-2 focus:ring-ring/60"
          placeholder="Amount ($)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          onClick={generateInvoice}
          className="inline-flex items-center justify-center rounded-lg bg-black text-white px-6 py-2 text-sm font-medium tracking-tight shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        >
          Generate PDF Invoice
        </button>
      </div>
    </div>
  );
}
