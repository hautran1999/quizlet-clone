import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Progress from "../pages/Progress";
import Term from "../pages/Term";
import Create from "../pages/Create";
import Edit from "../pages/Edit";
import Search from "../pages/Search";
import SearchResult from "../pages/SearchResult";
import Show from "../pages/Show";
import Study from "../pages/Study";
import Exam from "../pages/Exam";
import Game from "../pages/Game";
import MainLayout from "../layouts/MainLayout";
import UserManagerLayout from "../layouts/UserManagerLayout";
import LearnLayout from "../layouts/LearnLayout";
import { Container } from "@material-ui/core";

const Routers = () => {
  return (
    <Switch>
      <MainLayout>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Container fixed>
            <Route path="/login" exact component={Login} />
            <PrivateRoute path="/create" exact component={Create} />
            <PrivateRoute path="/search" exact component={Search} />
            <PrivateRoute
              path="/search/result"
              exact
              component={SearchResult}
            />
            <PrivateRoute path="/study" exact component={Study} />
            <PrivateRoute path="/exam" exact component={Exam} />
            <PrivateRoute path="/edit" exact component={Edit} />
            <PrivateRoute path={["/home", "/progress", "/term"]}>
              <UserManagerLayout>
                <Switch>
                  <PrivateRoute path="/home" exact component={Home} />
                  <PrivateRoute path="/progress" exact component={Progress} />
                  <PrivateRoute path="/term" exact component={Term} />
                </Switch>
              </UserManagerLayout>
            </PrivateRoute>
            <PrivateRoute path={["/show", "/game"]}>
              <LearnLayout>
                <Switch>
                  <PrivateRoute path="/show" exact component={Show} />
                  <PrivateRoute path="/game" exact component={Game} />
                </Switch>
              </LearnLayout>
            </PrivateRoute>
          </Container>
        </Switch>
      </MainLayout>
    </Switch>
  );
};

export default Routers;
