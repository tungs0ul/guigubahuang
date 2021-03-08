import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import TextField from "@material-ui/core/TextField";
import { useAuth } from "../../provider/AuthProvider";
import useFireStore, { writeFireStore } from "../../firebase/hooks";
import { useLanguage } from "../../provider/LanguageProvider";
import { motion } from "framer-motion";

function Chat() {
  const { getText } = useLanguage();
  const messages = useFireStore("message", "time", "asc", 50);
  const [msg, setMsg] = useState("");
  const [blocking, setBlocking] = useState(false);
  const chatRef = useRef(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (chatRef) {
      chatRef.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleChangeMsg = (e) => {
    setMsg(e.target.value);
  };

  useEffect(() => {
    if (blocking) {
      const timer = setTimeout(() => {
        setBlocking(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [blocking]);

  const handleSubmit = (e) => {
    if (!currentUser) {
      alert(getText("loginError"));
      return;
    }
    if (!blocking) {
      writeFireStore("message", {
        user: currentUser.displayName,
        msg: msg,
        email: currentUser.email,
        check: true,
      });
      setMsg("");
      setBlocking(true);
    } else {
      alert(getText("fastError") + " (3s)");
    }
  };

  return (
    <motion.div initial={{ y: "-100vh" }} animate={{ y: 0 }} className="chat">
      <div className="chat__window autoflow" ref={chatRef}>
        {messages?.length
          ? messages.map((e, idx) => (
              <div
                className={
                  currentUser
                    ? currentUser.email === e.email
                      ? "chat__message msgReversed"
                      : "chat__message"
                    : "chat__message"
                }
                key={idx}
              >
                {currentUser ? (
                  currentUser.email !== e.email ? (
                    <span style={{ fontWeight: "bold" }}>{e.user}</span>
                  ) : (
                    <div />
                  )
                ) : (
                  <span style={{ fontWeight: "bold" }}>{e.user}</span>
                )}
                <div
                  className={
                    currentUser
                      ? currentUser.email === e.email
                        ? "msg sent"
                        : "msg received"
                      : "msg received"
                  }
                >
                  {e.msg}
                </div>
              </div>
            ))
          : "Loading"}
      </div>
      <div className="chat__input">
        <TextField
          id="outlined-basic"
          size="small"
          placeholder={getText("chat")}
          fullWidth
          value={msg}
          onChange={handleChangeMsg}
          onKeyDown={handleKeyDown}
        />
        <SendRoundedIcon
          style={{ cursor: "pointer" }}
          onClick={handleSubmit}
          fontSize="large"
        />
      </div>
    </motion.div>
  );
}

export default Chat;
