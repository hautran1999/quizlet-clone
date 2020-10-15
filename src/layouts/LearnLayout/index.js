import React from "react";
import { Grid, Typography } from "@material-ui/core";
import LearnSideBar from "../LearnSideBar";
const LearnLayout = (props) => {
  return (
    <Grid>
      <Grid
        container
        style={{
          height: "6.875rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" style={{ fontWeight: "bold" }}>
          Title
        </Typography>
      </Grid>
      <Grid container spacing={3}>
        <Grid item md={3}>
          <LearnSideBar />
        </Grid>
        <Grid item md={9}>
          {props.children}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LearnLayout;
