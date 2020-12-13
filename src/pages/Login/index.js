import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  loginWithEmailAndPassword,
  loginWithGoogle,
} from "../../services/auth";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 0),
    // backgroundColor: "#3f51b5",
    color: "white",
    textTransform: "none",
    height: "3.25rem",
    borderRadius: "0.25rem",
    fontSize: "1.25rem",
    fontWeight: "600",
  },
  submitGoogle: {
    margin: theme.spacing(3, 0, 0),
    textTransform: "none",
    height: "3.25rem",
    borderRadius: "0.25rem",
    fontSize: "1.25rem",
    fontWeight: "600",
  },
}));

const Login = () => {
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState("done");
  const history = useHistory();
  const classes = useStyles();

  const handleChangeUser = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const handleLoginWithEmailAndPassword = async () => {
    setLoading("email");
    try {
      await loginWithEmailAndPassword(payload);
      history.push("/home");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading("done");
    }
  };

  const handleLoginWithGoogle = async () => {
    setLoading("google");
    try {
      await loginWithGoogle();
      history.push("/home");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading("done");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng nhập
        </Typography>
        <div className={classes.form}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChangeUser}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={handleChangeUser}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLoginWithEmailAndPassword}
          >
            {loading === "email" ? (
              <CircularProgress
                style={{ width: 25, height: 25, marginRight: 8, color: "red" }}
              />
            ) : (
              ""
            )}
            Đăng nhập
          </Button>
          <Button
            fullWidth
            variant="outlined"
            className={classes.submitGoogle}
            onClick={handleLoginWithGoogle}
          >
            {loading === "google" ? (
              <CircularProgress
                style={{ width: 25, height: 25, marginRight: 8 }}
              />
            ) : (
              <img
                style={{ width: 25, height: 25, marginRight: 8 }}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
              />
            )}
            Đăng nhập bằng Google
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Login;
