import RequestHandler from '../../components/helpers/RequestHandler';

export function getSubInterests(interestsID, subInterestsID = '') {
  const action = subInterestsID ? `/interests/${interestsID}/subinterests/${subInterestsID}` : `/interests/${interestsID}/subinterests`;
  return RequestHandler.profileGet(action);
}

export function addSubInterest(interestsID, payload) {
  return RequestHandler.profilePost(`/interests/${interestsID}/subinterests`, payload);
}

export function updateSubInterest(interestsID, subInterestsID, payload) {
  return RequestHandler.profilePut(`/interests/${interestsID}/subinterests/${subInterestsID}`, payload);
}

export function deleteSubInterest(subInterestsID) {
  return RequestHandler.profileDelete(`/interests/${subInterestsID}`);
}
