import React from "react";

function TraitCard({ name, color, description, value }) {
  return (
    <div className="trait zoom">
      <h3
        style={{
          textAlign: "center",
          color: ["black", "blue", "purple"].includes(color)
            ? "lightyellow"
            : "yellow",
          border: `solid 1px ${color}`,
          borderRadius: "5px",
          backgroundColor: color,
        }}
      >
        {name.slice(0, name.length - 1)}
      </h3>
      <div className="trait__body">
        <div className="trait__value">{value}</div>
        <div className="trait__description overflow">{description}</div>
      </div>
    </div>
  );
}

export default TraitCard;
