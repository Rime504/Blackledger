type CardProps = {
    title: string;
    value: string;
  };
  
  export default function Card({ title, value }: CardProps) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-gray-500 text-sm mb-2">{title}</p>
        <h2 className="text-3xl font-bold">{value}</h2>
      </div>
    );
  }
  