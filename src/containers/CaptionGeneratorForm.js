import React, { useState } from "react";
import { TextField, Button, CircularProgress } from "@material-ui/core";
import StarsSlider from "../components/StarsSlider";
import ResultModal from "../components/ResultModal";
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

const CaptionGeneratorForm = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [bizName, setBizName] = useState("");
  const [bizType, setBizType] = useState("");
  const [description, setDescription] = useState("");
  const [suggestionText, setSuggestionText] = useState("");

  const onSubmit = async () => {
    setLoading(true);
    setSuggestionText("");

    console.log("Submitted", bizName, bizType, description);

    const body = {
      businessName: bizName,
      vertical: bizType,
      businessDescription: description,
    };

    await new Promise((r) => setTimeout(r, 1000));

    try {
      const response = await fetch("/post-caption", {
        method: "POST",
        // mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const responseText = await response.text();

      console.log("Result: ", response, responseText);

      setSuggestionText(responseText);
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
        <TextField
          id="description-text"
          label="Business Short Description"
          multiline
          rows={8}
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
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
      <ResultModal
        title="Suggested Captions"
        responseText={suggestionText}
        open={modalOpen}
        handleClose={() => {
          setModalOpen(false);
          setSuggestionText("");
        }}
      />
    </div>
  );
};

export default CaptionGeneratorForm;
