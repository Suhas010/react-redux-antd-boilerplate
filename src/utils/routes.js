const routes = {
  dashboard: '/admin/dashboard',

  targetGroupList: '/admin/dashboard/target-groups',
  targetGroupEdit: '/admin/dashboard/target-groups/edit/:targetID',
  targetGroupAdd: '/admin/dashboard/target-groups/add',

  questionList: '/admin/dashboard/:targetID/questions',
  questionAdd: '/admin/dashboard/:targetID/questions/add',
  questionEdit: '/admin/dashboard/:targetID/questions/edit/:questionID',

  moderator: '/admin/dashboard/moderator',
};

export default routes;
