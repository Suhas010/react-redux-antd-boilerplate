import routes from '../../utils/routes';

const NAV_MENU = [
  {
    key: 2,
    name: 'Questions',
    path: routes.targetGroupList,
    icon: 'fund',
  },
  {
    key: 1,
    name: 'Categories',
    path: routes.categoriesList,
    icon: 'setting',
  },
  // {
  //   key: 3,
  //   name: ' New User',
  //   path: routes.usersList,
  //   icon: 'plus',
  // },
  {
    key: 4,
    name: 'Log Out',
    path: routes.logOut,
    icon: 'poweroff',
  },
];

export default NAV_MENU;
