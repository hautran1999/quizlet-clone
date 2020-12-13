import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Paper,
  CircularProgress,
  Button,
} from "@material-ui/core";
import { getFlashcardById } from "../../services/flashcards";
import { useAuthentication } from "../../context/auth";
import "./Game.scss";

const Game = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [score, setScore] = useState(0);
  const [isError, setIsError] = useState(false);
  const [selectFirst, setSelectFirst] = useState();
  const [selectSecond, setSelectSecond] = useState();
  const { currentUser } = useAuthentication();
  const user = {
    uid: currentUser.uid,
    displayName: currentUser.displayName,
    email: currentUser.email,
    phoneNumber: currentUser.phoneNumber,
    photoURL: currentUser.photoURL,
  };
  const id = new URLSearchParams(window.location.search).get("id");
  const initGame = async () => {
    try {
      let newData = await getFlashcardById(id, user);
      let cards = newData.cards;
      let gameData = [];
      const n = cards.length < 6 ? cards.length : 6;
      for (let i = 0; i < n; i++) {
        const rand = Math.floor(Math.random() * cards.length);
        gameData.push({ text: cards[rand].vocabulary, status: "none", id: i });
        gameData.push({ text: cards[rand].meaning, status: "none", id: i });
        cards.splice(rand, 1);
      }
      setData(shuffle(gameData));
    } catch {
      setIsError(true);
    } finally {
      setLoading(false);
    }
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

  const handleClick = async (key) => {
    if (selectFirst !== undefined && selectFirst !== key) {
      setSelectSecond(key);
    } else {
      setSelectFirst(key);
    }
    let newData = [...data];
    newData[key].status = "select";
    setData(newData);
  };

  const handlePlayAgain = async () => {
    setLoading(true);
    setScore(0);
    await initGame();
  };
  const changeColor = (status) => {
    switch (status) {
      case "select":
        return { boxShadow: "1px 1px 1px 1px #2C3E50" };
      case "correct":
        return { boxShadow: "1px 1px 1px 1px #23b26d" };
      case "wrong":
        return { boxShadow: "1px 1px 1px 1px #ff725b" };
      default:
        return {};
    }
  };

  const handleCompare = () => {
    if (selectSecond !== undefined) {
      let newData = [...data];
      let status = "wrong";
      let nextStatus = "none";
      if (data[selectFirst].id === data[selectSecond].id) {
        setScore(score + 1);
        status = "correct";
        nextStatus = "finish";
      }
      newData[selectFirst].status = newData[selectSecond].status = status;
      setData(newData);
      setTimeout(function () {
        newData[selectFirst].status = newData[selectSecond].status = nextStatus;
        setData(newData);
        setSelectSecond();
        setSelectFirst();
      }, 500);
    }
  };

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    handleCompare();
  }, [selectSecond]);

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
      ) : score === data.length / 2 ? (
        <Paper
          style={{
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
              Chúc mừng bạn đã chiến thắng
            </Typography>
            <br />
            <Button
              onClick={handlePlayAgain}
              variant="contained"
              color="primary"
              style={{ textTransform: "none", fontWeight: "bold" }}
            >
              Chơi lại
            </Button>
          </div>
        </Paper>
      ) : (
        <Grid style={{ display: "flex", flexWrap: "wrap" }}>
          {data.map((item, key) => (
            <Grid key={key} item xs={3}>
              {item.status === "finish" ? (
                <Paper
                  elevation={0}
                  style={{ backgroundColor: "#f6f7fb" }}
                  className="card"
                />
              ) : (
                <Paper
                  onClick={() => handleClick(key)}
                  className="card"
                  style={changeColor(item.status)}
                >
                  {item.text}
                </Paper>
              )}
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Game;
