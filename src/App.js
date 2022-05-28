import classes from "./App.module.css";
import SideBar from "./components/side-bar/SideBar";
import Chat from "./components/side-bar/Chat";
import { Switch, Route } from "react-router-dom";
import { useContext, useState } from "react";
import Login from "./components/login/Login";
import WhatsappContext from "./components/store/whatsapp-context";
function App() {
  const whtCtx = useContext(WhatsappContext);
  const [user, setUser] = useState(null);
  return (
    <div className={classes.app}>
      {!whtCtx.user ? (
        <Login />
      ) : (
        <div className={classes.app_body}>
          {" "}
          <SideBar />
          <Switch>
            <Route path="/" exact>
              <Chat />
            </Route>

            <Route path="/rooms/:roomId">
              <Chat />
            </Route>
          </Switch>
        </div>
      )}
    </div>
  );
}

export default App;
