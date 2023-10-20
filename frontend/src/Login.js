import React, { useState, useEffect } from "react";
import { InputAdornment, TextField, IconButton } from "@mui/material";
import {
  Person,
  Password,
  Login as LoginIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(true);
  const [failMsg, setFailMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  useEffect(() => {
    username && password ? setDisable(false) : setDisable(true);
  }, [username, password]);

  const handleSubmit = () => {
    setLoading(true);
    setFailMsg("");
    axios
      .post(
        "/api/login",
        { username: username, password: password },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        setToken(res.data);
      })
      .catch((err) => {
        setFailMsg(err.code);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-[400px]">
      <TextField
        color="secondary"
        fullWidth
        required
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        margin="normal"
        label="Username"
        id="Username"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        color="secondary"
        fullWidth
        required
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        margin="normal"
        label="Password"
        id="Password"
        type={showPassword ? "text" : "password"}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Password />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <div className="flex justify-center">
        <LoadingButton
          startIcon={<LoginIcon />}
          color="secondary"
          variant="contained"
          sx={{ m: 1, py: 1, px: 2 }}
          disabled={disable}
          loading={loading}
          onClick={handleSubmit}
        >
          <span>Login</span>
        </LoadingButton>
      </div>
      {token ? (
        <div>
          <div className="font-bold text-lg">Token:</div>
          <div className="text-sm break-all">{token}</div>
        </div>
      ) : null}
      {failMsg ? (
        <div className="text-red-700 text-lg font-semibold">{failMsg}</div>
      ) : null}
    </div>
  );
}

export default Login;
