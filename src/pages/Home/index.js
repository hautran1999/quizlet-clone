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
  const { currentUser } = useAuthentication();

  const getData = async () => {
    try {
      const newData = await getUserByUid(currentUser.uid);
      setCreated(newData.created);
      setWatched(newData.watched);
      setRecently(newData.learned[newData.learned.length - 1]);
    } catch {
      await createUser({
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        email: currentUser.email,
        phoneNumber: currentUser.phoneNumber,
        photoURL: currentUser.photoURL,
        created: [],
        watched: [],
        learned: [],
      });
    } finally {
      setLoading(false);
    }
  };
  const seeAll = (tab) => {
    history.push(`/term?tab=${tab}`);
  };

  useEffect(() => {
    getData();
  }, []);
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
          {!_.isEmpty(recently) && (
            <Paper style={{ padding: "2vw", margin: "2.5vw 0" }}>
              <Grid container>
                <Grid
                  item
                  md={3}
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Progress
                    type="circle"
                    width={100}
                    percent={Math.round(
                      (recently.studied.length * 100) / recently.total
                    )}
                  />
                </Grid>
                <Grid item md={9}>
                  <div className="NextActionBase-textWrapper">
                    <div className="NextActionBase-header">
                      {recently.title}
                    </div>
                    <div className="NextActionBase-subheader">
                      Khởi đầu rất tốt! Hãy tiếp tục phát huy với chế độ Học
                      nhé.
                    </div>
                    <Button
                      component={Link}
                      to={`/study?id=${recently.id}`}
                      aria-label="Tiếp tục Học"
                      variant="contained"
                      className="UIButton"
                      type="button"
                      style={{ backgroundColor: "#3ccfcf" }}
                    >
                      <span
                        className="UIButton-wrapper"
                        style={{ color: "#fff" }}
                      >
                        Tiếp tục Học
                      </span>
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Paper>
          )}
          {!_.isEmpty(watched) && (
            <div>
              <div style={{ display: "flex" }}>
                <h5
                  style={{
                    fontSize: "1rem",
                    letterSpacing: "normal",
                    lineHeight: 1.5,
                    flexGrow: 1,
                  }}
                >
                  Gần đây
                </h5>
                <h5
                  onClick={() => seeAll(1)}
                  style={{
                    fontSize: "1rem",
                    letterSpacing: "normal",
                    lineHeight: 1.5,
                    color: "#3ccfcf",
                    cursor: "pointer",
                  }}
                >
                  Xem tất cả
                </h5>
              </div>
              <Grid container spacing={1}>
                {watched
                  .slice(0, watched.length < 2 ? watched.length : 2)
                  .reverse()
                  .map((i, index) => (
                    <Grid key={index} item md={6}>
                      <Paper
                        onClick={() => history.push(`/show?id=${i.id}`)}
                        style={{ padding: "1vw" }}
                      >
                        <div>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <ImageIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={i.title}
                              secondary={i.author.displayName}
                            />
                          </ListItem>
                        </div>
                        <Divider />
                        <div className="item-demo-container">
                          <Typography variant="body2">
                            Thuật ngữ: {i.total}
                          </Typography>
                        </div>
                      </Paper>
                    </Grid>
                  ))}
              </Grid>
            </div>
          )}
          {!_.isEmpty(created) && (
            <div>
              <div style={{ display: "flex" }}>
                <h5
                  style={{
                    fontSize: "1rem",
                    letterSpacing: "normal",
                    lineHeight: 1.5,
                    flexGrow: 1,
                  }}
                >
                  Đã tạo
                </h5>
                <h5
                  onClick={() => seeAll(2)}
                  style={{
                    fontSize: "1rem",
                    letterSpacing: "normal",
                    lineHeight: 1.5,
                    color: "#3ccfcf",
                    cursor: "pointer",
                  }}
                >
                  Xem tất cả
                </h5>
              </div>
              <Grid container spacing={1}>
                {created
                  .slice(0, created.length < 2 ? created.length : 2)
                  .reverse()
                  .map((i, index) => (
                    <Grid key={index} item md={6}>
                      <Paper
                        onClick={() => history.push(`/show?id=${i.id}`)}
                        style={{ padding: "1vw" }}
                      >
                        <div>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <ImageIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={i.title}
                              secondary={currentUser.displayName}
                            />
                          </ListItem>
                        </div>
                        <Divider />
                        <div className="item-demo-container">
                          <Typography variant="body2">
                            Thuật ngữ: {i.total}
                          </Typography>
                        </div>
                      </Paper>
                    </Grid>
                  ))}
              </Grid>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
