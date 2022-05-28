import { Button } from "@mui/material";
import classes from "./Login.module.css";
import images from "../images/whatsapp4.webp";
import { auth, provider } from "../../firebase";
import { useContext } from "react";
import WhatsappContext from "../store/whatsapp-context";

const Login = () => {
  const whtCtx = useContext(WhatsappContext);
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        whtCtx.login(result.user);
      })
      .catch((err) => alert(err.message));
  };
  return (
    <div className={classes.login}>
      <div className={classes.login__container}>
        <img src={images} alt="whatsapp" style={{ width: "50px" }} />
        <div>
          <h1>Sign in to WhatsApp</h1>
        </div>

        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </div>
  );
};

export default Login;
