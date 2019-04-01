import BaseModel from '../BaseModel';

export default class UserModel extends BaseModel {
  static resource = 'user';
  constructor(properties) {
    super(properties);
  }
}
