import React, { useEffect, useState } from "react";
import {
  fetchCandidatesOnPageLoad,
  handleFavoriteClickAction,
} from "../../utils/helper.js";
import "../Page.css";
import { CardList } from "../../components/CardList/CardList";

export const Favorites = () => {
  const [candidates, setCandidatesFunction] = useState([]);

  useEffect(() => {
    runOnFavoritesPageLoad();
  }, []);

  const runOnFavoritesPageLoad = async () => {
    const fethedCandidates = await fetchCandidatesOnPageLoad();
    setCandidatesFunction(fethedCandidates);
  };

  const handleFavoriteClick = (candidateUuid) => {
    const newCandidates = handleFavoriteClickAction(candidateUuid, candidates);
    setCandidatesFunction(newCandidates);
  };

  return (
    <div id="favorites" className="page">
      <div className="page-title">Favorite candidates</div>
      <div className="page-subtitle">Gal</div>
      <CardList
        candidates={candidates}
        handleFavoriteClick={handleFavoriteClick}
        filterByFavorites={true}
      />
    </div>
  );
};
