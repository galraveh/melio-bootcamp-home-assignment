import React, { useEffect, useState } from "react";
import {
  fetchCandidatesOnPageLoad,
  handleFavoriteClickAction,
} from "../../utils/helper.js";
import "../Page.css";
import { CardList } from "../../components/CardList/CardList";

export const Home = () => {
  const [candidates, setCandidatesFunction] = useState([]);

  useEffect(() => {
    runOnHomePageLoad();
  }, []);

  const runOnHomePageLoad = async () => {
    const fethedCandidates = await fetchCandidatesOnPageLoad();
    setCandidatesFunction(fethedCandidates);
  };

  const handleFavoriteClick = (candidateUuid) => {
    const newCandidates = handleFavoriteClickAction(candidateUuid, candidates);
    setCandidatesFunction(newCandidates);
  };

  return (
    <div id="home" className="page">
      <div className="page-title">Firm's candidates</div>
      <div className="page-subtitle">Gal</div>
      <CardList
        candidates={candidates}
        handleFavoriteClick={handleFavoriteClick}
        filterByFavorites={false}
      />
    </div>
  );
};
