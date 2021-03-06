import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import Logo from "./pics/logo.png";
import { useAuth } from "../provider/AuthProvider";
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";

function Nav() {
  const navStyle = { color: "white" };
  const { currentUser, logout, loginWithGoogle } = useAuth();

  return (
    <div className="nav">
      <div className="nav-img">
        <Link to="/">
          <img id="logo" src={Logo} alt="guigubahuang" />
        </Link>
      </div>
      <ul className="nav-link">
        <Link style={navStyle} to="/">
          <li>Trang Chủ</li>
        </Link>
        <Link style={navStyle} to="/trait">
          <li>Tiên Thiên</li>
        </Link>
        <Link style={navStyle} to="/class">
          <li>Nhân Vật</li>
        </Link>
        {/* <Link style={navStyle} to="/skill">
          <li>Kĩ Năng</li>
        </Link> */}
        <Link style={navStyle} to="/destiny">
          <li>Nghịch Thiên</li>
        </Link>
        {/* <Link style={navStyle} to="/quest">
          <li>Nhiệm Vụ</li>
        </Link> */}
        <Link style={navStyle} to="/build">
          <li>Hướng Dẫn</li>
        </Link>
        <Link style={navStyle} to="/char">
          <li>Ngoại Hình</li>
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
              Đăng Nhập
            </li>
          )}
        </div>
      </ul>
    </div>
  );
}

export default Nav;
