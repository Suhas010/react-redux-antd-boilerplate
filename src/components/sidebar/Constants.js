import routes from '../../utils/routes';

const NAV_MENU = [
  {
    key: 1,
    name: 'Questions',
    path: routes.targetGroupList,
    icon: 'fund',
    permission: ['2', '4', '8'],
  },
  {
    key: 2,
    name: 'Categories',
    path: routes.categoriesList,
    icon: 'setting',
    permission: ['2', '4', '8'],
  },
  {
    key: 2,
    name: 'Interest',
    path: routes.interestList,
    icon: 'heart',
    permission: ['4', '8'],
  },
  {
    key: 3,
    name: ' New User',
    path: routes.usersList,
    icon: 'plus',
    permission: ['8'],
  },
  {
    key: 4,
    name: 'Log Out',
    path: routes.logOut,
    icon: 'poweroff',
    permission: ['2', '4', '8'],
  },
];

export default NAV_MENU;
