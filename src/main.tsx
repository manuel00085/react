import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './App';
import Layout from './layouts/dashboard';

import CarInspectionWizard from './pages/newjob/CarInspectionWizard';
import EmployeeForm from "./pages/empleados/createEmployer"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/Home"


const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: '/',
        Component: Layout,
        children: [
          {index: true,
            Component:HomePage
          },
          {
            path: "home",
            Component: HomePage

          },
          {
            path: 'Mecanicos/nuevo',
            Component: EmployeeForm
          },
          {
            path: 'placa',
            Component: CarInspectionWizard
          },
        
        
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);