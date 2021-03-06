import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function DestinyCard({ name, description, img }) {
  return (
    <div className="destinyCard zoom">
      <h3 className="destiny__title">{name.slice(0, name.length - 1)}</h3>
      <LazyLoadImage
        className="destiny__img"
        src={
          img.length
            ? img
            : "https://firebasestorage.googleapis.com/v0/b/guiguwiki.appspot.com/o/Untitled.png?alt=media&token=be54af1b-1616-4748-b9b4-b5c2888b4813"
        }
        alt="guigubahuang"
        effect="blur"
      />
      <div className="destiny__description overflow">{description}</div>
    </div>
  );
}

export default DestinyCard;
