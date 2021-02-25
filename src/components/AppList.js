import { Link } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import {
  Chat as ChatIcon,
  Instagram as InstagramIcon,
} from "@material-ui/icons";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

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

const AppList = () => {
  const classes = useStyles();

  return (
    <List>
      <Link to="/review-responses" className={classes.secretLink}>
        <ListItem button key="review-response-generator">
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="Review Response Generator" />
        </ListItem>
      </Link>
      <Link to="/caption-generator" className={classes.secretLink}>
        <ListItem button key="review-response-generator">
          <ListItemIcon>
            <InstagramIcon />
          </ListItemIcon>
          <ListItemText primary="Social Post Caption Generator" />
        </ListItem>
      </Link>
    </List>
  );
};

export default AppList;
