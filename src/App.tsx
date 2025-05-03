import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import { Outlet } from 'react-router-dom';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Principal',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'dashboard',
    title: 'Busqueda por placa',
    icon: <DashboardIcon />,
  },
  {
    kind: 'header',
    title: 'Gestión de Talleres',
  },
  {
    segment: 'talleres',
    title: 'Talleres',
    icon: <PersonIcon />,
    children: [
      {
        segment: 'nuevo',
        title: 'Nuevo Taller',
        icon: <PersonIcon />,
      },
      {
        segment: 'lista',
        title: 'Lista de Talleres',
        icon: <PeopleIcon />,
      },
      {
        segment: 'Metricas',
        title: 'Rendimiento de los Talleres',
        icon: <PeopleIcon />,
      },
    ],
  },
  {
    kind: 'header',
    title: 'Gestión de Personal',
  },
  {
    segment: 'empleados',
    title: 'Empleados',
    icon: <PersonIcon />,
    children: [
      {
        segment: 'nuevo',
        title: 'Nuevo Ingreso',
        icon: <PersonIcon />,
      },
      {
        segment: 'lista',
        title: 'Lista de Empleados',
        icon: <PeopleIcon />,
      },
      {
        segment: 'Metricas',
        title: 'Rendimiento de Empleados',
        icon: <PeopleIcon />,
      },
    ],
  },
  
  {
    kind: 'header',
    title: 'Estadisticas globales',
  },
  {
    segment: 'empleados',
    title: 'Empleados',
    icon: <PersonIcon />,
    children: [
      {
        segment: 'nuevo',
        title: 'Nuevo Ingreso',
        icon: <PersonIcon />,
      },
      {
        segment: 'lista',
        title: 'Lista de Empleados',
        icon: <PeopleIcon />,
      },
      {
        segment: 'Metricas',
        title: 'Rendimiento de Empleados',
        icon: <PeopleIcon />,
      },
    ],
  },
  {
    kind: 'header',
    title: 'Configuración',
  },
  {
    segment: 'config',
    title: 'Usuarios y Roles',
    icon: <SettingsIcon />,
    children: [
      {
        segment: 'roles',
        title: 'Roles del Sistema',
        icon: <AdminPanelSettingsIcon />,
      },
    ],
  },
];

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function PageContent({ pathname }: { pathname: string }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>Contenido para {pathname}</Typography>
    </Box>
  );
}

interface Props {
  window?: () => Window;
}

export default function App(props: Props) {
  const { window } = props;

  const router = useDemoRouter('/dashboard'); // ruta inicial
  const currentWindow = window !== undefined ? window() : undefined;

  return (
    <ReactRouterAppProvider 
      navigation={NAVIGATION}
      router={router}
      theme={theme}
      window={currentWindow}
      branding={{ title: 'Lycos Team' }}
    >
      <DashboardLayout>
      <Outlet />
      </DashboardLayout>
    </ReactRouterAppProvider >
  );
}
