import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Paper
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

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
    <Paper elevation={3} sx={{ p: 3, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h6" component="h3" gutterBottom>
        Ingrese la placa del vehículo
      </Typography>
      
      <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{ mt: 2 }}
      >
        <TextField
          fullWidth
          label="Placa del vehículo"
          variant="outlined"
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
          placeholder="Ejemplo: ABC-123"
          sx={{ mb: 2 }}
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
          size="large"
        >
          Buscar vehículo
        </Button>
      </Box>
    </Paper>
  );
};

export default StepPlaca;