import RequestHandler from '../../components/helpers/RequestHandler';

// get list of target groups
export function getQuestions(targetGroupID) {
  return RequestHandler.get(`/target_groups/${targetGroupID}/questions`);
}

// get target group
export function getQuestion(targetGroupID, questionID) {
  return RequestHandler.get(`/target_groups/${targetGroupID}/questions/${questionID}`);
}

// save new target group
export function saveQuestion(targetGroupID, payload) {
  return RequestHandler.post(`/target_groups/${targetGroupID}/questions`, payload);
}

// save new target group
export function updateQuestion(targetGroupID, payload) {
  return RequestHandler.put(`/target_groups/${targetGroupID}/questions`, payload);
}
