import "./App.css";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import store from "./store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Container maxWidth="lg">
        <h1>Dashboard</h1>
        <Router>
          <Navigation />
        </Router>
      </Container>
    </Provider>
  );
}

export default App;
