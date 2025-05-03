import React from 'react';
import { 
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
  useTheme
} from '@mui/material';
import {
  People as PeopleIcon,
  CarRepair as WorkshopIcon,
  TrendingUp as TrendingIcon,
  Assessment as ReportsIcon
} from '@mui/icons-material';

const HomePage = () => {
  const theme = useTheme();

  // Datos de ejemplo para las métricas
  const metrics = [
    { 
      title: 'Mecánicos Registrados', 
      value: 24, 
      change: +12, 
      icon: <PeopleIcon fontSize="large" />,
      color: theme.palette.primary.main
    },
    { 
      title: 'Talleres Activos', 
      value: 8, 
      change: +2, 
      icon: <WorkshopIcon fontSize="large" />,
      color: theme.palette.secondary.main
    },
    { 
      title: 'Eficiencia General', 
      value: 87, 
      change: +5, 
      icon: <TrendingIcon fontSize="large" />,
      color: theme.palette.success.main,
      isPercentage: true
    },
    { 
      title: 'Órdenes este Mes', 
      value: 156, 
      change: -8, 
      icon: <ReportsIcon fontSize="large" />,
      color: theme.palette.warning.main
    }
  ];

  return (
    <Box sx={{ p: 3 }}>


      <Grid container spacing={3}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3,
                borderRadius: 2,
                borderLeft: `4px solid ${metric.color}`
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography 
                    variant="subtitle2" 
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {metric.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h4" sx={{ mr: 1 }}>
                      {metric.value}
                      {metric.isPercentage && '%'}
                    </Typography>
                    <Typography 
                      variant="body2"
                      sx={{
                        color: metric.change >= 0 ? theme.palette.success.main : theme.palette.error.main,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      {metric.change >= 0 ? '↑' : '↓'} {Math.abs(metric.change)}%
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ 
                  color: metric.color,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  {metric.icon}
                </Box>
              </Box>

              {/* Gráfico de progreso simple */}
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Progreso mensual
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: '100%', mr: 1 }}>
                    <CircularProgress 
                      variant="determinate" 
                      value={Math.min(metric.value, 100)} 
                      size={20}
                      thickness={6}
                      sx={{ color: metric.color }}
                    />
                  </Box>
                  <Typography variant="caption">
                    {Math.min(metric.value, 100)}%
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Gráfico de ejemplo adicional */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '300px' }}>
            <Typography variant="h6" gutterBottom>
              Órdenes por Taller (últimos 30 días)
            </Typography>
            <Box sx={{ 
              height: 'calc(100% - 40px)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              bgcolor: theme.palette.grey[100],
              borderRadius: 1
            }}>
              <Typography color="text.secondary">
                [Aquí iría un gráfico de barras]
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '300px' }}>
            <Typography variant="h6" gutterBottom>
              Talleres con mejor rendimiento
            </Typography>
            <Box sx={{ 
              height: 'calc(100% - 40px)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              bgcolor: theme.palette.grey[100],
              borderRadius: 1
            }}>
              <Typography color="text.secondary">
                [Aquí iría un gráfico circular]
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;