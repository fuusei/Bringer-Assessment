import jwt from "jsonwebtoken";

const getToken = (username, password) => {
  return jwt.sign({ data: username + password }, "BringerSampleApp", {
    expiresIn: "1h",
  });
};

export default getToken;
