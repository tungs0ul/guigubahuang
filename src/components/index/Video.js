import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./ShowCase.css";

function Video({ id, title, thumbnail, autor, changeVideo }) {
  const displayVideo = (e) => {
    changeVideo(id);
    window.scrollTo(0, 0);
  };
  return (
    <div className="videoCard zoom">
      <h3 className="videoCard__title">{title}</h3>
      <div className="videoCard__img">
        <LazyLoadImage
          src={thumbnail}
          alt={id}
          onClick={displayVideo}
          effect="blur"
        />
      </div>
    </div>
  );
}

export default Video;
