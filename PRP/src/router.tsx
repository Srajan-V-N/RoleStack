import { createBrowserRouter } from 'react-router';
import { Landing } from '@/pages/Landing';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Dashboard } from '@/pages/Dashboard';
import { Practice } from '@/pages/Practice';
import { Assessments } from '@/pages/Assessments';
import { Resources } from '@/pages/Resources';
import { Profile } from '@/pages/Profile';
import { TestChecklist } from '@/pages/TestChecklist';
import { Ship } from '@/pages/Ship';
import { Proof } from '@/pages/Proof';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'practice', element: <Practice /> },
      { path: 'assessments', element: <Assessments /> },
      { path: 'resources', element: <Resources /> },
      { path: 'profile', element: <Profile /> },
    ],
  },
  {
    path: '/prp/07-test',
    element: <TestChecklist />,
  },
  {
    path: '/prp/08-ship',
    element: <Ship />,
  },
  {
    path: '/prp/proof',
    element: <Proof />,
  },
]);
