import classes from "./SideBar.module.css";
// import { Avatar, IconButton } from "@material-ui/core";
import { IconButton, Avatar } from "@mui/material";

import DonutLargeIcon from "@mui/icons-material/DonutLarge";
// import ChatIcon from "@material-ui/icons/Chat";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import SideBarChat from "./SideBarChat";
import { useContext, useEffect, useState } from "react";
import db from "../../firebase";
import { useParams } from "react-router-dom";
import WhatsappContext from "../store/whatsapp-context";

const SideBar = () => {
  const [rooms, setRooms] = useState([]);
  const { roomId } = useParams();
  const whtCtx = useContext(WhatsappContext);

  useEffect(() => {
    const unsubscribe = db
      .collection("groups")
      .onSnapshot((snapshot) =>
        setRooms(
          snapshot.docs.map(
            (doc) => (console.log(doc), { id: doc.id, data: doc.data() })
          )
        )
      );

    return () => unsubscribe();
  }, []);
  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebar__header}>
        <Avatar src={whtCtx.user?.photoURL} />
        <div className={classes.sidebar__right}>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>

          <IconButton>
            <ChatBubbleIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className={classes.search}>
        <div className={classes.search__container}>
          <SearchIcon />
          <input type="text" placeholder="Search or start new chart" />
        </div>
      </div>
      <div className={classes.chats}>
        <SideBarChat addNew />
        {/* <SideBarChat />
        <SideBarChat />
        <SideBarChat /> */}
        {rooms.map((room) => (
          <SideBarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
