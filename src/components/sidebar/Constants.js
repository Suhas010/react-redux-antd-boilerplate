import routes from '../../utils/routes';

const NAV_MENU = [
  {
    key: 1,
    name: 'Menu 1',
    path: routes.dashboard,
    icon: 'file-search',
    permission: ['2', '4', '8'],
  },
  {
    key: 1,
    name: 'Menu 2',
    path: routes.dashboard,
    icon: 'fund',
    permission: ['2', '4', '8'],
  },
  {
    key: 2,
    name: 'Menu 3',
    path: routes.dashboard,
    icon: 'setting',
    permission: ['2', '4', '8'],
  },
  {
    key: 2,
    name: 'Menu 4',
    path: routes.dashboard,
    icon: 'heart',
    permission: ['4', '8'],
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
