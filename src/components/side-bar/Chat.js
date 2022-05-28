import { useContext, useEffect, useRef, useState } from "react";
// import { Avatar, IconButton } from "@material-ui/core";
import { IconButton, Avatar } from "@mui/material";

import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
// import {
//   AttachFile,
//   InsertEmoticon,
//   MoreVert,
//   SearchOutlined,
// } from "@material-ui/icons";
// import MicIcon from "@material-ui/icons/Mic";
import MicIcon from "@mui/icons-material/Mic";
import classes from "./Chat.module.css";
import { useParams } from "react-router-dom";
import db from "../../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import WhatsappContext from "../store/whatsapp-context";

const Chat = () => {
  //   const [input, setInput] = useState("");
  const params = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const whtCtx = useContext(WhatsappContext);
  const inputRef = useRef("");
  const [seed, setSeed] = useState("");

  useEffect(() => {
    if (params.roomId) {
      db.collection("groups")
        .doc(params.roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name);

          db.collection("groups")
            .doc(params.roomId)
            .collection("messages")
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshot) =>
              setMessages(snapshot.docs.map((doc) => doc.data()))
            );
        });
    }
  }, [params.roomId]);

  //   const changehandler = (e) => setInput(e.target.value);
  const sendMessage = (e) => {
    e.preventDefault();
    const enteredInput = inputRef.current.value;
    if (enteredInput.trim().length === 0) {
      return;
    }
    db.collection("groups").doc(params.roomId).collection("messages").add({
      message: enteredInput,
      name: whtCtx.user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    inputRef.current.value = "";
  };
  console.log(messages);
  //   console.log(
  //     new Date("16 May,2022 at 12:00:00 Am UTC+2").toDate().toUTCString()
  //   );

  useEffect(() => {
    setSeed(Math.random());
  }, [params.roomId]);
  return (
    <div className={classes.chat}>
      <div className={classes.chat__header}>
        <Avatar
          src={`https://avatars.dicebear.com/api/open-peeps/your-${seed}.svg`}
        />
        <div className={classes.chatheader__info}>
          <h3>{roomName}</h3>
          <p>
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className={classes.chatheader__right}>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className={classes.chat__body}>
        {messages.map((message) => (
          <p
            className={`${
              message.name === whtCtx.user.displayName
                ? classes.chat__receiver
                : classes.chat__message
            }`}
            key={Math.random()}
          >
            <span className={classes.chat__name}> {message.name}</span>
            {message.message}
            <span className={classes.chat__timestamp}>
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
        {/* <p className={classes.chat__message}>Hello</p> */}
      </div>
      <div className={classes.chat__footer}>
        <InsertEmoticonIcon className={classes.icons} />
        <form onClick={sendMessage}>
          <input
            type="text"
            placeholder="Type a message"
            // onChange={changehandler}
            // value={input}
            ref={inputRef}
          />
          <button type="submit">Send a request</button>
        </form>
        <MicIcon className={classes.icons} />
      </div>
    </div>
  );
};

export default Chat;
