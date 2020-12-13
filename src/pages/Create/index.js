import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Paper,
  Divider,
} from "@material-ui/core";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { useAuthentication } from "../../context/auth";
import { createFlashcard } from "../../services/flashcards";
import * as _ from "lodash";
import "./Create.scss";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [listFlashcard, setListFlashcard] = useState([]);
  const { currentUser } = useAuthentication();
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

  const handleCreateFlashcards = async () => {

      const flashcard = {
        id: uuid(),
        uid: currentUser.uid,
        createTime: Date.now(),
        title: title,
        description: description,
        author: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          email: currentUser.email,
          phoneNumber: currentUser.phoneNumber,
          photoURL: currentUser.photoURL,
        },
        cards: listFlashcard,
      };
      try {
        await createFlashcard(flashcard);
        history.push("/home");
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <Grid className="create-container">
      <Grid className="create-header">
        <Typography variant="h6" className="create-header-title">
          Tạo học phần mới
        </Typography>
        <Button
          variant="contained"
          className="create-header-button"
          onClick={handleCreateFlashcards}
        >
          Tạo
        </Button>
      </Grid>
      <Grid className="create-header-content">
        <TextField
          required
          value={title}
          onChange={handleChangeTitle}
          label="Tiêu đề"
        />
        <TextField
          required
          value={description}
          onChange={handleChangeDescription}
          label="Mô tả"
        />
      </Grid>
      {listFlashcard.map((flashcard, key) => {
        return (
          <Paper key={key} elevation={3} className="create-flashcard">
            <div className="create-flashcard-header">
              <Typography variant="h6">{key + 1}</Typography>
              <Button onClick={() => deleteFlashcard(key)}>
                <DeleteOutlineOutlinedIcon />
              </Button>
            </div>
            <Divider />
            <div className="create-flashcard-content">
              <TextField
                onChange={(event) => handleChangeVocabulary(key, event)}
                value={flashcard.vocabulary}
                className="create-flashcard-input"
                label="Thuật ngữ"
              />
              <TextField
                onChange={(event) => handleChangeMeaning(key, event)}
                value={flashcard.meaning}
                className="create-flashcard-input"
                label="Định nghĩa"
              />
            </div>
          </Paper>
        );
      })}

      <Paper elevation={3} className="create-add-flashcard">
        <Button onClick={addFlashcard} className="create-add-flashcard-button">
          <Typography variant="h5">+ Thêm thẻ</Typography>
        </Button>
      </Paper>
    </Grid>
  );
};

export default Create;
