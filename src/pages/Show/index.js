import React, { useState, useEffect } from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import { Typography, Grid, IconButton } from "@material-ui/core";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import "./Show.scss";

const Show = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [index, setIndex] = useState(0);
  const getFlashcards = () => {
    let data = [];
    for (let i = 0; i < 25; i++) {
      data.push({
        term: "Term " + (i + 1),
        definition: "Definition " + (i + 1),
      });
    }
    return data;
  };
  useEffect(() => {
    const data = getFlashcards();
    setFlashcards(data);
  }, []);

  const handlePrevious = () => {
    setIndex(index - 1);
  };
  const handleNext = () => {
    setIndex(index + 1);
  };

  return (
    <Grid className="show-container">
      <Flippy>
        <FrontSide>
          <Grid className="show-slide-card">
            <Typography variant="body1">{flashcards[index]?.term}</Typography>
          </Grid>
        </FrontSide>
        <BackSide>
          <Grid className="show-slide-card">
            <Typography variant="body1">
              {flashcards[index]?.definition}
            </Typography>
          </Grid>
        </BackSide>
      </Flippy>
      <Grid className="show-slide-control">
        <IconButton
          disabled={index === 0 ? true : false}
          color="inherit"
          onClick={handlePrevious}
        >
          <ArrowBackIosOutlinedIcon />
        </IconButton>
        <Typography variant="body1">
          {index + 1}/{flashcards.length}
        </Typography>
        <IconButton
          disabled={index === flashcards.length - 1 ? true : false}
          color="inherit"
          onClick={handleNext}
        >
          <ArrowForwardIosOutlinedIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Show;
