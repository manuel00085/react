import React from "react";
import { CheckItem } from "../types";

type Props = {
  items: CheckItem[];
};

const StepFinal: React.FC<Props> = ({ items }) => {
  const totalItems = items.length;
  const completedItems = items.filter((item) => item.estado === "OK").length;
  const needsAttention = items.filter((item) => item.estado === "Requiere Atención").length;
  const urgentRepairs = items.filter((item) => item.estado === "Requiere Reparación Urgente").length;

  const completionPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return (
    <div>
      <h3 className="text-lg font-semibold">Resumen Final</h3>
      <div className="mb-4">
        <h4>Total de Ítems Inspeccionados: {totalItems}</h4>
        <h4>Ítems OK: {completedItems} ({completionPercentage.toFixed(2)}%)</h4>
        <h4>Ítems que requieren Atención: {needsAttention}</h4>
        <h4>Ítems que requieren Reparación Urgente: {urgentRepairs}</h4>
      </div>
      <div>
        <h4>Recomendaciones:</h4>
        <ul>
          {needsAttention > 0 && (
            <li>Revisar los ítems con atención requerida. ({needsAttention} ítems)</li>
          )}
          {urgentRepairs > 0 && (
            <li>Reparaciones urgentes necesarias. ({urgentRepairs} ítems)</li>
          )}
          {completedItems === totalItems && (
            <li>¡Todo en orden, vehículo en perfecto estado!</li>
          )}
          {completedItems < totalItems && needsAttention === 0 && urgentRepairs === 0 && (
            <li>Asegúrate de revisar los ítems pendientes para mantener el vehículo en buen estado.</li>
          )}
        </ul>
      </div>
      <div>
        <h4>Ítems por Estado:</h4>
        <div>
          <h5>Ítems OK:</h5>
          <ul>
            {items
              .filter((item) => item.estado === "OK")
              .map((item, index) => (
                <li key={index}>{item.estado}</li>
              ))}
          </ul>
        </div>
        <div>
          <h5>Ítems que requieren Atención:</h5>
          <ul>
            {items
              .filter((item) => item.estado === "Requiere Atención")
              .map((item, index) => (
                <li key={index}>{item.estado}</li>
              ))}
          </ul>
        </div>
        <div>
          <h5>Ítems que requieren Reparación Urgente:</h5>
          <ul>
            {items
              .filter((item) => item.estado === "Requiere Reparación Urgente")
              .map((item, index) => (
                <li key={index}>{item.estado}</li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StepFinal;
