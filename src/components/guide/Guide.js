import React, { useEffect, useState } from "react";
import "./Guide.css";
import useFireStore from "../../firebase/hooks";
import Button from "@material-ui/core/Button";
import { useLanguage } from "../../provider/LanguageProvider";
import { useAuth } from "../../provider/AuthProvider";
import UploadGuide from "./UploadGuide";

function Guide() {
  const guides = useFireStore("guide", "time", "desc");

  const [uploading, setUploading] = useState(false);

  const { getText } = useLanguage();
  const { currentUser } = useAuth();

  const [blocking, setBlocking] = useState(false);

  useEffect(() => {
    if (blocking) {
      const timer = setTimeout(() => {
        setBlocking(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [blocking]);

  const [guide, setGuide] = useState({
    name: "",
    autor: "",
    url:
      "https://firebasestorage.googleapis.com/v0/b/guiguwiki.appspot.com/o/guide%2FH%C6%B0%E1%BB%9Bng%20D%E1%BA%ABn%20T%C3%A2n%20Th%E1%BB%A7%20-%20Qu%E1%BB%B7%20C%E1%BB%91c%20B%C3%A1t%20Hoang.pdf?alt=media&token=fcd8d938-137d-4552-a4a7-1c7280c76fb5",
  });

  return (
    <div className="guide">
      <div className="guide__body">
        <div className="guides autoflow">
          <div className="guides__button">
            <Button
              color="primary"
              onClick={() => {
                if (!currentUser) {
                  alert(getText("loginError"));
                  return;
                }
                if (blocking) {
                  alert(getText("fastError") + " (10s)");
                  return;
                }
                setUploading(true);
              }}
              variant="contained"
            >
              Submit Guide
            </Button>
            {uploading && (
              <UploadGuide
                setBlocking={setBlocking}
                setUploading={setUploading}
              />
            )}
          </div>
          {guides?.length &&
            guides.map((e, idx) => (
              <h3
                key={idx}
                onClick={() => {
                  setGuide(e);
                }}
                className="guide__title"
              >
                {e.name}
              </h3>
            ))}
        </div>
        <div className="guide__content overflow">
          {guide && (
            <div className="webViewer">
              <object
                data={guide.url}
                type="application/pdf"
                width="100%"
                height="100%"
              />
              <div className="guide__link">
                <a href={guide.url}>click vào đây để mở pdf</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Guide;
