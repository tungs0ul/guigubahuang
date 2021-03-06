import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";

function GuideForm({ uploading, setUploading }) {
  const classes = [
    "Đao",
    "Thương",
    "Kiếm",
    "Quyền",
    "Chưởng",
    "Chỉ",
    "Hỏa",
    "Thủy",
    "Lôi",
    "Phong",
    "Thổ",
    "Mộc",
    "Khác",
  ];
  const [style, setStyle] = useState({
    position: "absolute",
    zIndex: -2,
    width: window.innerWidth / 2 + "px",
    height: window.innerHeight / 2 - 100 + "px",
    backgroundColor: "transparent",
    top: window.innerHeight / 4 + "px",
    left: window.innerWidth / 4 + "px",
    minWidth: "500px",
    minHeight: "400px",
  });

  const [error, setError] = useState("");

  const [parentStyle, setParentStyle] = useState({
    position: "absolute",
    zIndex: -2,
    width: window.innerWidth + "px",
    height: window.innerHeight + "px",
    backgroundColor: "transparent",
    top: "-50px",
    left: 0,
  });

  const [char, setChar] = useState("Khác");

  const [file, setFile] = useState(null);

  const changeHandler = (e) => {
    let selected = e.target.files[0];
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
      setError("");
    } else {
      setError("Chỉ upload file pdf");
    }
  };

  useEffect(() => {
    if (uploading) {
      let _style = style;
      _style = { ..._style, zIndex: 999, backgroundColor: "white" };
      let _parentStyle = parentStyle;
      _parentStyle = { ..._parentStyle, zIndex: 99, backgroundColor: "grey" };
      setParentStyle(_parentStyle);
      setStyle(_style);
    } else {
      let _style = style;
      _style = { ..._style, zIndex: -1, backgroundColor: "transparent" };
      let _parentStyle = parentStyle;
      _parentStyle = {
        ..._parentStyle,
        zIndex: -2,
        backgroundColor: "transparent",
      };
      setParentStyle(_parentStyle);
      setStyle(_style);
    }
  }, [uploading]);

  return (
    <div className="guideForm" style={parentStyle}>
      <div className="uploadForm" style={style}>
        <div className="uploadForm__row plusPadding">
          <TextField label="Tên hướng dẫn" fullWidth variant="outlined" />
        </div>
        <div className="uploadForm__row plusPadding">
          <TextField label="Tên tác giả" fullWidth variant="outlined" />
        </div>
        <div className="uploadForm__row plusPadding">
          <Autocomplete
            fullWidth
            options={classes}
            value={char}
            onChange={(event, newValue) => {
              setChar(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                variant="outlined"
                label="Trường phái"
              />
            )}
          />
        </div>
        <div className="uploadForm__row">
          <input type="file" onChange={changeHandler} />
        </div>
        <div className="uploadForm__row">{error}</div>
        <div className="uploadForm__row">
          <Button variant="contained">Submit</Button>
        </div>
      </div>
    </div>
  );
}

export default GuideForm;
