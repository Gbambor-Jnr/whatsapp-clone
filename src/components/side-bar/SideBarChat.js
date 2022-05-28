import classes from "./SideBarChat.module.css";
import AvatarJs from "./Avatar";
import db from "../../firebase";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const SideBarChat = ({ addNew, name, id }) => {
  const params = useParams();
  const [messages, setMessages] = useState([]);
  const createChart = () => {
    const roomName = prompt("enter Room Name ");
    if (roomName) {
      //do some stuff
      db.collection("groups").add({ name: roomName });
    }
  };

  useEffect(() => {
    if (id) {
      db.collection("groups")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, []);

  return (
    <div>
      {!addNew ? (
        <Link to={`/rooms/${id}`}>
          <div className={classes.sidebarchat}>
            <AvatarJs />
            <div className={classes.sidebarinfo}>
              <h2>{name}</h2>
              <p>{messages[messages.length - 1]?.message}</p>
              {/* <p>{messages[0]?.message}</p> */}
            </div>
          </div>
        </Link>
      ) : (
        <div className={classes.sidebarchat} onClick={createChart}>
          Add New Chat
        </div>
      )}
    </div>
  );
};

export default SideBarChat;
