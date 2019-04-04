import routes from '../../utils/routes';

const NAV_MENU = [
  {
    key: 2,
    name: 'Questions',
    path: routes.targetGroupList,
    icon: 'fund',
    permission: ['1'],
  },
  {
    key: 1,
    name: 'Categories',
    path: routes.categoriesList,
    icon: 'setting',
    permission: ['1'],
  },
  {
    key: 3,
    name: ' New User',
    path: routes.usersList,
    icon: 'plus',
    permission: ['2'],
  },
  {
    key: 4,
    name: 'Log Out',
    path: routes.logOut,
    icon: 'poweroff',
    permission: ['1'],
  },
];

export default NAV_MENU;
