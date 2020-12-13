import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@material-ui/core";

const LearnSideBar = (props) => {
  const history = useHistory();
  const [selected, setSelected] = useState("");
  const selectedItem = (key) => {
    return selected === key;
  };
  const handleClick = (key) => {
    const query = new URLSearchParams({ id: props.query }).toString();
    setSelected(key);
    history.push(`/${key}?${query}`);
  };
  useEffect(() => {
    ["show", "study", "exam", "game"].map((key) =>
      window.location.href.includes(key) ? setSelected(key) : ""
    );
  }, []);

  return (
    <Grid>
      <Typography variant="h5" style={{ fontWeight: "bold" }}>
        Học
      </Typography>
      <List>
        <ListItem
          button
          key="show"
          selected={selectedItem("show")}
          onClick={() => handleClick("show")}
        >
          <ListItemText primary="Thẻ ghi nhớ" />
        </ListItem>
        <ListItem
          button
          key="study"
          selected={selectedItem("study")}
          onClick={() => handleClick("study")}
        >
          <ListItemText primary="Học" />
        </ListItem>
        <ListItem
          button
          key="exam"
          selected={selectedItem("exam")}
          onClick={() => handleClick("exam")}
        >
          <ListItemText primary="Kiểm tra" />
        </ListItem>
      </List>
      <Divider />
      <Typography variant="h5" style={{ fontWeight: "bold" }}>
        Trò chơi
      </Typography>
      <List>
        <ListItem
          button
          key="game"
          selected={selectedItem("game")}
          onClick={() => handleClick("game")}
        >
          <ListItemText primary="Ghép thẻ" />
        </ListItem>
      </List>
    </Grid>
  );
};

export default LearnSideBar;
