import BaseModel from '../BaseModel';

export default class CategoriesModel extends BaseModel {
  static resource = 'categories';

  constructor(properties) {
    super(properties);
  }
}
