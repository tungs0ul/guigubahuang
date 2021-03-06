import React, { useEffect, useState } from "react";
import useFireStore from "../../firebase/hooks";
import "./Class.css";
import { splitArray } from "../../utils";
import ClassCard from "./ClassCard";

function Class() {
  const db = useFireStore("class", "id", "asc");
  const [itemsPerRow, setItemsPerRow] = useState(
    Math.floor((window.innerWidth * 0.7) / 370)
  );
  const handleResize = () => {
    setItemsPerRow(Math.floor((window.innerWidth * 0.7) / 370));
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    setClasses(splitArray(db, itemsPerRow));
  }, [db, itemsPerRow]);

  return (
    <div className="classes autoflow">
      {classes.map((info, idx) => (
        <div className="classes__row" key={idx}>
          {info.map((e) => (
            <ClassCard name={e.name} img={e.img} description={e.description} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Class;
