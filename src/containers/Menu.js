import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Toolbar,
  Typography,
  AppBar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  Chat as ChatIcon,
  Menu as MenuIcon,
  Instagram as InstagramIcon,
} from "@material-ui/icons";

import AppList from "../components/AppList";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  secretLink: {
    color: "inherit",
    textDecoration: "none",
  },
}));

const MenuBar = ({ appName }) => {
  const classes = useStyles();

  const [sidebarOpen, setOpenSidebar] = useState(false);

  const toggleSidebar = () => {
    setOpenSidebar(!sidebarOpen);
  };

  const sidebar = (
    <div
      className={classes.list}
      role="presentation"
      onClick={() => setOpenSidebar(false)}
      onKeyDown={() => setOpenSidebar(false)}
    >
      <AppList />
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <React.Fragment>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleSidebar}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              variant="temporary"
              anchor="left"
              open={sidebarOpen}
              onClose={() => setOpenSidebar(false)}
            >
              {sidebar}
            </Drawer>
          </React.Fragment>
          <Typography variant="h6" className={classes.title}>
            {appName}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MenuBar;
