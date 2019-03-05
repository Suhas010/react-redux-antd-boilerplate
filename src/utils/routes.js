const routes = {
  dashboard: '/dashboard',

  targetGroupList: '/dashboard/target-groups',
  targetGroupEdit: '/dashboard/target-groups/edit/:targetID',
  targetGroupAdd: '/dashboard/target-groups/add',

  questionList: '/dashboard/:targetID/questions',
  questionAdd: '/dashboard/:targetID/questions/add',
  questionEdit: '/dashboard/:targetID/questions/edit/:questionID',

  moderator: '/dashboard/moderator',
};

export default routes;
