import getToken from "../utils/getToken.js";
import axios from "axios";

const generateToken = (req, res) => {
  const { username, password } = req.body;
  res.status(200).send(getToken(username, password));
};

const trackingParcel = (req, res) => {
  const bearerToken =
    process.env.BEARER_TOKEN ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2NzIzMjY1NTUsImV4cCI6MTcwMzg2MjU1NSwiYXVkIjoiaHR0cHM6Ly9icmluZ2VycGFyY2VsLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNTI1eXM2YWh4d3UyIiwianRpIjoiZDdlZGE3NDgtNzMxOS00YWIzLWI2MGEtMDEzMzI0NmVkNmY2In0.uJi6d6 - E2zDWj24wryh2sVWKs4ceny4QllbrHrzK5L0";
  const { trackingNumber } = req.body;
  axios
    .get(
      `https://bps.bringer.io/public/api/v2/get/parcel/tracking.json?tracking_number=${trackingNumber}`,
      { headers: { Authorization: `Bearer ${bearerToken}` } }
    )
    .then((response) => res.status(200).json(response.data))
    .catch((err) => res.status(400).send(err));
};

export { generateToken, trackingParcel };
