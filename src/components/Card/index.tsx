import React from "react";
import { CardProps } from "./interface";
import './card.scss'

const Card: React.FC<CardProps> = ({ name, lastname, img, email }) => {
  return (
    <article className="card">
      <img className="card-img" src={img} alt={`${name}'s photo`} />
      <div className="card-body">
        <h3 className="user-info">{name} {lastname}</h3>
        <h3 className="user-info">email: <a href={`mailto:${email}`}>{email}</a> </h3>
      </div>
    </article>

  )
};

export { Card }

