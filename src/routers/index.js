import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import CreateFlashcards from "../pages/CreateFlashcards";
import Subject from "../pages/Subject";
import Search from "../pages/Search";
const Routers = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/create-flashcards" exact component={CreateFlashcards} />
      <Route path="/subject" exact component={Subject} />
      <Route path="/subject/:id?" exact component={Search} />
    </Switch>
  );
};

export default Routers;
