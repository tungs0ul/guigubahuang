import React, { useState } from "react";
import "./Guide.css";
import useFireStore from "../../firebase/hooks";
import Button from "@material-ui/core/Button";
// import GuideForm from "./GuideForm";

function Guide() {
  const guides = useFireStore("guide", "time", "desc");
  // const [uploading, setUploading] = useState(false);

  const [guide, setGuide] = useState({
    name: "",
    autor: "",
    url:
      "https://firebasestorage.googleapis.com/v0/b/guiguwiki.appspot.com/o/guide%2FH%C6%B0%E1%BB%9Bng%20D%E1%BA%ABn%20T%C3%A2n%20Th%E1%BB%A7%20-%20Qu%E1%BB%B7%20C%E1%BB%91c%20B%C3%A1t%20Hoang.pdf?alt=media&token=fcd8d938-137d-4552-a4a7-1c7280c76fb5",
  });

  return (
    <div className="guide">
      <div className="guide__top">
        <div>
          <Button
            onClick={() => {
              alert("Bạn chưa nạp lần đầu :)) tính năng này chưa cập nhật");
              // setUploading(true);
            }}
            variant="contained"
          >
            Upload hướng dẫn
          </Button>
          {/* <GuideForm uploading={uploading} setUploading={setUploading} /> */}
        </div>
      </div>
      <div className="guide__body">
        <div className="guides autoflow">
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
        <div className="guide__content autoflow">
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
