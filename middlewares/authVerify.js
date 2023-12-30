import User from "../models/User.js";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";

const authVerify = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  console.log(accessToken);
  // const accessToken = req?.cookies?.accessToken || req?.headers?.authorization;
  if (!accessToken) return res.status(400).json({ message: "Unauthorized" });

  //   Verify Token
  jwt.verify(
    accessToken,
    process.env.SECREET_KEY,
    expressAsyncHandler(async (err, decode) => {
      if (err) return res.status(400).json({ message: "Invalid Request" });
      let me = await User.findOne({ email: decode.email }).select("-password");
      req.me = me;
      next();
    })
  );
};

// Export Auth Verify
export default authVerify;
