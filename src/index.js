import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";

import { ContextProvider } from "./context";
import "./App.sass";
import "bootstrap/dist/css/bootstrap.min.css";
import Posts from "./Posts";
import PaginationPage from "./Pagination";

const App = () => {
  return (
    <div className="App" style={{ padding: "30px" }}>
      <ContextProvider>
        <Router basename="/react-pagination/">
          <h1 className="text-center" style={{ marginBottom: "60px" }}>
            Posts from{" "}
            <Button target="_blank" href="https://jsonplaceholder.typicode.com">
              jsonplaceholder
            </Button>
          </h1>
          <Route exact path="/">
            <Redirect to="/1" />
          </Route>
          <Route path="/:pageNum" component={Posts} />
          <Route component={PaginationPage} />
        </Router>
      </ContextProvider>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
