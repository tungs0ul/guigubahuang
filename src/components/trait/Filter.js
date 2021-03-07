import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useLanguage } from "../../provider/LanguageProvider";

function Filter({ names, dispatch }) {
  const [name, setName] = useState("");
  const { language, texts, languages, getText } = useLanguage();
  const getColorText = () => {
    return [
      getText("color", "red"),
      getText("color", "orange"),
      getText("color", "purple"),
      getText("color", "blue"),
      getText("color", "green"),
      getText("color", "grey"),
    ];
  };

  const getOptionText = () => {
    return [
      getText("stat", "attack"),
      getText("stat", "defense"),
      getText("stat", "luck"),
      getText("stat", "int"),
      getText("stat", "beauty"),
      getText("stat", "nature"),
      getText("stat", "glory"),
    ];
  };

  const [colors, setColors] = useState(getColorText());

  const [color, setColor] = useState(colors);

  const [options, setOptions] = useState(getOptionText());

  const [option, setOption] = useState([]);

  useEffect(() => {
    setColors(getColorText());
    setOptions(getOptionText());
    setColor([]);
    setOption([]);
  }, [language, getText]);

  useEffect(() => {
    dispatch({ type: "name", payload: name + "." });
  }, [name, dispatch]);

  useEffect(() => {
    let payload = [];
    color.forEach((c) => {
      if (languages.map((l) => texts["color"]["red"][l]).includes(c)) {
        payload.push("red");
      } else if (
        languages.map((l) => texts["color"]["orange"][l]).includes(c)
      ) {
        payload.push("orange");
      } else if (
        languages.map((l) => texts["color"]["purple"][l]).includes(c)
      ) {
        payload.push("purple");
      } else if (languages.map((l) => texts["color"]["blue"][l]).includes(c)) {
        payload.push("blue");
      } else if (languages.map((l) => texts["color"]["green"][l]).includes(c)) {
        payload.push("green");
      } else if (languages.map((l) => texts["color"]["grey"][l]).includes(c)) {
        payload.push("black");
      }
    });
    dispatch({ type: "color", payload: payload });
  }, [color, dispatch, languages, texts]);

  useEffect(() => {
    let payload = [];
    option.forEach((o) => {
      if (languages.map((e) => texts["stat"]["attack"][e]).includes(o)) {
        payload.push("công kích");
      } else if (
        languages.map((e) => texts["stat"]["defense"][e]).includes(o)
      ) {
        payload.push("phòng ngự");
      } else if (languages.map((e) => texts["stat"]["luck"][e]).includes(o)) {
        payload.push("may mắn");
      } else if (languages.map((e) => texts["stat"]["beauty"][e]).includes(o)) {
        payload.push("mị lực");
      } else if (languages.map((e) => texts["stat"]["int"][e]).includes(o)) {
        payload.push("ngộ tính");
      } else if (languages.map((e) => texts["stat"]["nature"][e]).includes(o)) {
        payload.push("tư chất");
      } else if (languages.map((e) => texts["stat"]["glory"][e]).includes(o)) {
        payload.push("danh vọng");
      }
    });
    dispatch({ type: "option", payload: payload });
  }, [option, dispatch, languages, texts]);

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
              <TextField
                {...params}
                variant="standard"
                label={texts["searchName"][language]}
              />
            )}
          />
        </div>
        <div className="filter__colors">
          <Autocomplete
            multiple
            options={colors?.length ? colors : ["Loading"]}
            value={color}
            limitTags={1}
            onChange={(event, newValue) => {
              setColor(newValue);
            }}
            filterSelectedOptions
            defaultValue={colors}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label={texts["color"]["color"][language]}
              />
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
            <TextField
              {...params}
              variant="standard"
              label={texts["stat"]["stat"][language]}
            />
          )}
        />
      </div>
    </div>
  );
}

export default Filter;
