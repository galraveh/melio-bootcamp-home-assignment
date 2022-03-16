const FETCH_CANDIDATES_URL =
  "https://randomuser.me/api/?seed=abcd&nat=us,dk,fr,gb&results=50&page=1";

export const fetchCandidates = async () => {
  return fetch(FETCH_CANDIDATES_URL)
  .then(res => res.json())
  .then( 
    (resultJson) => {
      if(resultJson && resultJson.results) {
        return resultJson.results;
      }
      return [];
    });
}
