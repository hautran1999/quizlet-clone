import React, { useState, useEffect } from "react";
import { Progress } from "react-sweet-progress";
import { useHistory, Link } from "react-router-dom";
import * as _ from "lodash";
import {
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
} from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import { getUserByUid, createUser } from "../../services/users";
import { useAuthentication } from "../../context/auth";

import "./Home.scss";
import "react-sweet-progress/lib/style.css";

const Home = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [recently, setRecently] = useState({});
  const [watched, setWatched] = useState([]);
  const [created, setCreated] = useState([]);
  return (
    <div>
      {loading ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <div style={{ margin: ".5vw" }}>
        </div>
      )}
    </div>
  );
};

export default Home;
