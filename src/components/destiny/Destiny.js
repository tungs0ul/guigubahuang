import React, { useEffect, useState } from "react";
import useFireStore from "../../firebase/hooks";
import { splitArray } from "../../utils";
import DestinyCard from "./DestinyCard";
import "./Destiny.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useLanguage } from "../../provider/LanguageProvider";
import { motion } from "framer-motion";
import Loading from "../loading/Loading";

function Destiny() {
  const db = useFireStore("destiny", "id", "asc");
  const [destinies, setDestinies] = useState([]);
  const { getText } = useLanguage();

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

  useEffect(() => {
    if (db?.length) {
      setDestinies(splitArray(db, itemsPerRow));
    }
  }, [db, itemsPerRow]);

  const [name, setName] = useState("");
  useEffect(() => {
    if (name?.length) {
      let data = [...db];
      data = data.filter((e) => e.name === name + ".");
      setDestinies(splitArray(data), itemsPerRow);
    }
  }, [name, db, itemsPerRow]);

  return (
    <motion.div
      initial={{ x: "-100vh" }}
      animate={{ x: 0 }}
      className="destiny"
    >
      <div className="destiny__search">
        <Autocomplete
          freeSolo
          options={
            db?.length
              ? db.map((e) => e.name.slice(0, e.name.length - 1))
              : ["Loading"]
          }
          value={name}
          onChange={(event, newValue) => {
            setName(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label={getText("searchName")}
            />
          )}
        />
      </div>
      {
        <div className="destinies autoflow">
          {destinies?.length ? (
            destinies.map((e, idx) => (
              <div className="destinies__row" key={idx}>
                {e.map((destiny, id) => (
                  <DestinyCard
                    key={id}
                    name={destiny.name}
                    description={destiny.description}
                    img={destiny.img}
                  />
                ))}
              </div>
            ))
          ) : (
            <Loading />
          )}
        </div>
      }
    </motion.div>
  );
}

export default Destiny;
