import React, { useMemo } from "react";
import { Card } from "../Card/Card";
import "./CardList.css";

export const CardList = ({
  candidates,
  handleFavoriteClick,
  filterByFavorites,
}) => {
  const candidatesArray = useMemo(() => {
    let arr = [];

    for (let key in candidates) {
      if (filterByFavorites) {
        arr = arr.concat(
          candidates[key].filter((candidate) => candidate.isFavorite)
        );
      } else {
        arr = arr.concat(candidates[key]);
      }
    }

    return arr;
  }, [candidates]);

  const emptyText = useMemo(() => {
    if (filterByFavorites) {
      return "You don't have any favorite candidates yet";
    }
    return "No candidates found";
  }, [filterByFavorites]);

  return (
    <div>
      {candidatesArray && candidatesArray.length > 0 ? (
        <div className="card-list">
          {candidatesArray.map((candidate, index) => {
            return (
              <div className="card-wrapper" key={`candidate${index}`}>
                <Card
                  candidate={candidate}
                  handleFavoriteClick={handleFavoriteClick}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="no-list-text">{emptyText}</div>
      )}
    </div>
  );
};
