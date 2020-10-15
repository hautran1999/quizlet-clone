import React from "react";
import Header from "../Header";
import { Container, Grid } from "@material-ui/core";

const MainLayout = (props) => {
  return (
    <Grid>
      <Header />
      <Container fixed>{props.children}</Container>
    </Grid>
  );
};

export default MainLayout;
