import  { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import ClientList from '../views/clients/ClientList';
import ClientForm from '../views/clients/ClientForm';
import ProtectedRoute from '../components/ProtectedRoute'; // Import ProtectedRoute
/* ***Layouts**** */
const FullLayout = lazy(() => import('../layouts/full/FullLayout'));
const BlankLayout = lazy(() => import('../layouts/blank/BlankLayout'));

/* ****Pages***** */
const Dashboard = lazy(() => import('../views/dashboard/Dashboard'));
const SamplePage = lazy(() => import('../views/sample-page/SamplePage'));
const Icons = lazy(() => import('../views/icons/Icons'));
const TypographyPage = lazy(() => import('../views/utilities/TypographyPage'));
const Shadow = lazy(() => import('../views/utilities/Shadow'));
const Error = lazy(() => import('../views/authentication/Error'));
const Register = lazy(() => import('../views/authentication/Register'));
const Login = lazy(() => import('../views/authentication/Login'));

// system component path
const HistoryList = lazy(() => import('../views/history/HistoryList'));
const HistoryForm = lazy(() => import('../views/history/HistoryForm'));

const UserList = lazy(() => import('../views/users/UserList'));
const UserForm = lazy(() => import('../views/users/UserForm'));

const LeadershipList = lazy(() => import('../views/leadership/LeadershipList'));
const LeadershipForm = lazy(() => import('../views/leadership/LeadershipForm'));

const MissionList = lazy(() => import('../views/mission/MissionList'));
const MissionForm = lazy(() => import('../views/mission/MissionForm'));

const PartnershipList = lazy(() => import('../views/partnership/PartnershipList'));
const PartnershipForm = lazy(() => import('../views/partnership/PartnershipForm'));

const ServicesList = lazy(() => import('../views/services/ServicesList'));
const ServicesForm = lazy(() => import('../views/services/ServicesForm'));

const SlidersList = lazy(() => import('../views/sliders/SlidersList'));
const SlidersForm = lazy(() => import('../views/sliders/SlidersForm'));

const BasicTable = lazy(() => import('../views/tables/BasicTable'));
const ExAutoComplete = lazy(() =>
  import('../views/form-elements/ExAutoComplete')
);
const ExButton = lazy(() => import('../views/form-elements/ExButton'));
const ExCheckbox = lazy(() => import('../views/form-elements/ExCheckbox'));
const ExRadio = lazy(() => import('../views/form-elements/ExRadio'));
const ExSlider = lazy(() => import('../views/form-elements/ExSlider'));
const ExSwitch = lazy(() => import('../views/form-elements/ExSwitch'));
const FormLayouts = lazy(() => import('../views/form-layouts/FormLayouts'));

const Router = [
  {
    path: '/',
    element: <ProtectedRoute />, // Wrap FullLayout routes with ProtectedRoute
    children: [
      {
        element: <FullLayout />,
        children: [
          { path: '/', element: <Navigate to="/dashboard" /> },
          { path: '/dashboard', exact: true, element: <Dashboard /> },
          { path: '/sample-page', exact: true, element: <SamplePage /> },
          { path: '/icons', exact: true, element: <Icons /> },
          { path: '/ui/typography', exact: true, element: <TypographyPage /> },
          { path: '/ui/shadow', exact: true, element: <Shadow /> },
          { path: '/tables/basic-table', element: <BasicTable /> },
          { path: '/form-layouts', element: <FormLayouts /> },
          { path: '/form-elements/autocomplete', element: <ExAutoComplete /> },
          { path: '/form-elements/button', element: <ExButton /> },
          { path: '/form-elements/checkbox', element: <ExCheckbox /> },
          { path: '/form-elements/radio', element: <ExRadio /> },
          { path: '/form-elements/slider', element: <ExSlider /> },
          { path: '/form-elements/switch', element: <ExSwitch /> },
          { path: '/clients', element: <ClientList /> },
          { path: '/clients/create', element: <ClientForm /> },
          { path: '/clients/edit/:id', element: <ClientForm /> },
          { path: '/users', element: <UserList /> },
          { path: '/users/create', element: <UserForm /> },
          { path: '/users/edit/:id', element: <UserForm /> },
          { path: '/history', element: <HistoryList /> },
          { path: '/history/create', element: <HistoryForm /> },
          { path: '/history/edit/:id', element: <HistoryForm /> },
          { path: '/leadership', element: <LeadershipList /> },
          { path: '/leadership/create', element: <LeadershipForm /> },
          { path: '/leadership/edit/:id', element: <LeadershipForm /> },
          { path: '/mission', element: <MissionList /> },
          { path: '/mission/create', element: <MissionForm /> },
          { path: '/mission/edit/:id', element: <MissionForm /> },
          { path: '/partnership', element: <PartnershipList /> },
          { path: '/partnership/create', element: <PartnershipForm /> },
          { path: '/partnership/edit/:id', element: <PartnershipForm /> },
          { path: '/services', element: <ServicesList /> },
          { path: '/services/create', element: <ServicesForm /> },
          { path: '/services/edit/:id', element: <ServicesForm /> },
          { path: '/sliders', element: <SlidersList /> },
          { path: '/sliders/create', element: <SlidersForm /> },
          { path: '/sliders/edit/:id', element: <SlidersForm /> },
          { path: '*', element: <Navigate to="/auth/404" /> },
        ],
      },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

const router = createBrowserRouter(Router);

export default router;