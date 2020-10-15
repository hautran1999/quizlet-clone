import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "../pages/Home";
import Create from "../pages/Create";
import Search from "../pages/Search";
import SearchResult from "../pages/SearchResult";
import Show from "../pages/Show";
import Study from "../pages/Study";
import Exam from "../pages/Exam";
import Game from "../pages/Game";
import MainLayout from "../layouts/MainLayout";
import UserManagerLayout from "../layouts/UserManagerLayout";
import LearnLayout from "../layouts/LearnLayout";
const Routers = () => {
  return (
    <Switch>
      <MainLayout>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/create" exact component={Create} />
          <Route path="/search" exact component={Search} />
          <Route path="/search/result" exact component={SearchResult} />
          <Route path={["/home"]}>
            <UserManagerLayout>
              <Switch>
                <Route path="/home" exact component={Home} />
              </Switch>
            </UserManagerLayout>
          </Route>
          <Route path={["/show", "/study", "/exam", "/game"]}>
            <LearnLayout>
              <Switch>
                <Route path="/show" exact component={Show} />
                <Route path="/study" exact component={Study} />
                <Route path="/exam" exact component={Exam} />
                <Route path="/game" exact component={Game} />
              </Switch>
            </LearnLayout>
          </Route>
        </Switch>
      </MainLayout>
    </Switch>
  );
};

export default Routers;
