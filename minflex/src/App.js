import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/movie/:id" elemnet={<Detail />}>
          <Detail />
        </Route>
        <Route path="/" element={<Home />}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
