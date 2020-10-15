import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Typography,
  Grid,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import "./SearchResult.scss";

const SearchResult = () => {
  const history = useHistory();
  const searchContent = new URLSearchParams(window.location.search).get(
    "search"
  );
  const [list, setList] = useState([]);
  const handleClick = (id) => {
    const query = new URLSearchParams({ id: id }).toString();
    history.push("/show?" + query);
  };
  useEffect(() => {
    let data = [];
    for (let i = 0; i < 25; i++) {
      data.push({
        id: i,
        user: "Asimo " + i,
        title: "Lịch sử " + i,
        terms: i,
        description:
          "Lịch sử là môn khoa học nghiên cứu về quá khứ, đặc biệt là những sự kiện liên quan đến con người.",
      });
    }
    setList(data);
  }, []);

  return (
    <Grid className="search-result-container">
      <Grid container className="search-result-header-container" spacing={3}>
        <Grid item md={2} />
        <Grid item md={8} className="search-result-header-main">
          <Typography variant="h5" className="search-result-header-title">
            {searchContent}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className="search-result-content-container" spacing={3}>
        <Grid item md={2} className="search-result-content-filter">
          Filter
        </Grid>
        <Grid item md={8} className="search-result-content-main">
          <Typography variant="h6" className="list-header">
            Học phần
          </Typography>
          <List>
            {list.map((item, key) => {
              return (
                <Paper
                  elevation={3}
                  key={key}
                  className="item-container"
                  onClick={() => handleClick(item.id)}
                >
                  <div className="item-info-container">
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <ImageIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.title}
                        secondary={item.user}
                      />
                    </ListItem>
                  </div>
                  <Divider />
                  <div className="item-demo-container">
                    <Typography variant="body2">
                      Thuật ngữ: {item.terms}
                    </Typography>
                    <Typography variant="body2">
                      Mô tả: {item.description}
                    </Typography>
                  </div>
                </Paper>
              );
            })}
          </List>
        </Grid>
        <Grid item md={2} />
      </Grid>
    </Grid>
  );
};

export default SearchResult;
