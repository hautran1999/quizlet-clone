import React, { useState, useEffect } from "react";
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
import { getFlashcardById } from "../../services/flashcards";
import { useAuthentication } from "../../context/auth";
import LiveHelp from "@material-ui/icons/LiveHelp";
import CheckIcon from "@material-ui/icons/Check";
import "./Exam.scss";

const Exam = () => {
  const [quest, setQuest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(-1);
  const [presentQuest, setPresentQuest] = useState(0);
  const [isError, setIsError] = useState(false);
  const [myAns, setMyAns] = useState([]);
  const { currentUser } = useAuthentication();
  const [timeLeft, setTimeLeft] = useState(-1);
  const id = new URLSearchParams(window.location.search).get("id");
  const user = {
    uid: currentUser.uid,
    displayName: currentUser.displayName,
    email: currentUser.email,
    phoneNumber: currentUser.phoneNumber,
    photoURL: currentUser.photoURL,
  };

  const initQuest = async () => {
    try {
      const data = await getFlashcardById(id, user);
      const cards = [...data.cards];
      let newQuest = [];
      for (let i = 0; i < cards.length; i++) {
        const answers = createAnswers([...cards], i);
        newQuest.push({
          question: cards[i].vocabulary,
          answers: answers,
          right: answers.indexOf(cards[i].meaning),
        });
      }
      setTimeLeft(600);
      setMyAns(Array(newQuest.length).fill(-1));
      setQuest(newQuest);
    } catch {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const createAnswers = (array, index) => {
    let ans = [];
    ans.push(array[index].meaning);
    array.splice(index, 1);
    for (let i = 0; i < (array.length < 3 ? array.length : 3); i++) {
      const rand = Math.floor(Math.random() * array.length);
      ans.push(array[rand].meaning);
      array.splice(rand, 1);
    }
    return shuffle(ans);
  };

  const shuffle = (array) => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  const handleCheckAnswer = (index) => {
    let newMyAns = [...myAns];
    newMyAns[presentQuest] = index;
    setMyAns(newMyAns);
  };

  const displayTimeLeft = (seconds) => {
    let minutesLeft = Math.floor(seconds / 60);
    let secondsLeft = seconds % 60;
    minutesLeft =
      minutesLeft.toString().length === 1 ? "0" + minutesLeft : minutesLeft;
    secondsLeft =
      secondsLeft.toString().length === 1 ? "0" + secondsLeft : secondsLeft;
    return `${minutesLeft}:${secondsLeft}`;
  };

  const submit = () => {
    let count = 0;
    for (let i = 0; i < quest.length; i++) {
      quest[i].right == myAns[i] && count++;
    }
    setScore((Math.round((count * 10) / quest.length) * 100) / 100);
  };

  const handleExamAgain = () => {
    setLoading(true);
    setScore(-1);
    initQuest();
  };

  useEffect(() => {
    initQuest();
  }, []);

  useEffect(() => {
    if (timeLeft === -1) {
      return;
    } else if (timeLeft === 0) {
      submit();
    } else {
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timeLeft]);

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
        <Paper
          style={{
            marginTop: "2.5vw",
            display: "flex",
            height: "60vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Typography
              variant="h5"
              style={{ fontWeight: "bold", margin: "1vw" }}
            >
              Không tìm thấy bộ thẻ
            </Typography>
          </div>
        </Paper>
      ) : score !== -1 ? (
        <Paper
          style={{
            marginTop: "2.5vw",
            display: "flex",
            height: "60vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Typography
              variant="h1"
              style={{ fontWeight: "bold", margin: "1vw" }}
            >
              {score}
            </Typography>
            <br />
            <Button
              onClick={handleExamAgain}
              variant="contained"
              color="primary"
              style={{ textTransform: "none", fontWeight: "bold" }}
            >
              Làm lại bài kiểm tra
            </Button>
          </div>
        </Paper>
      ) : (
        <Grid container className="exam">
          <Grid item md={2}>
            <List>
              <ListItem button key="back">
                <ListItemIcon>
                  <CheckIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Nộp bài"
                  style={{ fontWeight: "bold" }}
                />
              </ListItem>
            </List>
            <Divider />
            <Typography variant="h5" className="exam-sidebar-header">
              Kiểm tra
            </Typography>
            <div style={{ margin: "1.5vw 0", textAlign: "center" }}>
              <Typography
                variant="body1"
                style={{ fontWeight: "bold", color: "#3ccfcf" }}
              >
                Thời gian còn lại
              </Typography>
              <br />
              <Typography variant="h5">{displayTimeLeft(timeLeft)}</Typography>
            </div>
            <div style={{ margin: "1.5vw 0", textAlign: "center" }}>
              <Typography
                variant="body1"
                style={{ fontWeight: "bold", color: "#3ccfcf" }}
              >
                Danh sách câu hỏi
              </Typography>
              <br />
              <div
                style={{ margin: "1.5vw 0", display: "flex", flexWrap: "wrap" }}
              >
                {myAns.map((ans, index) => (
                  <Avatar
                    onClick={() => setPresentQuest(index)}
                    style={{
                      backgroundColor: ans !== -1 ? "#3ccfcf" : "#bdbdbd",
                    }}
                    className="exam-number"
                  >
                    {index + 1}
                  </Avatar>
                ))}
              </div>
            </div>
          </Grid>
          <Grid item md={10}>
            <Paper className="exam-root" elevation={4}>
              <Typography component="p">
                <Button
                  variant="fab"
                  color="primary"
                  aria-label="add"
                  className="exam-button"
                >
                  <Avatar style={{ backgroundColor: "#3f51b5" }}>
                    <LiveHelp />
                  </Avatar>
                </Button>
                <span className="exam-question-meta">
                  Câu hỏi {presentQuest + 1} / {quest.length}
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
                      data-testid="option-1"
                      role="button"
                      key={index}
                      style={{
                        border: `0.125rem solid ${
                          myAns[presentQuest] === index ? "#ffcd1f" : "#3ccfcf"
                        }`,
                      }}
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
              <div className="exam-footer">
                <Button
                  variant="contained"
                  className="exam-button"
                  color="secondary"
                  onClick={submit}
                >
                  Submit
                </Button>
                <Button
                  disable={presentQuest === quest.length - 1}
                  onClick={() => setPresentQuest(presentQuest + 1)}
                  variant="contained"
                  color="primary"
                  className="exam-button"
                  style={{ float: "right" }}
                >
                  Next
                </Button>
                <Button
                  disable={presentQuest === 0}
                  onClick={() => setPresentQuest(presentQuest - 1)}
                  variant="contained"
                  color="primary"
                  className="exam-button"
                  style={{ float: "right", marginRight: "50px" }}
                >
                  Previous
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Exam;
