import "./App.css";
import Menu from "./containers/Menu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";

import ReviewInputForm from "./containers/ReviewInputForm";
import MultiReviewInputForm from "./containers/MultiReviewInputForm";
import CaptionGeneratorForm from "./containers/CaptionGeneratorForm";
import AppList from "./components/AppList";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/review-responses">
            <Menu appName="Review Response" />
            <Container maxWidth="md">
              <ReviewInputForm />
            </Container>
          </Route>
          <Route path="/review-responses-2">
            <Menu appName="Review Response v2" />
            <Container maxWidth="md">
              <MultiReviewInputForm />
            </Container>
          </Route>
          <Route path="/caption-generator">
            <Menu appName="Caption Generator" />
            <Container maxWidth="md">
              <CaptionGeneratorForm />
            </Container>
          </Route>
          <Route path="/">
            <Menu appName="GPT-3 App List" />
            <Container maxWidth="sm">
              <AppList />
            </Container>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
