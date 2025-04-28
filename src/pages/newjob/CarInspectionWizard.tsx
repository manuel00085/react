import React, { useState, useEffect } from "react";
import StepPlaca from "./stepcheck/StepPlaca";
import StepVehicleData from "./stepcheck/StepVehicleData";
import StepItem from "./stepcheck/StepItem"; // Paso genérico para ítems de inspección
import StepFinal from "./stepcheck/StepFinal"; // Paso final
import { CheckItem } from "./types";

const CarInspectionWizard: React.FC = () => {
  const [step, setStep] = useState(1); // Paso actual
  const [plate, setPlate] = useState<string>(""); // Placa del vehículo
  const [vehicleData, setVehicleData] = useState<any>(null); // Datos del vehículo
  const [isPlateValid, setIsPlateValid] = useState<boolean>(false); // Estado para validar la placa
  const [items, setItems] = useState<CheckItem[]>([]); // Lista de ítems de inspección
  const [inspectionOption, setInspectionOption] = useState<string | null>(null); // Opción de inspección seleccionada
  const [inspectionConfig, setInspectionConfig] = useState<any>(null); // Configuración de inspección

  // Cargar el JSON de configuración
  useEffect(() => {
    const fetchInspectionConfig = async () => {
      try {
        const response = await fetch("/inspectionConfig.json");
        const data = await response.json();
        setInspectionConfig(data); // Actualizamos el estado con la configuración del JSON
      } catch (error) {
        console.error("Error al cargar el JSON de configuración:", error);
      }
    };
    fetchInspectionConfig();
  }, []);

  // Función para manejar la placa y cargar los datos del vehículo
  const handlePlateSubmit = (plate: string) => {
    setPlate(plate);
    const plateRegex = /^[A-Z0-9]{6}$/; // Ejemplo de validación simple
    if (plateRegex.test(plate)) {
      setIsPlateValid(true); // Si la placa es válida
      setVehicleData({
        marca: "Toyota",
        modelo: "Corolla",
        año: "2020",
        historialServicio: ["Cambio de aceite", "Reemplazo de frenos"],
        cliente: { nombre: "Juan Pérez", telefono: "123456789" }
      });
      setStep(2); // Avanzar al siguiente paso
    } else {
      setIsPlateValid(false); // Si la placa no es válida
    }
  };

  // Función para manejar los cambios en los ítems de inspección
  const handleItemChange = (index: number, field: string, value: string) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };
    setItems(updatedItems);
  };

  // Función para manejar la opción de inspección seleccionada
  const handleInspectionOptionChange = (option: string) => {
    setInspectionOption(option);
    setItems([]); // Limpiar los ítems seleccionados de inspección cuando se cambia la opción
    setStep(3); // Avanzar al paso de inspección (empezar a mostrar los ítems)
  };

  // Función para mostrar el paso final
  const handleShowResults = () => {
    setStep(inspectionConfig?.steps.length + 3); // Avanzar al paso final
  };

  if (!inspectionConfig) {
    return <div>Cargando configuración...</div>; // Mientras se carga el JSON
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inspección del Vehículo</h1>

      {step === 1 && (
        <StepPlaca onPlateSubmit={handlePlateSubmit} />
      )}

      {step === 2 && vehicleData && isPlateValid && (
        <div>
          <StepVehicleData vehicleData={vehicleData} setStep={setStep} setItems={setItems} />
          <h3 className="text-lg font-semibold">Selección de Inspección</h3>
          <p className="mb-4">Selecciona el tipo de inspección a realizar:</p>
          <button
            onClick={() => handleInspectionOptionChange("Checkeo General")}
            className="p-2 bg-blue-500 text-white rounded mb-4"
          >
            Checkeo General
          </button>
        </div>
      )}

      {/* Renderizamos los pasos del JSON después de la selección de inspección */}
      {inspectionOption === "Checkeo General" && inspectionConfig.steps[step - 3] && (
        <div key={step}>
          <h3 className="text-xl font-semibold">{inspectionConfig.steps[step - 3].stepName}</h3>
          {inspectionConfig.steps[step - 3].items.map((item, itemIndex) => (
            <StepItem
              key={itemIndex}
              item={item.name}
              itemIndex={itemIndex}
              items={items}
              handleItemChange={handleItemChange}
            />
          ))}
        </div>
      )}

      {/* Mostrar el botón de resultados solo si estamos en el último paso de inspección */}
      {step === inspectionConfig?.steps.length + 2 && (
        <div>
          <button
            onClick={handleShowResults}
            className="p-2 bg-green-500 text-white rounded"
          >
            Ver Resultados
          </button>
        </div>
      )}

      {/* Renderizamos el paso final solo cuando se ha hecho clic en "Ver Resultados" */}
      {step === inspectionConfig?.steps.length + 3 && <StepFinal items={items} />}

      {/* Botones de navegación */}
      <div className="flex justify-between mt-4">
        {step > 2 && step < inspectionConfig?.steps.length + 3 && (
          <>
            {step > 3 && (
              <button
                onClick={() => setStep(step - 1)}
                className="p-2 bg-gray-300 rounded"
              >
                Anterior
              </button>
            )}
            {step < inspectionConfig?.steps.length + 2 && (
              <button
                onClick={() => setStep(step + 1)}
                className="p-2 bg-blue-500 text-white rounded"
              >
                Siguiente
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CarInspectionWizard;
