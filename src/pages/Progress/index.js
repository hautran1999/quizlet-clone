import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as _ from "lodash";
import { Grid, Paper, Button, CircularProgress } from "@material-ui/core";
import { getUserByUid } from "../../services/users";
import { useAuthentication } from "../../context/auth";

import "./Progress.scss";
import "react-sweet-progress/lib/style.css";

const Progress = () => {
  const [loading, setLoading] = useState(true);
  const [learned, setLearned] = useState({});
  const { currentUser } = useAuthentication();

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
        <Grid style={{ margin: ".5vw" }}>
          {!_.isEmpty(learned) &&
            learned.map((i) => (
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
                  </Grid>
                  <Grid item md={9}>
                    <div className="NextActionBase-textWrapper">
                      <div className="NextActionBase-header">{i.title}</div>
                      <div className="NextActionBase-subheader">
                        Khởi đầu rất tốt! Hãy tiếp tục phát huy với chế độ Học
                        nhé.
                      </div>
                      <Button
                        component={Link}
                        to={`/study?id=${i.id}`}
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
            ))}
        </Grid>
      )}
    </div>
  );
};

export default Progress;
