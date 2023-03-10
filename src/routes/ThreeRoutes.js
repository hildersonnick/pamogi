// import { lazy } from 'react';

// project import
// import Loadable from 'components/Loadable';
// import MinimalLayout from 'layout/MinimalLayout';
import App3d from '3d/App3d';

// render - login
// const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
// const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));

// ==============================|| AUTH ROUTING ||============================== //

const ThreeRoutes = {
    path: '/3d',
    element: <App3d />
    // children: [
    //     {
    //         path: 'login',
    //         element: <AuthLogin />
    //     },
    //     {
    //         path: 'register',
    //         element: <AuthRegister />
    //     }
    // ]
};

export default ThreeRoutes;
