import getToken from "../utils/getToken.js";
import axios from "axios";

const generateToken = (req, res) => {
  const { username, password } = req.body;
  res.status(200).send(getToken(username, password));
  // const state = req.params.state.toLowerCase();
  // const city = req.params.city.toLowerCase();
  // if (
  //   populations[state] !== undefined &&
  //   populations[state][city] !== undefined
  // ) {
  //   res.status(200).json({ population: populations[state][city] });
  // } else {
  //   res.status(400).json({
  //     message: `ERROR: ${city} of ${state} is not a valid state/city combination.`,
  //   });
};
const trackingParcel = (req, res) => {
  const bearerToken =
    process.env.BEARER_TOKEN ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2NzIzMjY1NTUsImV4cCI6MTcwMzg2MjU1NSwiYXVkIjoiaHR0cHM6Ly9icmluZ2VycGFyY2VsLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNTI1eXM2YWh4d3UyIiwianRpIjoiZDdlZGE3NDgtNzMxOS00YWIzLWI2MGEtMDEzMzI0NmVkNmY2In0.uJi6d6 - E2zDWj24wryh2sVWKs4ceny4QllbrHrzK5L0";
  const { trackingNumber } = req.body;
  axios
    .get(
      `https://bps.bringer.io/public/api/v2/get/parcel/tracking.json?tracking_number=${trackingNumber}`,
      { headers: { Authorization: `Bearer ${process.env.BEARER_TOKEN}` } }
    )
    .then((response) => res.status(200).json(response.data))
    .catch((err) => res.status(400).send(err));
  // const state = req.params.state.toLowerCase();
  // const city = req.params.city.toLowerCase();
  // const population = req.body;
  // if (isNaN(population)) {
  //   res
  //     .status(400)
  //     .json({ message: "ERROR: Population must be a numeric value." });
  // } else if (populations[state] === undefined) {
  //   res
  //     .status(400)
  //     .json({ message: `ERROR: ${state} is not a valid state input.` });
  // } else if (populations[state][city] === undefined) {
  //   // valid state, new city to be created
  //   populations[state][city] = population;
  //   res.status(201).json({
  //     message: `New city ${city} of ${state} with population ${population} was created.`,
  //   });
  //   appendCsv(`${city},${state},${population}`);
  // } else {
  //   //valid state city combo
  //   const oldEntry = `${city},${state},${populations[state][city]}`;
  //   const newEntry = `${city},${state},${population}`;
  //   populations[state][city] = population;
  //   res.status(200).json({
  //     message: `${city} of ${state} population was updated to ${population}.`,
  //   });
  //   updateCsv(oldEntry, newEntry);
  // }
};

export { generateToken, trackingParcel };
