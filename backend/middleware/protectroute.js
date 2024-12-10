import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { ENV_VARS } from "../config/envVars.js";

// // step1. Checking the token in the cookie
// // step2. decode or verify the token
// // step3. checking is the decoded token userid exist in the db. and disSelect the password
// // step4. req.user = user
// // step5. next()

// export async function protectRoute(req, res, next) {
//   try {
//     const token = req.cookies["jwt"];

//     if (!token) {
//       return res
//         .status(404)
//         .json({ success: false, message: "No Token Provided" });
//     }

//     const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

//     if (!decoded) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Invalid Token Provided" });
//     }

//     const user = await User.findById(decoded.userId).select("-password");
//     req.user = user;

//     next();
//   } catch (error) {
//     console.error("Error in ProtectRoute Controllers", error.message);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal Server Error" });
//   }
// }

export async function protectRoute(req, res, next) {
  try {
    const token = req.cookies["jwt"];
    console.log("Token received:", token);

    if (!token) {
      return res
        .status(404)
        .json({ success: false, message: "No Token Provided" });
    }

    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
    console.log("Decoded token:", decoded);

    if (!decoded) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Token Provided" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    console.log("User fetched:", user);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in ProtectRoute Controllers", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
