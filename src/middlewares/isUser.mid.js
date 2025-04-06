import { userManager } from "../data/mongo/manager.mongo.js";
import { verifyToken } from "../helpers/token.helper.js";

const isUser = async (req, res, next) => {
  try {
    const headers = req?.headers?.authorization;
    if (!headers || !headers.startsWith("Bearer")) {
      const error = new Error("Token is required");
      error.statusCode = 403;
      throw error;
    }
    const token = headers.split(" ")[1];
    const data = verifyToken(token);
    const user = await userManager.readById(data.user_id);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default isUser;
