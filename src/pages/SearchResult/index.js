import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as _ from "lodash";
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
  CircularProgress,
} from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import { getFlashcards } from "../../services/flashcards";
import "./SearchResult.scss";

const searchableColumns = ["title", "description"];

const SearchResult = () => {
  const history = useHistory();
  const searchContent = new URLSearchParams(window.location.search).get(
    "search"
  );
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleClick = (id) => {
    const query = new URLSearchParams({ id: id }).toString();
    history.push("/show?" + query);
  };

  const getData = async () => {
    try {
      let newData = await getFlashcards();
      if (searchContent) {
        newData = newData.filter((record) => {
          for (let column of searchableColumns) {
            if (isMatchedSearch(record[column], searchContent)) {
              return true;
            }
          }
          return false;
        });
      }
      setData(newData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const isMatchedSearch = (string, searchKey) => {
    return String(string)
      .trim()
      .toLowerCase()
      .includes(searchKey.trim().toLowerCase());
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
      ) : (
        <Grid className="search-result-container">
          <Grid
            container
            className="search-result-header-container"
            spacing={3}
          >
            <Grid item md={2} />
            <Grid item md={8} className="search-result-header-main">
              <Typography variant="h5" className="search-result-header-title">
                Tìm kiếm: {searchContent}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            className="search-result-content-container"
            spacing={3}
          >
            <Grid item md={2} />
            {_.isEmpty(data) ? (
              <Grid
                item
                md={8}
                style={{ textAlign: "center", margin: "2.5vw 0vw" }}
              >
                <Typography variant="h4" className="list-header-error">
                  Rất tiếc, chúng tôi không tìm thấy kết quả nào. Hãy thử tìm
                  kiếm một thuật ngữ khác!
                </Typography>
              </Grid>
            ) : (
              <Grid item md={8} className="search-result-content-main">
                <Typography variant="h6" className="list-header">
                  Học phần
                </Typography>
                <List>
                  {data.map((item, index) => {
                    return (
                      <Paper
                        elevation={3}
                        key={index}
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
                              secondary={item.author.displayName}
                            />
                          </ListItem>
                        </div>
                        <Divider />
                        <div className="item-demo-container">
                          <Typography variant="body2">
                            Thuật ngữ: {item.cards.length}
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
            )}
            <Grid item md={2} />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default SearchResult;
