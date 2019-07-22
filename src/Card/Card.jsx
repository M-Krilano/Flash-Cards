import React from "react";
import "./Card.css";

const Card = props => (
  <div className="card-container" style={{ marignTop: 50 }}>
    <div className="card">
      <div className="front">
        <div className="key_term">{props.key_term}</div>
      </div>
      <div className="back">
        <div className="definition">{props.definition}</div>
      </div>
    </div>
  </div>
);

export default Card;
