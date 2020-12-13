import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Paper,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { useAuthentication } from "../../context/auth";
import { getFlashcardById, editFlashcard } from "../../services/flashcards";
import * as _ from "lodash";
import "./Edit.scss";

const Edit = () => {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [listFlashcard, setListFlashcard] = useState([]);
  const { currentUser } = useAuthentication();
  const [isError, setIsError] = useState(false);
  const history = useHistory();
  const addFlashcard = () => {
    setListFlashcard([...listFlashcard, { vocabulary: "", meaning: "" }]);
  };
  const deleteFlashcard = (index) => {
    setListFlashcard([...listFlashcard].filter((value, key) => key !== index));
  };
  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };
  const handleChangeVocabulary = (index, event) => {
    let newListFlashcard = [...listFlashcard];
    newListFlashcard[index].vocabulary = event.target.value;
    setListFlashcard(newListFlashcard);
  };
  const handleChangeMeaning = (index, event) => {
    let newListFlashcard = [...listFlashcard];
    newListFlashcard[index].meaning = event.target.value;
    setListFlashcard(newListFlashcard);
  };
  const id = new URLSearchParams(window.location.search).get("id");
  const user = {
    uid: currentUser.uid,
    displayName: currentUser.displayName,
    email: currentUser.email,
    phoneNumber: currentUser.phoneNumber,
    photoURL: currentUser.photoURL,
  };
  const getData = async () => {
    try {
      const data = await getFlashcardById(id, user);
      if (data.author.uid === user.uid) {
        setTitle(data.title);
        setDescription(data.description);
        setListFlashcard(data.cards);
      } else setIsError(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
      ) : isError ? (
        <Grid style={{ textAlign: "center", margin: "2.5vw 0vw" }}>
        </Grid>
      ) : (
        <Grid className="edit-container">
          <Grid className="edit-header">
            <Typography variant="h6" className="edit-header-title">
              Sửa học phần
            </Typography>
            <Button
              variant="contained"
              className="edit-header-button"
              onClick={handleEditFlashcards}
            >
              Sửa
            </Button>
          </Grid>
          <Grid className="edit-header-content">
            <TextField
              value={title}
              onChange={handleChangeTitle}
              label="Tiêu đề"
            />
            <TextField
              value={description}
              onChange={handleChangeDescription}
              label="Mô tả"
            />
          </Grid>
          {listFlashcard.map((flashcard, key) => {
            return (
              <Paper key={key} elevation={3} className="edit-flashcard">
                <div className="edit-flashcard-header">
                  <Typography variant="h6">{key + 1}</Typography>
                  <Button onClick={() => deleteFlashcard(key)}>
                    <DeleteOutlineOutlinedIcon />
                  </Button>
                </div>
                <Divider />
                <div className="edit-flashcard-content">
                  <TextField
                    onChange={(event) => handleChangeVocabulary(key, event)}
                    value={flashcard.vocabulary}
                    className="edit-flashcard-input"
                    label="Thuật ngữ"
                  />
                  <TextField
                    onChange={(event) => handleChangeMeaning(key, event)}
                    value={flashcard.meaning}
                    className="edit-flashcard-input"
                    label="Định nghĩa"
                  />
                </div>
              </Paper>
            );
          })}

          <Paper elevation={3} className="edit-add-flashcard">
            <Button
              onClick={addFlashcard}
              className="edit-add-flashcard-button"
            >
              <Typography variant="h5">+ Thêm thẻ</Typography>
            </Button>
          </Paper>
        </Grid>
      )}
    </div>
  );
};

export default Edit;
