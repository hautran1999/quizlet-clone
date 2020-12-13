import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import "./Landing.scss";

const Landing = () => {
  return (
    <Grid spacing={0} container className="landing-container">
      <Grid item md={6}>
        <Typography
          variant="h1"
          style={{
            fontSize: "2.75rem",
            padding: "5vw",
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          Trở thành phiên bản xuất sắc nhất của chính bạn
        </Typography>
        <Typography
          variant="body1"
          style={{
            fontSize: "1.25rem",
            padding: "5vw",
            color: "#fff",
          }}
        >
          Nắm vững mọi môn học, từng bước một
        </Typography>
        <br />
        <Button variant="contained" className="landing-button">
          Băt đầu học
        </Button>
      </Grid>
      <Grid md={6}>
        <img
          style={{ width: "100%" , height: '100vh'}}
          src="https://images.prismic.io/quizlet-prod/658f7592-1f7c-4d27-9b39-f79cdba06267_Carousel_Illo_Bannecker_02.png?auto=compress,format"
        />
      </Grid>
    </Grid>
  );
};

export default Landing;
