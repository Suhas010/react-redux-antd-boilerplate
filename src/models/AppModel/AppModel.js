import BaseModel from '../BaseModel';

export default class AppModel extends BaseModel {
  static resource = 'app-model';
  constructor(properties) {
    super(properties);
  }
}
