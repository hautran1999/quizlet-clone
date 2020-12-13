import React, { useState, useEffect } from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import {
  Typography,
  Grid,
  IconButton,
  CircularProgress,
  Paper,
} from "@material-ui/core";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import { getFlashcardById } from "../../services/flashcards";
import { useAuthentication } from "../../context/auth";
import "./Show.scss";

const Show = () => {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuthentication();
  const user = {
    uid: currentUser.uid,
    displayName: currentUser.displayName,
    email: currentUser.email,
    phoneNumber: currentUser.phoneNumber,
    photoURL: currentUser.photoURL,
  };
  const id = new URLSearchParams(window.location.search).get("id");
  const getData = async () => {
    try {
      const newData = await getFlashcardById(id, user);
      setData(newData);
    } catch (error) {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handlePrevious = () => {
    setIndex(index - 1);
  };
  const handleNext = () => {
    setIndex(index + 1);
  };

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
      ) : (
        <Grid className="show-container">
          <Flippy>
            <FrontSide style={{ backgroundColor: "white" }}>
              <Grid className="show-slide-card">
                <Typography variant="body1">
                  {data.cards[index].meaning}
                </Typography>
              </Grid>
            </FrontSide>
            <BackSide style={{ backgroundColor: "white" }}>
              <Grid className="show-slide-card">
                <Typography variant="body1">
                  {data.cards[index].vocabulary}
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
              {index + 1}/{data.cards.length}
            </Typography>
            <IconButton
              disabled={index === data.cards.length - 1 ? true : false}
              color="inherit"
              onClick={handleNext}
            >
              <ArrowForwardIosOutlinedIcon />
            </IconButton>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Show;
