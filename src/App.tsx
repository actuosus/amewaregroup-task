import React from "react";
import {
  BrowserRouter as Router,

  Route, Switch
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Details from "./containers/Details";
import Search from "./containers/Search";

function Home() {
  return <h2>Home</h2>;
}

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />

        <div className="container">
          <Switch>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/details/:id">
              <Details />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
