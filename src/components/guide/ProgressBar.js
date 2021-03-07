import React, { useEffect } from "react";
import { useStorage, writeFireStore } from "../../firebase/hooks";
import { useLanguage } from "../../provider/LanguageProvider";

function ProgressBar({
  file,
  setUploading,
  setFile,
  autor,
  name,
  setBlocking,
}) {
  const { getText } = useLanguage();
  const { url, progress } = useStorage(file);
  useEffect(() => {
    if (url) {
      setFile(null);
      writeFireStore("guide", {
        like: 0,
        view: 0,
        url: url,
        autor: autor.value,
        name: name.value,
        check: false,
        description: "khác",
      });
      alert(getText("thanksError"));
      setUploading(false);
      setBlocking(30000);
    }
  }, [url]);

  return (
    <div
      className="progressBar"
      style={{ width: progress + "%", backgroundColor: "blue" }}
    >
      progress
    </div>
  );
}

export default ProgressBar;
