import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  CircularProgress,
  Alert,
  Container,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent
} from "@mui/material";
import {
  DirectionsCar as CarIcon,
  Build as BuildIcon,
  CheckCircle as CheckCircleIcon,
  Assignment as ReportIcon
} from "@mui/icons-material";
import StepPlaca from "./stepcheck/StepPlaca";
import StepVehicleData from "./stepcheck/StepVehicleData";
import StepItem from "./stepcheck/StepItem";
import StepFinal from "./stepcheck/StepFinal";
import { CheckItem } from "./types";

const CarInspectionWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [plate, setPlate] = useState<string>("");
  const [vehicleData, setVehicleData] = useState<any>(null);
  const [isPlateValid, setIsPlateValid] = useState<boolean>(false);
  const [items, setItems] = useState<CheckItem[]>([]);
  const [inspectionOption, setInspectionOption] = useState<string | null>(null);
  const [inspectionConfig, setInspectionConfig] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInspectionConfig = async () => {
      try {
        setLoading(true);
        const response = await fetch("/inspectionConfig.json");
        if (!response.ok) throw new Error("Error al cargar configuración");
        const data = await response.json();
        setInspectionConfig(data);
        setError(null);
      } catch (err) {
        console.error("Error:", err);
        setError("No se pudo cargar la configuración de inspección");
      } finally {
        setLoading(false);
      }
    };
    fetchInspectionConfig();
  }, []);

  const handlePlateSubmit = (plate: string) => {
    setPlate(plate);
    const plateRegex = /^[A-Z0-9]{6}$/;
    if (plateRegex.test(plate)) {
      setIsPlateValid(true);
      setVehicleData({
        marca: "Toyota",
        modelo: "Corolla",
        año: "2020",
        historialServicio: ["Cambio de aceite", "Reemplazo de frenos"],
        cliente: { nombre: "Juan Pérez", telefono: "123456789" }
      });
      setStep(2);
    } else {
      setIsPlateValid(false);
      setError("Formato de placa inválido");
    }
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };
    setItems(updatedItems);
  };

  const handleInspectionOptionChange = (option: string) => {
    setInspectionOption(option);
  
    const initialItems = inspectionConfig.steps.flatMap((step: any) =>
      step.items.map((item: any) => ({
        nombre: item.name,
        estado: "",
        observaciones: "",
        prioridad: "",
      }))
    );
  
    setItems(initialItems);
    setStep(3);
  };
  
  const handleShowResults = () => {
    setStep(inspectionConfig?.steps.length + 3);
  };

  const serviceOptions = [
    { name: "Checkeo General", icon: <CheckCircleIcon /> },
    { name: "Mantenimiento", icon: <BuildIcon /> },
    { name: "Autotrónica", icon: <CarIcon /> },
    { name: "Reemplazo de piezas", icon: <BuildIcon /> }
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!inspectionConfig) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="warning">No se encontró configuración de inspección</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Stepper activeStep={step - 1} alternativeLabel sx={{ mb: 4 }}>
          <Step>
            <StepLabel>Ingreso de Placa</StepLabel>
          </Step>
          <Step>
            <StepLabel>Datos del Vehículo</StepLabel>
          </Step>
          {inspectionOption && inspectionConfig.steps.map((stepItem: any, index: number) => (
            <Step key={index}>
              <StepLabel>{stepItem.stepName}</StepLabel>
            </Step>
          ))}
          <Step>
            <StepLabel>Resultados</StepLabel>
          </Step>
        </Stepper>

        {step === 1 && (
          <StepPlaca onPlateSubmit={handlePlateSubmit} />
        )}

        {step === 2 && vehicleData && isPlateValid && (
          <Box>
            <StepVehicleData vehicleData={vehicleData} setStep={setStep} setItems={setItems} />
            
            <Typography variant="h6" component="h3" sx={{ mt: 4, mb: 2 }}>
              Selección de Servicio
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Selecciona el tipo de servicio a realizar:
            </Typography>
            
            <Grid container spacing={2}>
              {serviceOptions.map((option) => (
                <Grid item xs={12} sm={6} md={3} key={option.name}>
                  <Card 
                    sx={{ 
                      cursor: 'pointer',
                      '&:hover': {
                        boxShadow: 3,
                        borderColor: 'primary.main'
                      }
                    }}
                    onClick={() => handleInspectionOptionChange(option.name)}
                  >
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Box sx={{ color: 'primary.main', fontSize: 40, mb: 1 }}>
                        {option.icon}
                      </Box>
                      <Typography variant="subtitle1">{option.name}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {inspectionOption === "Checkeo General" && inspectionConfig.steps[step - 3] && (
          <Box key={step}>
            <Typography variant="h5" component="h3" sx={{ mb: 3 }}>
              {inspectionConfig.steps[step - 3].stepName}
            </Typography>
            {inspectionConfig.steps[step - 3].items.map((item: any, itemIndex: number) => (
              <StepItem
                key={itemIndex}
                item={item.name}
                itemIndex={itemIndex}
                items={items}
                handleItemChange={handleItemChange}
              />
            ))}
          </Box>
        )}

        {step === inspectionConfig?.steps.length + 2 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              variant="contained"
              color="success"
              size="large"
              endIcon={<ReportIcon />}
              onClick={handleShowResults}
              sx={{ px: 4 }}
            >
              Ver Resultados
            </Button>
          </Box>
        )}

        {step === inspectionConfig?.steps.length + 3 && (
          <StepFinal items={items} />
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          {step > 2 && step < inspectionConfig?.steps.length + 3 && (
            <>
              {step > 3 && (
                <Button
                  variant="outlined"
                  onClick={() => setStep(step - 1)}
                >
                  Anterior
                </Button>
              )}
              {step < inspectionConfig?.steps.length + 2 && (
                <Button
                  variant="contained"
                  onClick={() => setStep(step + 1)}
                  sx={{ ml: 'auto' }}
                >
                  Siguiente
                </Button>
              )}
            </>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default CarInspectionWizard;