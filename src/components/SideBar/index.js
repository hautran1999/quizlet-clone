import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import AssessmentOutlinedIcon from "@material-ui/icons/AssessmentOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import FilterNoneOutlinedIcon from "@material-ui/icons/FilterNoneOutlined";
import FolderOutlinedIcon from "@material-ui/icons/FolderOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";

import "./SideBar.scss";

const SideBar = () => {
  return (
    <div>
      <List>
        <ListItem button key="home" selected={true}>
          <ListItemIcon>
            <HomeOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Trang chủ" />
        </ListItem>

        <ListItem button key="progress">
          <ListItemIcon>
            <AssessmentOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Tiến độ" />
        </ListItem>

        <ListItem button key="setting">
          <ListItemIcon>
            <SettingsOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Cài đặt" />
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListItem button key="term">
          <ListItemIcon>
            <FilterNoneOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Học phần" />
        </ListItem>

        <ListItem button key="folder">
          <ListItemIcon>
            <FolderOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Thư mục" />
        </ListItem>

        <ListItem button key="class">
          <ListItemIcon>
            <PeopleAltOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Lớp học" />
        </ListItem>
      </List>
    </div>
  );
};

export default SideBar;
