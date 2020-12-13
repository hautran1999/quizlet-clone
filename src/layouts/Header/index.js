import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import NoteAddOutlinedIcon from "@material-ui/icons/NoteAddOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { logOutUser } from "../../services/auth";
import { useAuthentication } from "../../context/auth";
import "./Header.scss";

const Header = () => {
  const { currentUser } = useAuthentication();
  const [openMenu, setOpenMenu] = useState(null);
  const handleClick = (event) => {
    setOpenMenu(event.currentTarget);
  };
  const handleLogOut = () => {
    setOpenMenu(null);
    logOutUser();
  };
  return (
    <div className="header-container">
      <AppBar position="static" className="header-app-bar">
        <Toolbar>
          <Typography
            component={Link}
            to="/home"
            className="header-title"
            variant="h6"
          >
            Quizlet
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <Button component={Link} to="/search">
            <SearchOutlinedIcon />
            Tìm kiếm
          </Button>
          <Button component={Link} to="/create">
            <NoteAddOutlinedIcon />
            Tạo
          </Button>
          <div style={{ flexGrow: 0 }} />
          <div>
            {!currentUser ? (
              <Button component={Link} to="/login">
                Đăng Nhập
              </Button>
            ) : (
              <div>
                <IconButton
                  className="header-user-icon"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleClick}
                >
                  <AccountCircle />
                </IconButton>
                <Menu keepMounted anchorEl={openMenu} open={Boolean(openMenu)}>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>My account</MenuItem>
                  <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
