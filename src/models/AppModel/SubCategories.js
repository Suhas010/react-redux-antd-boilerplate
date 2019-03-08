import BaseModel from '../BaseModel';

export default class CategoriesModel extends BaseModel {
  static resource = 'sub-categories';

  constructor(properties) {
    super(properties);
  }
}
