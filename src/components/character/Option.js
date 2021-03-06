import React, { useState } from "react";

function Option({ id, name, values, value, change }) {
  const [option, setOption] = useState(1);
  const handleChange = (e) => {
    let value = parseInt(e.target.value, 10) - 1;
    if (value >= values.length) {
      value = values.length - 1;
    } else if (value < 0) {
      value = 0;
    }
    setOption(value + 1);
    change(id, value);
  };
  return (
    <tr>
      <td>{name}</td>
      <td> </td>
      <td>
        <input
          type="number"
          value={option}
          min={1}
          max={100}
          onChange={handleChange}
        />
      </td>
      <td> </td>
      <td>{value}</td>
    </tr>
  );
}

export default Option;
