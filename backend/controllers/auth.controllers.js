import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/genrateTokenSetCookie.js";

export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All the Feild are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email Please Provider the Valid Email_Id",
      });
    }

    // checking is username already exist in the Database

    const IsUserNameExist = await User.findOne({ username });

    if (IsUserNameExist) {
      return res
        .status(400)
        .json({ success: false, message: "UserName is Already Exist" });
    }

    const isEmailExist = await User.findOne({ email });

    if (isEmailExist) {
      return res
        .status(400)
        .json({ success: false, message: "Email Already Exist" });
    }

    // image
    const PROFILE_PICS = [
      "/avatar1.png",
      "/avatar2.png",
      "/avatar3.jpg",
      "/avatar4.jpg",
    ];

    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be having 6 character",
      });
    }

    // hash the password

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
      image,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        // _id: newUser._id,
        // username,
        // email,
        // hashPassword,
        // image,
        success: true,
        user: {
          ...newUser._doc,
          password,
        },
      });
    } else {
      res.status(401).json({ message: "Invalid User Data" });
    }

    // await newUser.save();

    // .json({ success: true, message: "User is Created Successfully" });
  } catch (error) {
    console.error("Error while Creating the User", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields are Required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Password" });
    }

    generateTokenAndSetCookie(user._id, res);

    return res
      .status(200)
      .json({ success: true, message: "Login Successfully Done" });
  } catch (error) {
    console.error("Error in Login Route Controllers", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ success: true, message: "Logout Successfully" });
  } catch (error) {
    console.error("Error in Logout Route", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function authCheck(req, res) {
  try {
    console.log("req.user", req.user);
    return res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.error("Error in Controller Routes", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
