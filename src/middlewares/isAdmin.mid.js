import { userManager } from "../data/managers/manager.mongo";
import { verifyToken } from "../helpers/token.helper";

const isAdmin = async (req, res, next) => {
  try {
    const headers = req?.headers?.authorization;
    //console.log(headers);
    if (!headers || !headers.startsWith("Bearer ")) {
      const error = new Error("Token is required!");
      error.statusCode = 403;
      throw error;
    }
    const token = headers.split(" ")[1];
    const data = verifyToken(token);
    if (data.role !== "ADMIN") {
      const error = new Error("Forbidden!");
      error.statusCode = 403;
      throw error;
    }
    const user = await userManager.readById(data.user_id);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default isAdmin;
