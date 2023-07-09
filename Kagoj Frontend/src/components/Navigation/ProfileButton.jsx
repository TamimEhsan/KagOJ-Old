import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { Avatar, makeStyles } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../action/auth";
import { useHistory } from "react-router-dom";

const user = {
  avatar:
    "https://i.pinimg.com/originals/17/f3/9c/17f39c6f7a4a5457f39dba2368f0d077.jpg",
  name: "twistyBRAT ONI ];)"
};

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 50,
    width: 50
  }
}));

const ProfileButton = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse"
        }}
      >
        <Button
          aria-controls="fade-menu"
          aria-haspopup="true"
          onClick={handleClick}
          startIcon={<ArrowDropDownIcon />}
        >
          {profile.name}
          <Avatar
            className={classes.avatar}
            src={profile.image}
            style={{
              marginLeft: "10px"
            }}
          />
        </Button>
      </div>

      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={() => {
                  logout(dispatch);
                }}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default ProfileButton;