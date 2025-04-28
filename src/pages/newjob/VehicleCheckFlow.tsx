import React, { useState } from "react";
import CarInspectionWizard from "./CarInspectionWizard"; // El wizard completo

const fakeVehicleDB = {
  ABC123: {
    marca: "Toyota",
    modelo: "Corolla",
    año: 2018,
    cliente: "Juan Pérez",
  },
  XYZ789: {
    marca: "Ford",
    modelo: "Fiesta",
    año: 2020,
    cliente: "Ana García",
  },
};

const VehicleCheckFlow: React.FC = () => {
  const [plate, setPlate] = useState("");
  const [vehicleData, setVehicleData] = useState<any>(null);
  const [notRegistered, setNotRegistered] = useState(false);
  const [showPreInspectionForm, setShowPreInspectionForm] = useState(false);
  const [startInspection, setStartInspection] = useState(false);

  // Form fields
  const [kilometraje, setKilometraje] = useState("");
  const [combustible, setCombustible] = useState("");
  const [razonLlegada, setRazonLlegada] = useState("");

  const handleSearch = () => {
    const data = fakeVehicleDB[plate.toUpperCase()];
    if (data) {
      setVehicleData(data);
      setShowPreInspectionForm(true);
    } else {
      setNotRegistered(true);
    }
  };

  const handleStartInspection = () => {
    if (!kilometraje || !combustible || !razonLlegada) {
      alert("Por favor completa todos los campos antes de continuar.");
      return;
    }
    setStartInspection(true);
  };

  if (startInspection) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Datos Iniciales</h2>
        <div className="bg-white p-4 rounded shadow mb-6">
          <p><strong>Placa:</strong> {plate.toUpperCase()}</p>
          <p><strong>Marca:</strong> {vehicleData.marca}</p>
          <p><strong>Modelo:</strong> {vehicleData.modelo}</p>
          <p><strong>Año:</strong> {vehicleData.año}</p>
          <p><strong>Cliente:</strong> {vehicleData.cliente}</p>
          <p><strong>Kilometraje:</strong> {kilometraje} km</p>
          <p><strong>Combustible:</strong> {combustible}</p>
          <p><strong>Razón de llegada:</strong> {razonLlegada}</p>
        </div>
        <CarInspectionWizard />
      </div>
    );
  }

  if (notRegistered) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold mb-4">Vehículo no registrado</h2>
        <p className="text-lg">
          Por favor descargue nuestra app móvil y regístrese para continuar.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      {!showPreInspectionForm ? (
        <>
          <h1 className="text-3xl font-bold mb-6">Consulta de Placa</h1>
          <input
            type="text"
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            placeholder="Ingrese la placa"
            className="p-3 border border-gray-300 rounded w-64 mb-4"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Buscar
          </button>
        </>
      ) : (
        <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-6">Registrar Datos Iniciales</h2>
          <div className="mb-4">
            <label className="block font-medium mb-2">Kilometraje Actual (km)</label>
            <input
              type="number"
              value={kilometraje}
              onChange={(e) => setKilometraje(e.target.value)}
              className="p-3 border border-gray-300 rounded w-full"
              placeholder="Ej: 45200"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Nivel de Combustible</label>
            <select
              value={combustible}
              onChange={(e) => setCombustible(e.target.value)}
              className="p-3 border border-gray-300 rounded w-full"
            >
              <option value="">Seleccione...</option>
              <option value="Lleno">Lleno</option>
              <option value="3/4">3/4</option>
              <option value="1/2">1/2</option>
              <option value="1/4">1/4</option>
              <option value="Casi vacío">Casi vacío</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block font-medium mb-2">Razón Principal de Llegada</label>
            <textarea
              value={razonLlegada}
              onChange={(e) => setRazonLlegada(e.target.value)}
              className="p-3 border border-gray-300 rounded w-full"
              rows={4}
              placeholder="Describe la razón principal o síntomas del vehículo..."
            />
          </div>
          <button
            onClick={handleStartInspection}
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 w-full"
          >
            Comenzar Inspección
          </button>
        </div>
      )}
    </div>
  );
};

export default VehicleCheckFlow;
