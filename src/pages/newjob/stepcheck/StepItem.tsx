import React from "react";
import { 
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent
} from "@mui/material";
import { CheckItem } from "../types";

type StepItemProps = {
  item: string;
  itemIndex: number;
  items: CheckItem[];
  handleItemChange: (index: number, field: keyof CheckItem, value: string) => void;
};

const StepItem: React.FC<StepItemProps> = ({ item, itemIndex, items, handleItemChange }) => {
  const currentItem = items[itemIndex];

  const handleSelectChange = (field: keyof CheckItem) => (event: SelectChangeEvent) => {
    handleItemChange(itemIndex, field, event.target.value as string);
  };

  const handleTextChange = (field: keyof CheckItem) => (event: React.ChangeEvent<HTMLInputElement>) => {
    handleItemChange(itemIndex, field, event.target.value);
  };

  return (
    <Box 
      sx={{ 
        p: 3, 
        mb: 3, 
        border: 1, 
        borderColor: 'divider', 
        borderRadius: 1,
        backgroundColor: 'background.paper'
      }}
    >
      <Typography variant="h6" gutterBottom>
        {item}
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id={`estado-label-${itemIndex}`}>Estado</InputLabel>
        <Select
          labelId={`estado-label-${itemIndex}`}
          value={currentItem?.estado || ""}
          onChange={handleSelectChange("estado")}
          label="Estado"
        >
          <MenuItem value=""><em>Seleccione...</em></MenuItem>
          <MenuItem value="OK">OK</MenuItem>
          <MenuItem value="Requiere Atención">Requiere Atención</MenuItem>
          <MenuItem value="Requiere Reparación Urgente">Requiere Reparación Urgente</MenuItem>
          <MenuItem value="No Aplica">No Aplica</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Observaciones"
        value={currentItem?.observaciones || ""}
        onChange={handleTextChange("observaciones")}
        fullWidth
        multiline
        rows={3}
        sx={{ mb: 2 }}
      />

      {currentItem?.estado === "Requiere Atención" && (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id={`prioridad-label-${itemIndex}`}>Prioridad</InputLabel>
          <Select
            labelId={`prioridad-label-${itemIndex}`}
            value={currentItem?.prioridad || ""}
            onChange={handleSelectChange("prioridad")}
            label="Prioridad"
          >
            <MenuItem value=""><em>Seleccione...</em></MenuItem>
            <MenuItem value="Baja">Baja</MenuItem>
            <MenuItem value="Media">Media</MenuItem>
            <MenuItem value="Alta">Alta</MenuItem>
          </Select>
        </FormControl>
      )}
    </Box>
  );
};

export default StepItem;