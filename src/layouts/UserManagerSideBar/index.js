import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import AssessmentOutlinedIcon from "@material-ui/icons/AssessmentOutlined";
import FilterNoneOutlinedIcon from "@material-ui/icons/FilterNoneOutlined";
import "./UserManagerSideBar.scss";

const UserManagerSideBar = () => {
  const [selected, setSelected] = useState("");
  const selectedItem = (key) => {
    return selected === key;
  };
  useEffect(() => {
    ["home", "progress", "term"].map(
      (key) => window.location.href.includes(key) && setSelected(key)
    );
  }, []);
  return (
    <Grid>
      <List>
        <ListItem
          button
          key="home"
          selected={selectedItem("home")}
          onClick={() => setSelected("home")}
          component={Link}
          to="/home"
        >
          <ListItemIcon>
            <HomeOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Trang chủ" />
        </ListItem>

        <ListItem
          button
          key="progress"
          selected={selectedItem("progress")}
          onClick={() => setSelected("progress")}
          component={Link}
          to="/progress"
        >
          <ListItemIcon>
            <AssessmentOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Tiến độ" />
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListItem
          button
          key="term"
          selected={selectedItem("term")}
          onClick={() => setSelected("term")}
          component={Link}
          to="/term"
        >
          <ListItemIcon>
            <FilterNoneOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Học phần" />
        </ListItem>
      </List>
    </Grid>
  );
};

export default UserManagerSideBar;
