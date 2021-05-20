import React, { useState } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
  Grid,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import StarsSlider from "../components/StarsSlider2";
import ResultModal from "../components/ResultModal";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    // alignItems: "center",
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
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const sampleReviews = [
  {
    business: "SmoothGinger Smoothie N Ginger Juice Bar",
    vertical: "Restaurant",
    signoff: "Takala, Owner",
    stars: 5,
    reviewer: "Antoinette R",
    review:
      "I absolutely love Smooth Ginger! Just recently my daughter was in the process of having an asthma attack. She had just been exposed to a baby that tested positive for the Covid. Once her wheezing began, Ms. Smooth Ginger supplied my daughter with Elderberry Syrup, Ginger Juice, Lungsworth and Fevergrass Tea. I made the prepared by Smooth Ginger teabags as instructed and she began drinking it all the way to hospital and finished by the time of triage. Just that fast her wheezing was gone and she was feeling 80% better within a hour of consuming the products supplied! I can't thank you enough for not just the products but for you personally educating me towards a healthier living!",
    response:
      "Antoinette, I'm so happy to hear your daughter is feeling better! It's such a joy to share the benefits of natural products with our community, and stories like this are the reason we love what we do. I wish your daughter a speedy recovery, and I'd love to see you both in the future. Warm wishes, Takala, Owner",
  },
  {
    business: "Burst Of Butterflies Create & Paint Studio - Tempe",
    vertical: "Activities and Events",
    signoff: "Cheryl T., Owner",
    stars: 4,
    reviewer: "Megan Cave",
    review: "",
    response:
      "We're so happy you had a great visit, Megan! We'd love to welcome you back again. -Cheryl T., Owner",
  },
  {
    business: "Takashi Bistro",
    vertical: "Restaurant",
    signoff: "Lorena L., Manager",
    stars: 2,
    reviewer: "Vanessa F.",
    review:
      "I absolutely love the food here, especially the stir fried noodles, but every time we order food from this restaurant, our order is always wrong! We just recently picked up our order of 2 avocado salmon rolls, one monster roll, 5 California rolls and a few other things. We received the incorrect type of salmon rolls with no avocado and are missing our monster roll. We also did not receive one of our California rolls. This has happened multiple times. Additionally, we were still charged the same amount for our order, even though we did not receive most of it. I love the food, but I think the order system needs to be fixed.",
    response:
      "It's concerning you haven't been getting your total order, Vanessa, because we always want to make sure we get things right. If you have more specifics about how you've been ordering with us, please reach out directly so we can work together to correct this. Kindly, Lorena L., Manager",
  },
];

const ReviewForm = ({ sampleReview, onChangeReview, showResponse, id }) => {
  return (
    <div>
      <form>
        <TextField
          id="biz-name"
          label="Business Name"
          fullWidth
          margin="normal"
          autoFocus={true}
          onChange={(e) =>
            onChangeReview({
              ...sampleReview,
              business: e.target.value,
            })
          }
          value={sampleReview.business}
        />
        <TextField
          id="biz-type"
          label="Vertical"
          fullWidth
          margin="normal"
          onChange={(e) =>
            onChangeReview({
              ...sampleReview,
              vertical: e.target.value,
            })
          }
          value={sampleReview.vertical}
        />
        <StarsSlider
          name={id}
          stars={sampleReview.stars}
          setStars={(s) => {
            console.log("Setting stars: ", s);
            onChangeReview({
              ...sampleReview,
              stars: s,
            });
          }}
        />
        <TextField
          id="reviewer-name"
          label="Reviewer Name"
          fullWidth
          margin="normal"
          onChange={(e) =>
            onChangeReview({
              ...sampleReview,
              reviewer: e.target.value,
            })
          }
          value={sampleReview.reviewer}
        />
        <TextField
          id="owner-name"
          label="Sign-Off"
          fullWidth
          margin="normal"
          placeholder="Jane Doe, Owner"
          onChange={(e) =>
            onChangeReview({
              ...sampleReview,
              signoff: e.target.value,
            })
          }
          value={sampleReview.signoff}
        />
        <TextField
          id="review-text"
          label="Review Text"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) =>
            onChangeReview({
              ...sampleReview,
              review: e.target.value,
            })
          }
          value={sampleReview.review}
        />
        {showResponse && (
          <TextField
            id="response-text"
            label="Response Text"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) =>
              onChangeReview({
                ...sampleReview,
                response: e.target.value,
              })
            }
            value={sampleReview.response}
          />
        )}
      </form>
    </div>
  );
};

const ReviewAccordion = ({
  title,
  expanded,
  handleExpandChange,
  sampleReview,
  onChangeReview,
  showResponse,
}) => {
  const classes = useStyles();
  return (
    <Accordion expanded={expanded} onChange={handleExpandChange}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography className={classes.heading}>{title}</Typography>
        <Typography className={classes.secondaryHeading}>
          {sampleReview.business} | {sampleReview.reviewer}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ReviewForm
          id={title}
          sampleReview={sampleReview}
          onChangeReview={onChangeReview}
          showResponse={showResponse}
        />
      </AccordionDetails>
    </Accordion>
  );
};

const MultiReviewInputForm = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [review1, setReview1] = React.useState(sampleReviews[0]);
  const [review2, setReview2] = React.useState(sampleReviews[1]);
  const [review3, setReview3] = React.useState(sampleReviews[2]);

  const [temperature, setTemperature] = React.useState(0.3);
  const [numResults, setNumResults] = React.useState(2);

  const [outputReview, setOutputReview] = React.useState({
    business: "Placeholder Biz Name",
    vertical: "",
    signoff: "",
    stars: 2,
    reviewer: "Jane Doe",
    review: "",
  });

  const [responseText, setResponseText] = useState("");

  const onSubmit = async () => {
    setLoading(true);
    setResponseText("");

    const body = {
      samples: [review1, review2, review3],
      outputReview: outputReview,
      temperature,
      numResults,
    };

    try {
      const response = await fetch("/review-response-2", {
        method: "POST",
        // mode: "cors",
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

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : "");
  };

  return (
    <div className={classes.root}>
      <h1>Customize AI Review Inputs</h1>
      <br />
      <div>
        <ReviewAccordion
          title="Sample Review 1"
          onChangeReview={setReview1}
          sampleReview={review1}
          expanded={expanded === "sample1"}
          handleExpandChange={handleChange("sample1")}
          showResponse={true}
        />
        <ReviewAccordion
          title="Sample Review 2"
          onChangeReview={setReview2}
          sampleReview={review2}
          expanded={expanded === "sample2"}
          handleExpandChange={handleChange("sample2")}
          showResponse={true}
        />
        <ReviewAccordion
          title="Sample Review 3"
          onChangeReview={setReview3}
          sampleReview={review3}
          expanded={expanded === "sample3"}
          handleExpandChange={handleChange("sample3")}
          showResponse={true}
        />
        <ReviewAccordion
          title="Review Needing Response"
          onChangeReview={setOutputReview}
          sampleReview={outputReview}
          expanded={expanded === "review"}
          handleExpandChange={handleChange("review")}
          showResponse={false}
        />
        <Accordion
          expanded={expanded === "settings"}
          onChange={handleChange("settings")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>Settings</Typography>
            <Typography className={classes.secondaryHeading}>
              Additional Settings
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography id="temperature-slider" gutterBottom>
                  Randomness (Higher is more random. 0 is the same result every
                  time)
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Slider
                  min={0}
                  max={1}
                  step={0.01}
                  value={temperature}
                  onChange={(e, val) => setTemperature(val)}
                  aria-labelledby="temperature-slider"
                  valueLabelDisplay="on"
                />
              </Grid>

              <Grid item xs={12}>
                <Typography id="num-results-slider" gutterBottom>
                  Number of Results
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Slider
                  min={1}
                  max={5}
                  value={numResults}
                  onChange={(e, val) => setNumResults(val)}
                  aria-labelledby="num-results-slider"
                  valueLabelDisplay="on"
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </div>
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
      <ResultModal
        title="Suggested Response"
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

export default MultiReviewInputForm;
