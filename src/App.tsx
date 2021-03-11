import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Details from "./containers/Details";
import Home from "./containers/Home";
import Search from "./containers/Search";
import useDarkMode from "./lib/hooks/useDarkMode";

function App() {
  const [theme, setTheme] = useState("light");
  const isDarkMode = useDarkMode();

  useEffect(() => {
    console.log(theme);
    if (theme === "dark") {
      document.body.classList.replace('bg-light', 'bg-dark')
    }
    if (theme === "light") {
      document.body.classList.replace('bg-dark', 'bg-light')
    }
  }, [theme])

  useEffect(() => {
    if (isDarkMode) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div
        className={`App d-flex flex-column ${
          theme === "dark" ? "bg-dark" : "bg-light"
        }`}
      >
        <NavBar />

        <div className="container App-container">
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

        <Footer />
      </div>
    </Router>
  );
}

export default App;
