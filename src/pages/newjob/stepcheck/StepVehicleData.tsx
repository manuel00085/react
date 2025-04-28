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
    <div className="vehicle-data-container">
      <h3 className="vehicle-data-title">Datos del Vehículo</h3>
      <div className="vehicle-data-content">
        <p><span className="vehicle-data-label">Marca:</span> {vehicleData.marca}</p>
        <p><span className="vehicle-data-label">Modelo:</span> {vehicleData.modelo}</p>
        <p><span className="vehicle-data-label">Año:</span> {vehicleData.año}</p>

        <div className="vehicle-data-section">
          <p className="vehicle-data-label">Historial de Servicio:</p>
          <ul className="vehicle-data-list">
            {vehicleData.historialServicio.map((servicio, index) => (
              <li key={index} className="vehicle-data-list-item">{servicio}</li>
            ))}
          </ul>
        </div>

        <div className="vehicle-data-section">
          <p><span className="vehicle-data-label">Cliente:</span> {vehicleData.cliente.nombre}</p>
          <p><span className="vehicle-data-label">Teléfono:</span> {vehicleData.cliente.telefono}</p>
        </div>
      </div>
    </div>
  );
};

export default StepVehicleData;
