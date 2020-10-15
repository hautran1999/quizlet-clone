import React from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@material-ui/core";

const LearnSideBar = () => {
  return (
    <Grid>
      <Typography variant="h5" style={{ fontWeight: "bold" }}>
        Học
      </Typography>
      <List>
        <ListItem component={Link} to="/show" button key="show">
          <ListItemText primary="Thẻ ghi nhớ" />
        </ListItem>
        <ListItem component={Link} to="/study" button key="study">
          <ListItemText primary="Học" />
        </ListItem>
        <ListItem component={Link} to="/exam" button key="exam">
          <ListItemText primary="Kiểm tra" />
        </ListItem>
      </List>
      <Divider />
      <Typography variant="h5" style={{ fontWeight: "bold" }}>
        Trò chơi
      </Typography>
      <List>
        <ListItem component={Link} to="/game" button key="card-transplant">
          <ListItemText primary="Ghép thẻ" />
        </ListItem>
      </List>
    </Grid>
  );
};

export default LearnSideBar;
