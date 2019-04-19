import RequestHandler from '../../components/helpers/RequestHandler';

// get list of target groups
export function getQuestions(targetGroupID, payload, pagination = '') {
  return RequestHandler.post(`/target_groups/${targetGroupID}/questions/search${pagination}`, payload);
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
export function updateQuestion(targetGroupID, questionID, payload) {
  return RequestHandler.put(`/target_groups/${targetGroupID}/questions/${questionID}`, payload);
}

export function getSimilarQuestions(targetGroupID, payload) {
  return RequestHandler.post(`/target_groups/${targetGroupID}/questions/similar`, payload);
}

export function changeQuestionState(targetGroupID, questionID, state) {
  return RequestHandler.put(`/target_groups/${targetGroupID}/questions/${questionID}/${state}`);
}
