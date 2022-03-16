import React from "react";
import { FavoriteIcon } from "../FavoriteIcon/FavoriteIcon";
import "./Card.css";

export const Card = ({ candidate, handleFavoriteClick }) => {
  return (
    <div className="card">
      <img className="card-image" src={candidate.picture} />
      <div className="card-inner">
        <div className="card-header">
          <div className="card-name">
            {`${candidate.firstName} ${candidate.lastName}`}
          </div>
          {candidate.isPreferred && (
            <div className="preferred-pill">PREFERRED</div>
          )}
        </div>
        <div className="card-info">{candidate.email}</div>
        <div className="card-info">
          {`${candidate.city}, ${candidate.country}`}
        </div>
      </div>
      <div
        className="card-favorite-wrapper"
        onClick={(e) => {
          e.stopPropagation();
          handleFavoriteClick(candidate.uuid);
        }}
      >
        <FavoriteIcon isFavorite={candidate.isFavorite} />
      </div>
    </div>
  );
};
