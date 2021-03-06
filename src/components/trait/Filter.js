import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

function Filter({ names, dispatch }) {
  const colors = ["đỏ", "cam", "tím", "lam", "lục", "xám"];
  const [name, setName] = useState("");
  const [color, setColor] = useState(colors);
  const [option, setOption] = useState([]);

  const options = [
    "công kích",
    "phòng ngự",
    "may mắn",
    "ngộ tính",
    "mị lực",
    "tư chất",
    "danh vọng",
  ];

  useEffect(() => {
    dispatch({ type: "name", payload: name + "." });
  }, [name, dispatch]);

  useEffect(() => {
    let payload = [];
    color.forEach((e) => {
      if (e === "đỏ") {
        payload.push("red");
      } else if (e === "cam") {
        payload.push("orange");
      } else if (e === "tím") {
        payload.push("purple");
      } else if (e === "lam") {
        payload.push("blue");
      } else if (e === "lục") {
        payload.push("green");
      } else if (e === "xám") {
        payload.push("black");
      }
    });
    dispatch({ type: "color", payload: payload });
  }, [color, dispatch]);

  useEffect(() => {
    dispatch({ type: "option", payload: option });
  }, [option, dispatch]);

  return (
    <div className="filter">
      <div className="filter__top">
        <div className="filter__search">
          <Autocomplete
            freeSolo
            options={names?.length ? names : ["Loading"]}
            value={name}
            onChange={(event, newValue) => {
              setName(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} variant="standard" label="tìm theo tên" />
            )}
          />
        </div>
        <div className="filter__colors">
          <Autocomplete
            multiple
            options={colors?.length ? colors : ["Loading"]}
            value={color}
            onChange={(event, newValue) => {
              setColor(newValue);
            }}
            filterSelectedOptions
            defaultValue={colors}
            renderInput={(params) => (
              <TextField {...params} variant="standard" label="màu" />
            )}
          />
        </div>
      </div>
      <div className="filter__options">
        <Autocomplete
          multiple
          limitTags={2}
          options={options?.length ? options : ["Loading"]}
          value={option}
          onChange={(event, newValue) => {
            setOption(newValue);
          }}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="chỉ số" />
          )}
        />
      </div>
    </div>
  );
}

export default Filter;
