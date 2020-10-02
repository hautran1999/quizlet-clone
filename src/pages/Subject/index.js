import React from "react";
import { Container, Typography, Grid, Paper } from "@material-ui/core";
import FilterNoneOutlinedIcon from "@material-ui/icons/FilterNoneOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import PermIdentityOutlinedIcon from "@material-ui/icons/PermIdentityOutlined";
import "./Subject.scss";
const Subject = () => {
  return (
    <Container fixed className="subject-container">
      <div className="subject-header">
        <Typography variant="h4" className="subject-header-title">
          Tìm trên Quizlet
        </Typography>
        <Typography variant="h6" className="subject-header-title">
          Bạn có thể tìm thấy các học phần, các lớp học hoặc những người dùng
          khác.
        </Typography>
      </div>
      <Grid container className="subject-content" item md={12} spacing={3}>
        <Grid item md={4}>
          <Paper elevation={3} className="subject-content-item">
            <FilterNoneOutlinedIcon />
            <Typography className="subject-content-title" variant="h6">
              Học phần
            </Typography>
            <Typography variant="inherit">
              Tìm thấy nội dung bài học do hàng triệu người dùng trên Quizlet
              tạo ra về bất cứ chủ đề nào.
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={4}>
          <Paper elevation={2} className="subject-content-item">
            <PeopleAltOutlinedIcon />
            <Typography className="subject-content-title" variant="h6">
              Lớp học
            </Typography>
            <Typography variant="inherit">
              Tham gia lớp học trên Quizlet cùng với bạn bè, bạn cùng lớp hoặc
              giáo viên của bạn
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={4}>
          <Paper elevation={1} className="subject-content-item">
            <PermIdentityOutlinedIcon />
            <Typography className="subject-content-title" variant="h6">
              Người dùng
            </Typography>
            <Typography variant="inherit">
              Tìm thấy các học phần do bạn bè, bạn cùng lớp hay giáo viên của
              bạn tạo ra.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Subject;
