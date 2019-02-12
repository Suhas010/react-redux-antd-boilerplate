import BaseModel from '../BaseModel';

export default class TargetGroupModel extends BaseModel {
  static resource = 'target_group';
  constructor(properties) {
    super(properties);
  }
}
