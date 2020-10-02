import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Divider, Paper } from "@material-ui/core";
import "./Search.scss";
const Search = () => {
  const [list, setList] = useState([
    { userName: "asimo", title: "asimo", number: 10 },
    { userName: "asimo", title: "asimo", number: 10 },
    { userName: "asimo", title: "asimo", number: 10 },
    { userName: "asimo", title: "asimo", number: 10 },
    { userName: "asimo", title: "asimo", number: 10 },
  ]);
  useEffect(() => {}, []);
  return (
    <Container fixed className="search-container">
      <Grid
        container
        item
        md={12}
        className="search-header-container"
        spacing={3}
      >
        <Grid item md={2} />
        <Grid item md={8} className="search-header-header-main">
          <Typography variant="h5" className="search-header-title">
            Content search
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        item
        md={12}
        className="search-content-container"
        spacing={3}
      >
        <Grid item md={2} className="search-content-filter">
          Filter
        </Grid>
        <Grid item md={8} className="search-content-main">
          <Typography variant="inherit">Học phần</Typography>
          {list.map((item, key) => {
            return (
              <Paper
                elevation={3}
                key={key}
                style={{ padding: 20, margin: "24px 0" }}
              >
                <Typography variant="inherit">{item.number}</Typography>
                <Divider />
                <Typography variant="inherit">{item.userName}</Typography>
                <Divider />
                <Typography variant="inherit">{item.title}</Typography>
              </Paper>
            );
          })}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Search;
