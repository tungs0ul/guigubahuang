import React, { useState } from "react";
import { useLanguage } from "../../provider/LanguageProvider";
import ProgressBar from "./ProgressBar";

function UploadGuide({ setUploading }) {
  const { getText } = useLanguage();
  const [uploadingFile, setUploadingFile] = useState(false);

  const handleClick = (e) => {
    if (!e.target.classList.contains("uploading")) {
      setUploading(false);
    }
  };

  const [file, setFile] = useState(null);
  const autor = useFormInput();
  const name = useFormInput();

  const changeHandler = (e) => {
    let selected = e.target.files[0];
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
      setError("");
    } else {
      setError(getText("guideForm", "fileError"));
    }
  };

  const handleSubmit = (e) => {
    if (autor.value.length && name.value.length && file) {
      setUploadingFile(true);
    } else {
      if (!file) {
        setError(getText("guideForm", "fileError"));
      } else {
        setError(getText("guideForm", "missInfo"));
      }
    }
  };

  const [error, setError] = useState("");

  return (
    <div
      className="uploadGuide"
      style={{
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.5)",
        width: window.innerWidth,
        height: window.innerHeight,
        top: "-30px",
        left: "-5px",
        zIndex: 999,
      }}
      onClick={handleClick}
    >
      <div
        className="uploadGuide__form uploading"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          position: "absolute",
          backgroundColor: "white",
          width: "50%",
          height: "50%",
          minWidth: "600px",
          minHeight: "400px",
          left: window.innerWidth / 4 + "px",
          top: window.innerHeight / 5 + "px",
          zIndex: 999,
          borderRadius: "20px",
        }}
      >
        <div className="uploadForm__row uploading">{error}</div>

        <div className="uploadForm__row uploading">
          <input
            onChange={autor.onChange}
            className="uploading"
            type="text"
            placeholder={getText("guideForm", "autor")}
          />
        </div>
        <div className="uploadForm__row uploading">
          <input
            onChange={name.onChange}
            className="uploading"
            type="text"
            placeholder={getText("guideForm", "name")}
          />
        </div>
        <div className="uploadForm__row uploading">
          <input className="uploading" onChange={changeHandler} type="file" />
        </div>
        <div className="uploadForm__row uploading">
          <button className="uploading" onClick={handleSubmit}>
            Submit Guide
          </button>
        </div>
        <div className="uploadForm__row uploading">
          {uploadingFile && (
            <ProgressBar
              file={file}
              setFile={setFile}
              setUploadingFile={setUploadingFile}
              autor={autor}
              name={name}
              setUploading={setUploading}
            />
          )}
        </div>
      </div>
    </div>
  );
}

const useFormInput = (init = "") => {
  const [value, setValue] = useState(init);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};
export default UploadGuide;
