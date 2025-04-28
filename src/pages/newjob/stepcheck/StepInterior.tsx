import React from "react";
import { CheckItem } from "../types";
import StepItem from "./StepItem"; // Importar el componente StepItem

type Props = {
  items: CheckItem[];
  handleItemChange: (index: number, field: keyof CheckItem, value: string) => void;
};

const StepInterior: React.FC<Props> = ({ items, handleItemChange }) => {
  const interiorItems = [
    "Asientos y tapicería",
    "Cinturones de seguridad",
    "Panel de control y botones",
    "Sistema de climatización",
    "Radio y sistema de entretenimiento",
    "Espejos interiores",
    "Luces interiores",
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold">Inspección Interior</h3>
      {interiorItems.map((item, index) => (
        <StepItem
          key={index}
          item={item}
          itemIndex={index}
          items={items}
          handleItemChange={handleItemChange}
        />
      ))}
    </div>
  );
};

export default StepInterior;
