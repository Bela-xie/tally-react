import React from "react";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Tags from "views/Tags";
import Money from "views/Money";
import Details from "views/Details";
import Statistics from "views/Statistics";
import NotFound from "views/NotFound";
import styled from "styled-components";
import { Tag } from "views/Tag";

const AppWrapper = styled.div`
  color: #333;
`;
function App() {
  return (
    <AppWrapper>
      <Router>
        <Switch>
          <Redirect exact from="/" to="/money" />
          <Route exact path="/tags">
            <Tags />
          </Route>
          <Route exact path="/tags/:id">
            <Tag />
          </Route>
          <Route exact path="/details">
            <Details />
          </Route>
          <Route exact path="/money">
            <Money />
          </Route>
          <Route exact path="/statistics">
            <Statistics />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </AppWrapper>
  );
}
export default App;
