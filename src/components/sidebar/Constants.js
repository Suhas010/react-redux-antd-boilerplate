import routes from '../../utils/routes';

const NAV_MENU = [
  {
    key: 1,
    name: 'Dashboard',
    path: routes.dashboard,
    icon: 'pie-chart',
  },
  {
    key: 2,
    name: 'Add Questions',
    path: routes.targetGroupList,
    icon: 'fund',
  },
  {
    key: 1,
    name: 'Moderator',
    path: routes.moderator,
    icon: 'like',
  },
];

export default NAV_MENU;
