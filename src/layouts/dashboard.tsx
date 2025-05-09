import * as React from 'react';
import { Outlet, useLocation, useParams, matchPath } from 'react-router';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import './styledashboard.css'


export default function Layout() {

  return (
    <DashboardLayout>
      <div className='outlet'>
      <Outlet />
      </div>
    </DashboardLayout>
  );
}