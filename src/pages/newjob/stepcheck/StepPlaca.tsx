import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  onPlateSubmit: (plate: string) => void;
};

const StepPlaca: React.FC<Props> = ({ onPlateSubmit }) => {
  const [plate, setPlate] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (plate.trim()) {
      onPlateSubmit(plate);
      setError("");
    } else {
      setError("Por favor ingresa la placa del vehículo");
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 0, maxWidth: 650, mx: "auto", my: 10 }}>
      <Typography variant="h6" component="h3" gutterBottom>
        Ingrese la placa del vehículo
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Placa del vehículo"
          variant="outlined"
          value={plate}
          onChange={(e) => {
            const value = e.target.value.toUpperCase(); // Convertir a mayúsculas
            if (/^[A-Z0-9]*$/.test(value)) {
              // Permitir solo letras mayúsculas y números
              setPlate(value);
            }
          }}
          placeholder="Ejemplo: ABC123"
          sx={{ mb: 2, mt: 2 }}
          inputProps={{ maxLength: 10 }} // Limitar la cantidad de caracteres
        />

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          fullWidth
          size="medium"
          sx={{
            marginTop: 3,
          }}
        >
          Buscar vehículo
        </Button>
      </Box>
    </Paper>
  );
};

export default StepPlaca;
