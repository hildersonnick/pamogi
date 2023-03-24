import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import App3d from '3d/App3d';
import DashboardDefault from 'pages/dashboard/index';
import CreateProject from 'tal/CreateProject';
import PocketBase from 'pocketbase';
import LoginPortal from 'tal/LoginPortal';

// render - dashboard
// const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
// const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
// const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
// const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
// const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
// const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// ==============================|| MAIN ROUTING ||============================== //

const pb = new PocketBase('http://127.0.0.1:8090');

// console.log(pb.authStore.isValid);

const MainRoutes = {
    path: '/',
    element: pb.authStore.isValid ? <MainLayout /> : <LoginPortal />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/project/:projectId',
            element: <DashboardDefault />
        },
        {
            path: '/create',
            element: <CreateProject />
        }

        // {
        //     path: 'color',
        //     element: <Color />
        // },
        // {
        //     path: 'dashboard',
        //     children: [
        //         {
        //             path: 'default',
        //             element: <DashboardDefault />
        //         }
        //     ]
        // }
        //     {
        //         path: 'sample-page',
        //         element: <SamplePage />
        //     },
        //     {
        //         path: 'shadow',
        //         element: <Shadow />
        //     },
        //     {
        //         path: 'typography',
        //         element: <Typography />
        //     },
        //     {
        //         path: 'icons/ant',
        //         element: <AntIcons />
        //     }
    ]
    // path: '/3d',
    // element: <App3d />
};

export default MainRoutes;
