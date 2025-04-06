import jwt, { decode } from "jsonwebtoken";

const createToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.JWT_KEY, {
      expiresIn: 60 * 60 * 24 * 7,
    });
    return token;
  } catch (error) {
    error.statusCode = 401;
    throw error;
  }
};

const verifyToken = (token) => {
  try {
    const decodeData = jwt.verify(token, process.env.JWT_KEY);
    return decodeData;
  } catch (error) {
    error.statusCode = 401;
    throw error;
  }
};

export { createToken, verifyToken };
