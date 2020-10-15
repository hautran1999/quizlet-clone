import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";
import "./Game.scss";

const Game = () => {
  const [data, setData] = useState([]);
  const [score, setScore] = useState(0);
  const [selectFirst, setSelectFirst] = useState();
  const [selectSecond, setSelectSecond] = useState();

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

  const changeColor = (status) => {
    switch (status) {
      case "select":
        return { boxShadow: "1px 1px 1px 1px #2C3E50" };

      case "correct":
        return { boxShadow: "1px 1px 1px 1px #2ECC71" };

      case "wrong":
        return { boxShadow: "1px 1px 1px 1px #E74C3C" };

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
    const newData = [];
    for (let i = 1; i <= 6; i++) {
      newData.push({ text: "Term " + i, status: "none", id: i });
      newData.push({ text: "Definition " + i, status: "none", id: i });
    }
    setData(newData);
  }, []);

  useEffect(() => {
    handleCompare();
  }, [selectSecond]);

  return (
    <div>
      <Grid style={{ display: "flex", flexWrap: "wrap" }}>
        {data.map((item, key) => (
          <Grid key={key} item xs={3}>
            {item.status === "finish" ? (
              <Paper elevation={0} className="card" />
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
      <div>Score: {score}</div>
    </div>
  );
};

export default Game;
