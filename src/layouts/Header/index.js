import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import NoteAddOutlinedIcon from "@material-ui/icons/NoteAddOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header-container">
      <AppBar position="static" className="header-app-bar">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            className="header-title"
            variant="h6"
          >
            Quizlet
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <Button>
            <SearchOutlinedIcon />
            Tìm kiếm
          </Button>
          <Button component={Link} to="/create-flashcards">
            <NoteAddOutlinedIcon />
            Tạo
          </Button>
          <div style={{ flexGrow: 0 }} />
          <div>
            <IconButton
              className="header-user-icon"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
