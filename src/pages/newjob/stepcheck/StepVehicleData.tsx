import React from "react";

type Props = {
  vehicleData: {
    marca: string;
    modelo: string;
    año: string;
    historialServicio: string[];
    cliente: {
      nombre: string;
      telefono: string;
    };
  };
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
};

const StepVehicleData: React.FC<Props> = ({ vehicleData, setStep, setItems }) => {
  // Simula el llenado de los ítems de inspección
  const initializeItems = () => {
    const initialItems = [
      { estado: "", observaciones: "", prioridad: "" },
      { estado: "", observaciones: "", prioridad: "" },
      { estado: "", observaciones: "", prioridad: "" },
      // Agrega todos los ítems de inspección necesarios
    ];
    setItems(initialItems);
  };


  return (
    <div>
      <h3 className="text-lg font-semibold">Datos del Vehículo</h3>
      <div className="mt-4">
        <p><strong>Marca:</strong> {vehicleData.marca}</p>
        <p><strong>Modelo:</strong> {vehicleData.modelo}</p>
        <p><strong>Año:</strong> {vehicleData.año}</p>
        <p><strong>Historial de Servicio:</strong></p>
        <ul>
          {vehicleData.historialServicio.map((servicio, index) => (
            <li key={index}>{servicio}</li>
          ))}
        </ul>
        <p><strong>Cliente:</strong> {vehicleData.cliente.nombre}</p>
        <p><strong>Teléfono:</strong> {vehicleData.cliente.telefono}</p>
      </div>

    </div>
  );
};

export default StepVehicleData;
