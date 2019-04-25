import routes from '../../utils/routes';

const NAV_MENU = [
  {
    key: 1,
    name: 'Search',
    path: routes.dashboard,
    icon: 'file-search',
    permission: ['2', '4', '8'],
  },
  {
    key: 1,
    name: 'Questions',
    path: routes.dashboard,
    icon: 'fund',
    permission: ['2', '4', '8'],
  },
  {
    key: 2,
    name: 'Categories',
    path: routes.dashboard,
    icon: 'setting',
    permission: ['2', '4', '8'],
  },
  {
    key: 2,
    name: 'Interest',
    path: routes.dashboard,
    icon: 'heart',
    permission: ['4', '8'],
  },
  {
    key: 3,
    name: ' New User',
    path: routes.dashboard,
    icon: 'plus',
    permission: ['8'],
  },
  {
    key: 4,
    name: 'Log Out',
    path: routes.dashboard,
    icon: 'poweroff',
    permission: ['2', '4', '8'],
  },
];

export default NAV_MENU;
