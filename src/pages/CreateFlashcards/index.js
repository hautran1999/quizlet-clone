import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  Paper,
  Divider,
} from "@material-ui/core";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import "./CreateFlashcards.scss";

const CreateFlashcards = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [listFlashcard, setListFlashcard] = useState([]);
  const addFlashcard = () => {
    setListFlashcard([...listFlashcard, { term: "", definition: "" }]);
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
  const handleChangeTerm = (index, event) => {
    let newListFlashcard = [...listFlashcard];
    newListFlashcard[index].term = event.target.value;
    setListFlashcard(newListFlashcard);
  };
  const handleChangeDefinition = (index, event) => {
    let newListFlashcard = [...listFlashcard];
    newListFlashcard[index].definition = event.target.value;
    setListFlashcard(newListFlashcard);
  };

  useEffect(() => {}, []);

  return (
    <Container fixed className="create-container">
      <div className="create-header">
        <Typography variant="h6" className="create-header-title">
          Tạo học phần mới
        </Typography>
        <Button variant="contained" className="create-header-button">
          Tạo
        </Button>
      </div>
      <div className="create-header-content">
        <TextField value={title} onChange={handleChangeTitle} label="Tiêu đề" />
        <TextField
          value={description}
          onChange={handleChangeDescription}
          label="Mô tả"
        />
      </div>
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
                onChange={(event) => handleChangeTerm(key, event)}
                value={flashcard.term}
                className="create-flashcard-input"
                label="Thuật ngữ"
              />
              <TextField
                onChange={(event) => handleChangeDefinition(key, event)}
                value={flashcard.definition}
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
    </Container>
  );
};

export default CreateFlashcards;
