import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import Logo from "../../media/pics/logo.png";
import { useAuth } from "../../provider/AuthProvider";
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";
import { useLanguage } from "../../provider/LanguageProvider";
import Select from "@material-ui/core/Select";

function Nav() {
  const navStyle = { color: "white" };
  const { currentUser, logout, loginWithGoogle } = useAuth();
  const countries = {
    VN: {
      language: "Tiếng Việt",
      flag:
        "https://firebasestorage.googleapis.com/v0/b/guiguwiki.appspot.com/o/country%2FVN.jfif?alt=media&token=20427c6b-22c4-46d9-9c38-d6b743b50c9a",
      name: "Việt Nam",
    },
    EN: {
      language: "English",
      flag:
        "https://firebasestorage.googleapis.com/v0/b/guiguwiki.appspot.com/o/country%2Fuk.png?alt=media&token=af034bbe-822f-4c3c-a8ad-18391a6488fb",
      name: "UK",
    },
    DE: {
      language: "Deutsch",
      flag:
        "https://firebasestorage.googleapis.com/v0/b/guiguwiki.appspot.com/o/country%2Fgermany.png?alt=media&token=a6b65ed2-3d34-46eb-b357-8c5a020124b1",
      name: "Deutschland",
    },
  };
  const { language, setLanguage, getText } = useLanguage();

  return (
    <div className="topNav">
      <div className="nav">
        <div className="nav-img">
          <Link to="/">
            <img id="logo" src={Logo} alt="guigubahuang" />
          </Link>
        </div>
        <ul className="nav-link">
          <Link style={navStyle} to="/">
            <li>{getText("home")}</li>
          </Link>
          <Link style={navStyle} to="/videos">
            <li>Videos</li>
          </Link>
          <Link style={navStyle} to="/trait">
            <li>{getText("trait")}</li>
          </Link>
          <Link style={navStyle} to="/class">
            <li>{getText("class", "class")}</li>
          </Link>
          {/* <Link style={navStyle} to="/skill">
          <li>Kĩ Năng</li>
        </Link> */}
          <Link style={navStyle} to="/destiny">
            <li>{getText("destiny")}</li>
          </Link>
          {/* <Link style={navStyle} to="/quest">
          <li>Nhiệm Vụ</li>
        </Link> */}
          <Link style={navStyle} to="/guide">
            <li>{getText("guide")}</li>
          </Link>
          <Link style={navStyle} to="/char">
            <li>{getText("character")}</li>
          </Link>
          <div className="account">
            {currentUser ? (
              <AccountCircleTwoToneIcon
                color="secondary"
                onClick={logout}
                fontSize="large"
                style={{ marginTop: "-5px" }}
              />
            ) : (
              <li style={navStyle} onClick={loginWithGoogle}>
                {getText("login")}
              </li>
            )}
          </div>
        </ul>
      </div>
      <div className="language">
        <div className="language__img">
          <img src={countries[language].flag} alt="Country Flag" />
        </div>
        <div className="language__input">
          <Select
            style={{ color: "white" }}
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
            }}
            inputProps={{
              name: "language",
            }}
          >
            <option value={"VN"}>VN</option>
            <option value={"EN"}>EN</option>
            <option value={"DE"}>DE</option>
          </Select>
        </div>
      </div>
    </div>
  );
}

export default Nav;
