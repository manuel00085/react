import React from "react";
import { CheckItem } from "../types";

type Props = {
  items: CheckItem[];
  handleItemChange: (index: number, field: keyof CheckItem, value: string) => void;
};

const StepEngine: React.FC<Props> = ({ items, handleItemChange }) => {
  const engineItems = [
    "Aceite del motor",
    "Líquido refrigerante",
    "Líquido de frenos",
    "Líquido de dirección asistida",
    "Líquido limpiaparabrisas",
    "Correas",
    "Mangueras",
    "Bornes de batería",
    "Filtro de aire",
    "Fugas de líquidos",
    "Limpieza general del motor",
  ];

  // Asegúrate de que 'items' tenga la misma cantidad de elementos que 'engineItems'
  if (items.length < engineItems.length) {
    // Si no tiene suficiente longitud, inicializa los elementos vacíos
    const missingItems = engineItems.length - items.length;
    for (let i = 0; i < missingItems; i++) {
      items.push({ estado: "", observaciones: "", prioridad: "" });
    }
  }

  return (
    <div>
      <h3 className="text-lg font-semibold">Compartimiento del Motor</h3>
      {engineItems.map((item, index) => (
        <div key={index} className="mb-4">
          <h4>{item}</h4>
          <div className="mb-2">
            <label>Estado:</label>
            <select
              value={items[index]?.estado || ""}
              onChange={(e) => handleItemChange(index, "estado", e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Seleccione...</option>
              <option value="OK">OK</option>
              <option value="Requiere Atención">Requiere Atención</option>
              <option value="Requiere Reparación Urgente">Requiere Reparación Urgente</option>
              <option value="No Aplica">No Aplica</option>
            </select>
          </div>
          <div className="mb-2">
            <label>Observaciones:</label>
            <textarea
              value={items[index]?.observaciones || ""}
              onChange={(e) => handleItemChange(index, "observaciones", e.target.value)}
              className="w-full p-2 border rounded"
              rows={2}
            />
          </div>
          <div className="mb-2">
            <label>Prioridad:</label>
            <select
              value={items[index]?.prioridad || ""}
              onChange={(e) => handleItemChange(index, "prioridad", e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Seleccione...</option>
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepEngine;
