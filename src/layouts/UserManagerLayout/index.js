import React from "react";
import { Grid } from "@material-ui/core";
import UserManagerSideBar from "../UserManagerSideBar";
const UserManagerLayout = (props) => {
  return (
    <Grid container spacing={3}>
      <Grid item md={3}>
        <UserManagerSideBar />
      </Grid>
      <Grid item md={6}>
        {props.children}
      </Grid>
    </Grid>
  );
};

export default UserManagerLayout;
