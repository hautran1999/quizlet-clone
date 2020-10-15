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

const LearnSideBar = (props) => {
  const query = new URLSearchParams({ id: props.query }).toString();
  return (
    <Grid>
      <Typography variant="h5" style={{ fontWeight: "bold" }}>
        Học
      </Typography>
      <List>
        <ListItem component={Link} to={"/show?" + query} button key="show">
          <ListItemText primary="Thẻ ghi nhớ" />
        </ListItem>
        <ListItem component={Link} to={"/study?" + query} button key="study">
          <ListItemText primary="Học" />
        </ListItem>
        <ListItem component={Link} to={"/exam?" + query} button key="exam">
          <ListItemText primary="Kiểm tra" />
        </ListItem>
      </List>
      <Divider />
      <Typography variant="h5" style={{ fontWeight: "bold" }}>
        Trò chơi
      </Typography>
      <List>
        <ListItem
          component={Link}
          to={"/game?" + query}
          button
          key="card-transplant"
        >
          <ListItemText primary="Ghép thẻ" />
        </ListItem>
      </List>
    </Grid>
  );
};

export default LearnSideBar;
