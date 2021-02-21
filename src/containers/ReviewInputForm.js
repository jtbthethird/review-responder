import React, { useState } from "react";
import { TextField, Button, CircularProgress } from "@material-ui/core";
import StarsSlider from "../components/StarsSlider";
import ResponseModal from "../components/ResponseModal";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const ReviewInputForm = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [bizName, setBizName] = useState("");
  const [bizType, setBizType] = useState("");
  const [reviewer, setReviewer] = useState("");
  const [stars, setStars] = useState(2.5);
  const [signoff, setSignoff] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [responseText, setResponseText] = useState("");

  const onSubmit = async () => {
    setLoading(true);
    setResponseText("");

    console.log(
      "Submitted",
      reviewText,
      bizName,
      bizType,
      reviewer,
      stars,
      signoff
    );

    const body = {
      businessName: bizName,
      vertical: bizType,
      signoff: signoff,
      reviewer: reviewer,
      stars: stars,
      reviewText: reviewText,
    };

    await new Promise((r) => setTimeout(r, 1000));

    try {
      const response = await fetch("http://localhost:8080/review-response", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const responseText = await response.text();

      console.log("Result: ", response, responseText);

      setResponseText(responseText);
      setModalOpen(true);
    } catch (e) {
      console.error("Error fetching response: ", e);
    }

    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <TextField
          id="biz-name"
          label="Business Name"
          fullWidth
          margin="normal"
          autoFocus={true}
          onChange={(e) => setBizName(e.target.value)}
          value={bizName}
        />
        <TextField
          id="biz-type"
          label="Vertical"
          fullWidth
          margin="normal"
          onChange={(e) => setBizType(e.target.value)}
          value={bizType}
        />
        <StarsSlider stars={stars} setStars={setStars} />
        <TextField
          id="reviewer-name"
          label="Reviewer Name"
          fullWidth
          margin="normal"
          onChange={(e) => setReviewer(e.target.value)}
          value={reviewer}
        />
        <TextField
          id="owner-name"
          label="Sign-Off"
          fullWidth
          margin="normal"
          placeholder="Jane Doe, Owner"
          onChange={(e) => setSignoff(e.target.value)}
          value={signoff}
        />
        <TextField
          id="review-text"
          label="Review Text"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => setReviewText(e.target.value)}
          value={reviewText}
        />
        <div className={classes.wrapper}>
          <Button
            disabled={loading}
            variant="contained"
            color="primary"
            onClick={() => onSubmit()}
          >
            Generate AI-Powered Response
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </form>
      <ResponseModal
        responseText={responseText}
        open={modalOpen}
        handleClose={() => {
          setModalOpen(false);
          setResponseText("");
        }}
      />
    </div>
  );
};

export default ReviewInputForm;
