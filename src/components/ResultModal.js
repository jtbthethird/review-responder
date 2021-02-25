import React from "react";
import { useState, useRef } from "react";
import { Modal, Typography, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 500,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
}));

const ResultModal = ({ title, responseText, open, handleClose }) => {
  const classes = useStyles();

  const textRef = useRef(null);

  const [copySuccess, setCopySuccess] = useState(false);

  function copyToClipboard(e) {
    textRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    setCopySuccess(true);
  }

  return (
    <Modal
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={open}
      onClose={handleClose}
    >
      <div className={classes.paper}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <TextField
          ref={textRef}
          value={responseText}
          multiline
          fullWidth
          rows={10}
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
        />
        {/*<p ref={textRef}>{responseText}</p>*/}
        {/*<Button*/}
        {/*  variant="contained"*/}
        {/*  color="secondary"*/}
        {/*  disabled={copySuccess}*/}
        {/*  onClick={copyToClipboard}*/}
        {/*>*/}
        {/*  {copySuccess ? "Copied!" : "Copy to Clipboard"}*/}
        {/*</Button>*/}
      </div>
    </Modal>
  );
};

export default ResultModal;
