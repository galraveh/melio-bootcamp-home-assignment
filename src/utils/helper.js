import { fetchCandidates } from "./API.js";

export const getPersistentCandidatesData = () => {
  return JSON.parse(window.localStorage.getItem('candidates'));
}

export const setPersistentCandidatesData = (candidates) => {
  window.localStorage.setItem('candidates', JSON.stringify(candidates));
}

export const transformCandidatesData = (candidates) => {

  const transCandidatesArray = candidates.map( (candidate) => {
    const isPreferred = ( candidate.nat === "GB" || candidate.nat === "US" );

    return {
      firstName: candidate.name.first,
			lastName: candidate.name.last,
			email: candidate.email,
			city: candidate.location.city,
			country: candidate.location.country,
			picture: candidate.picture.thumbnail,
			uuid: candidate.login.uuid,
			isFavorite: false,
			isPreferred,
    };
  })

  return candidatesGroupBy(transCandidatesArray);
}

const candidatesGroupBy = (candidatesArray) => { 

 return candidatesArray.reduce((acc, cur) => {    
    let group = cur.firstName[0]; 

    if(!acc[group]) {
      acc[group] = [];
    } 

    acc[group].push(cur); 
    
    return acc;
  }, {})
} 

export const fetchCandidatesOnPageLoad = async () => { 
  const data = getPersistentCandidatesData();
    if (data) {
      return data;
    } else {
      const fetchedData = await fetchCandidates();
      const transformedData = transformCandidatesData(fetchedData);
      setPersistentCandidatesData(transformedData);

      return transformedData;
    }
 } 

 export const handleFavoriteClickAction = (candidateUuid, candidates) => {
  let group = "";
  let index = -1;

  for (let key in candidates) {
    index = candidates[key].findIndex(
      (candidate) => candidate.uuid === candidateUuid
    );

    if (index !== -1) {
      group = key;
      break;
    }
  }

  if (group !== "" && index !== -1) {
    const groupCandidates = candidates[group].map((candidate, i) => {
      if (i === index) {
        return { ...candidate, isFavorite: !candidate.isFavorite };
      } else {
        return candidate;
      }
    });

    const newCandidates = {
      ...candidates,
      [group]: groupCandidates,
    };

    setPersistentCandidatesData(newCandidates);
    return newCandidates;
  }

  return candidates;
};

 export const detectMobile = () => {

  const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
  ];
  
  return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
  });
}