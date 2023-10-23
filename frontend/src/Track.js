import React, { useState, useEffect } from "react";
import Timeline from "./Timeline.js";
import { TextField, InputAdornment } from "@mui/material";
import { LocalShipping, Numbers } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";

function Track() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const [failMsg, setFailMsg] = useState("");
  const [history, setHistory] = useState({});

  useEffect(() => {
    trackingNumber ? setDisable(false) : setDisable(true);
  }, [trackingNumber]);

  const handleSubmit = () => {
    setLoading(true);
    setFailMsg("");
    axios
      .post(
        "/api/track",
        { trackingNumber: trackingNumber },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        setHistory(res.data);
      })
      .catch((err) => {
        if (err.code === "ERR_BAD_REQUEST")
          setFailMsg("Bad request, please enter a valid tracking number.");
        else setFailMsg(err.code);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center">
      <TextField
        color="secondary"
        fullWidth
        sx={{ maxWidth: "650px" }}
        required
        onChange={(e) => setTrackingNumber(e.target.value)}
        placeholder="Enter a tracking number"
        margin="normal"
        label="Tracking Number"
        id="Tracking Number"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Numbers />
            </InputAdornment>
          ),
        }}
      />
      <LoadingButton
        startIcon={<LocalShipping />}
        color="secondary"
        variant="contained"
        sx={{ m: 1, py: 1, px: 2 }}
        disabled={disable}
        loading={loading}
        onClick={handleSubmit}
      >
        <span>Track</span>
      </LoadingButton>
      {Object.keys(history).length ? <Timeline history={history} /> : null}
      {failMsg ? (
        <div className="text-red-700 text-lg font-semibold flex justify-center">
          {failMsg}
        </div>
      ) : null}
    </div>
  );
}

export default Track;
