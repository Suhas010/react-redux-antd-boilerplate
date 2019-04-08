const root = '/admin';
const dashboard = `${root}/dashboard`;
const routes = {
  root,
  dashboard,

  targetGroupList: `${dashboard}/target-groups`,
  targetGroupEdit: `${dashboard}/target-groups/edit/:targetID`,
  targetGroupAdd: `${dashboard}/target-groups/add`,

  questionList: `${dashboard}/:targetID/questions`,
  questionAdd: `${dashboard}/:targetID/questions/add`,
  questionEdit: `${dashboard}/:targetID/questions/edit/:questionID`,

  categoriesList: `${dashboard}/categories-list`,
  categoriesAdd: `${dashboard}/categories-list/add`,
  categoriesEdit: `${dashboard}/categories-list/:categoryID/edit`,

  subCategoriesList: `${dashboard}/category/:categoryID/sub-categories-list`,
  subCategoriesAdd: `${dashboard}/category/:categoryID/sub-categories-list/add`,
  subCategoriesEdit: `${dashboard}/category/:categoryID/sub-categories-list/:subCategoryID/edit`,

  usersList: `${dashboard}/users`,
  usersAdd: `${dashboard}/users/add`,
  usersEdit: `${dashboard}/users/:userID/edit`,

  moderateQuestion: `${dashboard}/moderate-question`,

  logOut: '/log-out',

};

export default routes;
