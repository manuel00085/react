import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Paper,
  Grid
} from "@mui/material";
import {
  DirectionsCar as CarIcon,
  CalendarToday as YearIcon,
  History as HistoryIcon,
  Person as PersonIcon,
  Phone as PhoneIcon
} from "@mui/icons-material";

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
  const initializeItems = () => {
    const initialItems = [
      { estado: "", observaciones: "", prioridad: "" },
      { estado: "", observaciones: "", prioridad: "" },
      { estado: "", observaciones: "", prioridad: "" },
    ];
    setItems(initialItems);
    setStep(prev => prev + 1);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Datos del Vehículo
      </Typography>

      <Grid container spacing={3}>
        {/* Información básica del vehículo */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CarIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="subtitle1">
              <strong>Marca:</strong> {vehicleData.marca}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CarIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="subtitle1">
              <strong>Modelo:</strong> {vehicleData.modelo}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <YearIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="subtitle1">
              <strong>Año:</strong> {vehicleData.año}
            </Typography>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          {/* Información del cliente */}
          <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
            Información del Cliente
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <PersonIcon color="secondary" sx={{ mr: 1 }} />
            <Typography variant="subtitle1">
              <strong>Nombre:</strong> {vehicleData.cliente.nombre}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PhoneIcon color="secondary" sx={{ mr: 1 }} />
            <Typography variant="subtitle1">
              <strong>Teléfono:</strong> {vehicleData.cliente.telefono}
            </Typography>
          </Box>
        </Grid>

        {/* Historial de servicio */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
            Historial de Servicio
          </Typography>
          
          {vehicleData.historialServicio.length > 0 ? (
            <List dense sx={{ 
              bgcolor: 'background.paper',
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider'
            }}>
              {vehicleData.historialServicio.map((servicio, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <HistoryIcon color="action" sx={{ mr: 2 }} />
                    <ListItemText primary={servicio} />
                  </ListItem>
                  {index < vehicleData.historialServicio.length - 1 && (
                    <Divider component="li" />
                  )}
                </React.Fragment>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No hay historial de servicio registrado
            </Typography>
          )}
        </Grid>
      </Grid>


    </Paper>
  );
};

export default StepVehicleData;