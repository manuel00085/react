import React, { useState } from "react";

type Props = {
  onPlateSubmit: (plate: string) => void;
};

const StepPlaca: React.FC<Props> = ({ onPlateSubmit }) => {
  const [plate, setPlate] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (plate) {
      onPlateSubmit(plate);
    } else {
      alert("Por favor ingresa la placa del vehículo");
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">Ingrese la placa del vehículo</h3>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
          placeholder="Placa del vehículo"
          className="p-2 border rounded w-full"
        />
        <button
          type="submit"
          className="mt-2 p-2 bg-blue-500 text-white rounded"
        >
          Buscar vehículo
        </button>
      </form>
    </div>
  );
};

export default StepPlaca;
