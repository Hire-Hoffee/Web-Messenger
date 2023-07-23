import jwt from "jsonwebtoken";
import "dotenv/config";

const genAccessToken = (data: { id: number; username: string }, expiresIn: string = "24h") => {
  return jwt.sign(data, process.env.SECRET_ACCESS as string, { expiresIn });
};

const genRefreshToken = (data: { id: number; email: string }, expiresIn = "720h") => {
  return jwt.sign(data, process.env.SECRET_REFRESH as string, { expiresIn });
};

const verifyToken = (token: string, key: string, options?: jwt.VerifyOptions) => {
  return jwt.verify(token, key as string, options);
};

export { genAccessToken, genRefreshToken, verifyToken };
