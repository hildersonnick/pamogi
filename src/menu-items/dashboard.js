// assets
import { DashboardOutlined } from '@ant-design/icons';
import { CheckSquareOutlined } from '@ant-design/icons';
import { BulbOutlined } from '@ant-design/icons';
import { DollarCircleOutlined } from '@ant-design/icons';
import { UnorderedListOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined,
    CheckSquareOutlined,
    BulbOutlined,
    DollarCircleOutlined,
    UnorderedListOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'group-dashboard',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Project Dashboard',
            type: 'item',
            url: '/',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        },
        // {
        //     id: 'projects',
        //     title: 'Projects',
        //     type: 'item',
        //     url: '/dashboard/projects',
        //     icon: icons.UnorderedListOutlined,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'tasks',
        //     title: 'Tasks',
        //     type: 'item',
        //     url: '/',
        //     icon: icons.CheckSquareOutlined,
        //     breadcrumbs: false
        // },
        {
            id: 'contributions',
            title: 'Collaboration Invites',
            type: 'item',
            url: '/invites',
            icon: icons.BulbOutlined,
            breadcrumbs: false
        }
        // {
        //     id: 'investments',
        //     title: 'Investments',
        //     type: 'item',
        //     url: '/',
        //     icon: icons.DollarCircleOutlined,
        //     breadcrumbs: false
        // }
    ]
};

export default dashboard;
