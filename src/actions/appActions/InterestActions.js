import RequestHandler from '../../components/helpers/RequestHandler';

export function getInterests(interestsID = '') {
  const action = interestsID ? `/interests/${interestsID}` : '/interests';
  return RequestHandler.profileGet(action);
}

export function addInterest(payload) {
  return RequestHandler.profilePost('/interests', payload);
}

export function updateInterest(interestsID, payload) {
  return RequestHandler.profilePut(`/interests/${interestsID}`, payload);
}

export function deleteInterest(interestsID) {
  return RequestHandler.profileDelete(`/interests/${interestsID}`);
}
