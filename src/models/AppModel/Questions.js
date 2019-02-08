import BaseModel from '../BaseModel';

export default class QuestionModel extends BaseModel {
  static resource = 'questions';
  constructor(properties) {
    super(properties);
  }
}
