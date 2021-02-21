import React from "react";
import { Slider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const marks = [
  {
    value: 0,
    label: "",
  },
  {
    value: 1,
    label: "⭐️",
  },
  {
    value: 2,
    label: "⭐⭐",
  },
  {
    value: 3,
    label: "⭐⭐⭐",
  },
  {
    value: 4,
    label: "⭐⭐⭐⭐",
  },
  {
    value: 5,
    label: "⭐⭐⭐⭐⭐",
  },
];

const StarsSlider = ({ stars, setStars }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="stars-slider" gutterBottom>
        Rating
      </Typography>
      <Slider
        aria-labelledby="stars-slider"
        step={0.5}
        min={0}
        max={5}
        valueLabelDisplay="auto"
        marks={marks}
        onChange={(e, value) => setStars(value)}
        value={stars}
      />
    </div>
  );
};

export default StarsSlider;
