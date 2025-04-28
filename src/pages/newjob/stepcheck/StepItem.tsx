import React from "react";
import { CheckItem } from "../types";

// Definición del tipo de las propiedades que espera el componente
type StepItemProps = {
  item: string;
  itemIndex: number;
  items: CheckItem[];
  handleItemChange: (index: number, field: keyof CheckItem, value: string) => void;
};

const StepItem: React.FC<StepItemProps> = ({ item, itemIndex, items, handleItemChange }) => {
  const currentItem = items[itemIndex];

  return (
    <div key={itemIndex} className="mb-4">
      <h4>{item}</h4>
      <div className="mb-2">
        <label>Estado:</label>
        <select
          value={currentItem?.estado || ""}
          onChange={(e) => handleItemChange(itemIndex, "estado", e.target.value)}
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
          value={currentItem?.observaciones || ""}
          onChange={(e) => handleItemChange(itemIndex, "observaciones", e.target.value)}
          className="w-full p-2 border rounded"
          rows={2}
        />
      </div>
      {/* Mostrar Prioridad solo si el estado es "Requiere Atención" */}
      {currentItem?.estado === "Requiere Atención" && (
        <div className="mb-2">
          <label>Prioridad:</label>
          <select
            value={currentItem?.prioridad || ""}
            onChange={(e) => handleItemChange(itemIndex, "prioridad", e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Seleccione...</option>
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default StepItem;
