// import { Avatar } from "@material-ui/core";
import { Avatar } from "@mui/material";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import classes from "./Avatar.module.css";

const AvatarJs = () => {
  return (
    <div className={classes.avatarcontainer}>
      <div className={classes.avatar}>
        <Avatar
          src={`https://avatars.dicebear.com/api/open-peeps/your-${Math.random()}.svg`}
        />
      </div>
    </div>
  );
};

export default AvatarJs;
