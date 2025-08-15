import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRETE_KEY;

export const signToken = (payLoad) => {
  const token = jwt.sign(payLoad, SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
  return token;
};
