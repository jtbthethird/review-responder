import "./App.css";
import Menu from "./containers/Menu";
import ReviewInputForm from "./containers/ReviewInputForm";
import { Container } from "@material-ui/core";

function App() {
  return (
    <div className="App">
      <Menu />
      <Container maxWidth="md">
        <ReviewInputForm />
      </Container>
    </div>
  );
}

export default App;
