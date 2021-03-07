import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import "./ShowCase.css";
import Video from "./Video";
import axios from "axios";
import useFireStore, { writeFireStore } from "../../firebase/hooks";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useAuth } from "../../provider/AuthProvider";
import { useLanguage } from "../../provider/LanguageProvider";

import { splitArray } from "../../utils";

function ShowCase() {
  const [video, setVideo] = useState("QxxKRpWC3x4");
  const [blocking, setBlocking] = useState(false);
  const { getText } = useLanguage();
  useEffect(() => {
    if (blocking) {
      const timer = setTimeout(() => {
        setBlocking(false);
      }, 60000);
      return () => clearTimeout(timer);
    }
  }, [blocking]);

  const { currentUser } = useAuth();

  const linkRef = useRef();

  const [itemsPerRow, setItemsPerRow] = useState(
    Math.floor((window.innerWidth * 0.7) / 400)
  );

  const handleSubmit = (e) => {
    if (blocking) {
      alert(getText("fastError"));
      return;
    }
    if (!currentUser) {
      alert(getText("loginError"));
      return;
    }
    let link = linkRef.current.value;
    if (!link) {
      alert(getText("invalid"));
      linkRef.current.value = "";
      return;
    }
    link = link.replace("https://", "");
    link = link.split("/")[1];
    if (!link) {
      alert(getText("invalid"));
      linkRef.current.value = "";
      return;
    }
    if (link.includes("&")) {
      let temp = link.split("&").filter((e) => e.includes("v="));
      link = temp[0];
    }
    link = link.replace("watch?v=", "");
    writeFireStore("videos", {
      like: 0,
      view: 0,
      id: link,
      check: false,
    });
    alert(getText("thanksError"));
    setBlocking(true);
    linkRef.current.value = "";
  };

  const handleResize = () => {
    setItemsPerRow(Math.floor((window.innerWidth * 0.7) / 400));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const videos = useFireStore("videos");

  const [videosInfo, setVideosInfo] = useState([]);
  useEffect(() => {
    let url = "https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet";
    if (videos?.length) {
      videos.forEach((e) => (url += "&id=" + e.id));
      url += "&key=" + process.env.REACT_APP_YOUTUBE_API_KEY;
      axios.get(url).then((rsp) => {
        setVideosInfo(splitArray(rsp.data.items, itemsPerRow));
      });
    }
  }, [videos, itemsPerRow]);

  const changeVideo = (id) => {
    setVideo(id);
  };

  return (
    <div>
      <div className="video">
        <div className="video__upload">
          <div className="video__a">
            <div className="video__upload__link">
              <TextField label="Youtube Link" inputRef={linkRef} />
            </div>
            <div className="video__upload__button">
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </div>
        <div className="video__video">
          <ReactPlayer url={"https://youtu.be/" + video} controls />
        </div>
      </div>
      <div className="videos autoflow">
        {videosInfo.map((info, idx) => (
          <div className="videos__row" key={idx}>
            {info.map((e) => (
              <Video
                key={e.id}
                id={e.id}
                title={e.snippet.title}
                thumbnail={e.snippet.thumbnails.medium.url}
                autor={e.snippet.channelTitle}
                changeVideo={changeVideo}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowCase;
