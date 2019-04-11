import BaseModel from '../BaseModel';

export default class InterestsModel extends BaseModel {
  static resource = 'interests';
  constructor(properties) {
    super(properties);
  }
}
