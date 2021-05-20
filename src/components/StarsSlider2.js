import React from "react";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const StarsSlider = ({ stars, setStars, name }) => {
  return (
    <Rating
      name={name}
      value={stars}
      onChange={(e, v) => {
        console.log("Setting stars: ", e, v);
        setStars(v);
      }}
      emptyIcon={<StarBorderIcon fontSize="inherit" />}
    />
  );
};

export default StarsSlider;
