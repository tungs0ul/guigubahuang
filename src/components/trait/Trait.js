import React, { useEffect, useReducer, useState } from "react";
import useFireStore from "../../firebase/hooks";
import TraitCard from "./TraitCard";
import { splitArray } from "../../utils";
import "./Trait.css";
import Filter from "./Filter";

function Trait() {
  const db = useFireStore("trait", "colorId", "asc");
  const [names, setNames] = useState([]);
  const [traits, setTraits] = useState([]);

  const [itemsPerRow, setItemsPerRow] = useState(
    Math.floor((window.innerWidth * 0.7) / 330)
  );

  const handleResize = () => {
    setItemsPerRow(Math.floor((window.innerWidth * 0.7) / 330));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const initFilter = {
    name: "",
    colors: ["đỏ", "cam", "tím", "lam", "lục", "xám"],
    options: [],
  };

  const filterReducer = (state, action) => {
    switch (action.type) {
      case "name":
        return { ...state, name: action.payload };
      case "color":
        return { ...state, colors: action.payload };
      case "option":
        return { ...state, options: action.payload };
      default:
        return state;
    }
  };

  const [filter, dispatch] = useReducer(filterReducer, initFilter);

  useEffect(() => {
    let data = [...db];

    if (filter.name?.length && filter.name !== "null." && filter.name !== ".") {
      data = data.filter((e) => e.name === filter.name);
    }

    if (filter.colors?.length) {
      data = data.filter((e) => filter.colors.includes(e.color));
    }

    if (filter.options?.length) {
      let _data = [];
      data.forEach((e) => {
        let r = true;
        for (let i = 0; i < filter.options.length; ++i) {
          if (!e.value.toLowerCase().includes(filter.options[i])) {
            r = false;
            break;
          }
        }
        if (r) {
          _data.push(e);
        }
      });
      data = _data;
    }

    setTraits(splitArray(data, itemsPerRow));
  }, [filter, db, itemsPerRow]);

  useEffect(() => {
    if (db?.length) {
      setTraits(splitArray(db, itemsPerRow));
      setNames(db.map((e) => e.name.slice(0, e.name.length - 1)));
    } else {
      setNames([]);
    }
  }, [db, itemsPerRow]);

  return (
    <div className="traitsTop">
      <Filter dispatch={dispatch} names={names} />
      <div className="traits">
        {traits?.length &&
          traits.map((e, idx) => (
            <div className="traits__row" key={idx}>
              {e.map((trait, id) => (
                <TraitCard
                  key={id}
                  name={trait.name}
                  color={trait.color}
                  description={trait.description}
                  value={trait.value}
                />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Trait;
