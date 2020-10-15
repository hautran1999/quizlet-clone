import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField, Typography, Grid, Paper, Button } from "@material-ui/core";
import FilterNoneOutlinedIcon from "@material-ui/icons/FilterNoneOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import PermIdentityOutlinedIcon from "@material-ui/icons/PermIdentityOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import "./Search.scss";
const Search = () => {
  const history = useHistory();
  const [search, setSearch] = useState("");
  const onChangeSearch = (event) => {
    setSearch(event.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const handleSearch = () => {
    const query = new URLSearchParams({ search: search }).toString();
    history.push("/search/result?" + query);
  };
  return (
    <Grid className="search-container">
      <Grid container className="search-header">
        <Typography variant="h5" className="search-header-title">
          Tìm kiếm trên Quizlet
        </Typography>
        <Typography variant="inherit" className="search-header-title">
          Bạn có thể tìm thấy các học phần, các lớp học hoặc những người dùng
          khác.
        </Typography>
      </Grid>
      <Grid className="search-textField-container">
        <TextField
          value={search}
          onChange={onChangeSearch}
          onKeyPress={handleKeyPress}
          className="search-textField"
          label="Search"
          type="search"
          variant="outlined"
        />
        <Button className="search-button" onClick={handleSearch}>
          <SearchOutlinedIcon />
          Tìm kiếm
        </Button>
      </Grid>
      <Grid container className="search-content" spacing={3}>
        <Grid item md={4}>
          <Paper elevation={3} className="search-content-item">
            <FilterNoneOutlinedIcon />
            <Typography className="search-content-title" variant="h6">
              Học phần
            </Typography>
            <Typography variant="inherit">
              Tìm thấy nội dung bài học do hàng triệu người dùng trên Quizlet
              tạo ra về bất cứ chủ đề nào.
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={4}>
          <Paper elevation={2} className="search-content-item">
            <PeopleAltOutlinedIcon />
            <Typography className="search-content-title" variant="h6">
              Lớp học
            </Typography>
            <Typography variant="inherit">
              Tham gia lớp học trên Quizlet cùng với bạn bè, bạn cùng lớp hoặc
              giáo viên của bạn
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={4}>
          <Paper elevation={1} className="search-content-item">
            <PermIdentityOutlinedIcon />
            <Typography className="search-content-title" variant="h6">
              Người dùng
            </Typography>
            <Typography variant="inherit">
              Tìm thấy các học phần do bạn bè, bạn cùng lớp hay giáo viên của
              bạn tạo ra.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Search;
