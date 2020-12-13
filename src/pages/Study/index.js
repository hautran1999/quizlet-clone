import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Avatar,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import LiveHelp from "@material-ui/icons/LiveHelp";
import { getFlashcardById } from "../../services/flashcards";
import { getUserByUid, updateUser } from "../../services/users";
import { useAuthentication } from "../../context/auth";
import "./Study.scss";

const Study = () => {
  const history = useHistory();
  const [quest, setQuest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [presentQuest, setPresentQuest] = useState(0);
  const [myAns, setMyAns] = useState(0);
  const [studied, setStudied] = useState([]);
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuthentication();
  const [learned, setLearned] = useState([]);

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
      ) : isError ? (
      ) : presentQuest === quest.length ? (
      ) : (
        <Grid container className="study">
          <Grid item sm={2}>
            <List>
              <ListItem button key="back" onClick={() => history.goBack()}>
                <ListItemIcon>
                  <ArrowBackIosIcon />
                </ListItemIcon>
                <ListItemText primary="Trở về" style={{ fontWeight: "bold" }} />
              </ListItem>
            </List>
            <Divider />
            <Typography variant="h5" className="study-sidebar-header">
              Học
            </Typography>
            <div style={{ margin: "1.5vw 0", textAlign: "center" }}>
              <Typography variant="h5">
                {quest.length - studied.length}
              </Typography>
              <Typography
                variant="body1"
                style={{ fontWeight: "bold", color: "#3ccfcf" }}
              >
                Chưa học
              </Typography>
            </div>
            <div style={{ margin: "1.5vw 0", textAlign: "center" }}>
              <Typography
                variant="h5"
                style={{ fontWeight: "bold", color: "#23b26d" }}
              >
                {studied.length}
              </Typography>
              <Typography
                variant="body1"
                style={{ fontWeight: "bold", color: "#23b26d" }}
              >
                Đã học
              </Typography>
            </div>
          </Grid>
          <Grid item sm={10}>
            {open ? (
              <Paper
                elevation={3}
                style={{ margin: "2.5vw", padding: "1.25vw" }}
              >
                <div style={{ marginBottom: "1.5vw" }}>
                  <Typography variant="h3" className="study-incorrect-header">
                    Học thuật ngữ này!
                  </Typography>
                </div>
                <Divider />
                <div style={{ margin: "1.5vw 0" }}>
                  <Typography
                    variant="body1"
                    className="study-incorrect-vocabulary"
                  >
                    Định nghĩa
                  </Typography>
                  <br />
                  <Typography
                    variant="body1"
                    className="study-incorrect-content"
                  >
                    {quest[presentQuest]?.question}
                  </Typography>
                  <br />
                  <Typography
                    variant="body1"
                    className="study-incorrect-meaning"
                  >
                    Đáp án đúng
                  </Typography>
                  <br />
                  <Typography
                    variant="body1"
                    className="study-incorrect-content"
                  >
                    {quest[presentQuest]?.answers[quest[presentQuest].right]}
                  </Typography>
                </div>
                <Divider />
                <div style={{ margin: "1.5vw 0" }}>
                  <Typography
                    variant="body1"
                    className="study-incorrect-answers"
                  >
                    Đáp án của bạn
                  </Typography>
                  <br />
                  <Typography
                    variant="body1"
                    className="study-incorrect-content"
                  >
                    {quest[presentQuest]?.answers[myAns]}
                  </Typography>
                </div>
                <Divider />
                <div style={{ marginTop: "1.5vw", textAlign: "center" }}>
                  <Button
                    className="study-incorrect-button"
                    onClick={() => setOpen(!open)}
                  >
                    Nhấn để tiếp tục
                  </Button>
                </div>
              </Paper>
            ) : (
              <Paper className="study-root" elevation={4}>
                <Typography component="p">
                  <Button
                    variant="fab"
                    color="primary"
                    aria-label="add"
                    className="study-button"
                  >
                    <Avatar style={{ backgroundColor: "#3f51b5" }}>
                      <LiveHelp />
                    </Avatar>
                  </Button>
                  <span className="study-question-meta">
                    Thuật ngữ {presentQuest + 1} / {quest.length}
                  </span>
                </Typography>

                <hr style={{ marginBottom: "20px" }} />
                <Typography
                  variant="headline"
                  style={{ margin: "2vw 1vw" }}
                  component="h3"
                >
                  {quest[presentQuest].question}
                </Typography>

                <div className="MultipleChoiceQuestionPrompt-options">
                  <div className="MultipleChoiceQuestionPrompt-termOptions">
                    {quest[presentQuest].answers.map((ans, index) => (
                      <div
                        className="MultipleChoiceQuestionPrompt-termOption"
                        role="button"
                        key={index}
                        onClick={() => handleCheckAnswer(index)}
                      >
                        <div className="MultipleChoiceQuestionPrompt-keyboardHint">
                          <div className="UIKeyboardHint is-white">
                            <span className="UIKeyboardHint-text is-white">
                              {index + 1}
                            </span>
                          </div>
                        </div>
                        <div className="MultipleChoiceQuestionPrompt-termOptionInner">
                          <div className="FormattedTextWithImage">
                            <div className="FormattedText">{ans}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* <div className="study-footer">
                      <Button
                        variant="contained"
                        className="study-button"
                        color="secondary"
                      >
                        Submit
                      </Button>
                      <Button
                        disable={presentQuest === quest.length}
                        onClick={() => setPresentQuest(presentQuest + 1)}
                        variant="contained"
                        color="primary"
                        className="study-button"
                        style={{ float: "right" }}
                      >
                        Next
                      </Button>
                      <Button
                        disable={presentQuest === quest.length}
                        onClick={() => setPresentQuest(presentQuest - 1)}
                        variant="contained"
                        color="primary"
                        className="study-button"
                        style={{ float: "right", marginRight: "50px" }}
                      >
                        Previous
                      </Button>
                    </div> */}
              </Paper>
            )}
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Study;
