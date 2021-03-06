import React, { useState } from "react";
import Option from "./Option";
import "./Char.css";

function Char() {
  const char = [
    { key: "hat", name: "mũ", value: [10, 20, 25, 25, 0, 15, 10] },
    {
      key: "backhair",
      name: "tóc gáy",
      value: [90, 90, 30, 40, 0, 10, 10],
    },
    {
      key: "eyebrow",
      name: "lông mày",
      value: [60, 80, 0, 40, 20, 20, 0, 5, 60, 50],
    },
    {
      key: "nose",
      name: "mũi",
      value: [160, 180, 110, 90, 80, 60, 0, 10, 20, 30],
    },
    {
      key: "back",
      name: "lưng",
      value: [20, 7, 12, 25, 37, 25, 46, 30, 30, 15, 15, 30, 14, 0, 25],
    },
    {
      key: "beard",
      name: "râu",
      value: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        10,
        0,
        40,
        10,
        20,
        20,
        30,
        60,
        60,
        60,
        60,
        60,
        60,
        60,
        55,
      ],
    },
    {
      key: "clothes",
      name: "trang phục",
      value: [
        85,
        100,
        90,
        60,
        50,
        40,
        20,
        20,
        20,
        70,
        60,
        60,
        120,
        120,
        120,
        20,
        20,
        20,
        80,
        90,
        70,
        70,
        80,
        90,
        40,
        45,
        40,
        70,
        60,
        60,
        130,
        125,
        125,
        90,
        95,
        100,
        70,
        70,
        70,
        90,
        90,
        90,
        110,
        90,
        100,
        85,
        85,
        85,
        90,
        90,
        90,
        70,
        70,
        70,
        100,
        100,
        110,
        115,
        115,
        115,
        80,
        80,
        80,
        60,
        60,
        60,
        70,
        70,
        70,
        105,
        105,
        105,
        60,
        60,
        60,
        0,
        0,
        0,
        120,
        120,
        120,
        60,
        60,
        60,
        80,
        90,
        90,
        70,
        70,
        70,
      ],
    },
    {
      key: "face",
      name: "khuôn mặt",
      value: [100, 80, 60, 20, 30, 40, 20, 30, 0],
    },
    {
      key: "mouth",
      name: "miệng",
      value: [40, 45, 50, 70, 100, 60, 20, 70, 80, 60, 30, 20, 50, 0],
    },
    {
      key: "eye",
      name: "mắt",
      value: [
        90,
        130,
        130,
        100,
        100,
        10,
        40,
        50,
        60,
        40,
        80,
        80,
        100,
        80,
        100,
        0,
      ],
    },
    {
      key: "hair",
      name: "tóc",
      value: [
        0,
        5,
        10,
        50,
        80,
        60,
        110,
        110,
        110,
        105,
        105,
        110,
        100,
        95,
        90,
        85,
        90,
        90,
        70,
        70,
        100,
        100,
        120,
        110,
        120,
        110,
        90,
        95,
        70,
        70,
        90,
        90,
      ],
    },
  ];

  const value = [
    { value: 1020, name: "tiên tư" },
    { value: 820, name: "siêu phàm" },
    { value: 580, name: "xuất chúng" },
    { value: 430, name: "phổ thông" },
    { value: 290, name: "quái dị" },
    { value: 160, name: "sửu lậu" },
    { value: 0, name: "tăng ấu" },
  ];

  const [option, setOption] = useState(char.map((e) => e.value[0]));
  const [sum, setSum] = useState(option.reduce((total, num) => total + num));

  const handleChange = (id, value) => {
    if (value >= 0 && value < char[id].value.length) {
      let items = [...option];
      items[id] = char[id].value[value];
      setSum(items.reduce((total, num) => total + num));
      setOption(items);
    }
  };

  const title = (n) => {
    for (let i = 0; i < value.length; ++i) {
      if (n >= value[i].value) {
        return value[i].name;
      }
    }
    return "vkl";
  };

  return (
    <div className="char">
      <div className="char__values">
        <table>
          <thead />
          <tbody className="char__values__table">
            <tr className="char__values__table__row">
              {char.map((e, idx) => (
                <td key={idx}>
                  <div
                    className="char__values__table__div overflow"
                    style={{
                      marginLeft: "5px",
                      marginRight: "5px",
                    }}
                  >
                    <h4>{e.name}</h4>
                    <div style={{ textAlign: "center" }}>
                      {e.value.map((v, i) => (
                        <div key={i}>{v}</div>
                      ))}
                    </div>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="char__options">
        <table>
          <thead />
          <tbody>
            <tr>
              <th>Bộ Phận</th>
              <th> - </th>
              <th>Lựa Chọn</th>
              <th> - </th>
              <th>Mị Lực</th>
            </tr>
            {char.map((e, idx) => (
              <Option
                id={idx}
                key={idx}
                name={e.name}
                values={e.value}
                value={option[idx]}
                change={handleChange}
              />
            ))}
            <tr>
              <td>
                <h4>Tổng</h4>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <h4>{sum}</h4>
              </td>
              <td>
                <h4>{title(sum)}</h4>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="char__info">
        <table>
          <thead />
          <tbody>
            <tr>
              <th>Danh Hiệu</th>
              <th> - </th>
              <th>Mị Lực</th>
            </tr>
            {value.map((e) => (
              <tr key={e.name}>
                <td>{e.name}</td>
                <td> </td>
                <td>{e.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Char;
