import React from "react";
import { CheckItem } from "../types";
import StepItem from "./StepItem"; // Importar el componente StepItem

type Props = {
  items: CheckItem[];
  handleItemChange: (index: number, field: keyof CheckItem, value: string) => void;
};

const StepExterior: React.FC<Props> = ({ items, handleItemChange }) => {
  const exteriorItems = [
    "Carrocería general",
    "Luces delanteras",
    "Luces traseras",
    "Luces antiniebla",
    "Espejos laterales y retrovisor",
    "Limpiaparabrisas y plumillas",
    "Neumáticos y rines",
    "Antena exterior",
    "Tapa del combustible",
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold">Inspección Exterior</h3>
      {exteriorItems.map((item, index) => (
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

export default StepExterior;
