const routes = {
  dashboard: '/admin/dashboard',

  targetGroupList: '/admin/dashboard/target-groups',
  targetGroupEdit: '/admin/dashboard/target-groups/edit/:targetID',
  targetGroupAdd: '/admin/dashboard/target-groups/add',

  questionList: '/admin/dashboard/:targetID/questions',
  questionAdd: '/admin/dashboard/:targetID/questions/add',
  questionEdit: '/admin/dashboard/:targetID/questions/edit/:questionID',

  categoriesList: '/admin/dashboard/categories-list',
  categoriesAdd: '/admin/dashboard/categories-list/add',
  categoriesEdit: '/admin/dashboard/categories-list/:categoryID/edit',

};

export default routes;
