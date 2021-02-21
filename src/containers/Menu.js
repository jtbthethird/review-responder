import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar, Typography, AppBar } from "@material-ui/core";

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
}));

const MenuBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Review Response Generator
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MenuBar;
