import BaseModel from '../BaseModel';

export default class SubCategoriesModel extends BaseModel {
  static resource = 'sub-categories';

  constructor(properties) {
    super(properties);
  }
}
