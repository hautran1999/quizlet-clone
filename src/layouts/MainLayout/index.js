import React from "react";
import Header from "../Header";
import { Grid } from "@material-ui/core";

const MainLayout = (props) => {
  return (
    <Grid
      style={{ height: "auto", minHeight: "100vh", backgroundColor: "#f6f7fb" }}
    >
      <Header />
      <div>{props.children}</div>
    </Grid>
  );
};

export default MainLayout;
