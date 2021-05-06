import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landingpage from "./components/Pages/Landing-page/Landing-page";
import Login from "./components/Pages/Login/Login";
import Frontpage from "./components/Pages/Frontpage/Frontpage";

const App = () => {
  return (
    <Router>
      <div className="container-holder">
        <Switch>
          <Route exact path="/" component={Landingpage}>
            <Landingpage />
          </Route>
          <Route exact path="/login" component={Login}>
            <Login />
          </Route>
          <Route exact path="/bunadarskra" component={Frontpage}>
            <Frontpage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
