// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// import { UserModel } from "../models/user.model.js";

// // JWT SECRET SETUP
// if (!process.env.JWT_SECRET) {
//   throw new Error("JWT_SECRET environment variable is required but not set.");
// }
// const jwtSecret = process.env.JWT_SECRET;

// // SIGNUP
// const signup = async (req, res) => {
//   try {
//     const { email, password, fullname } = req.body;
//     if (!email || !password || !fullname) {
//       return res.status(400).json({
//         success: false,
//         message: "Email, password, and full name are required.",
//       });
//     }

//     const normalizedEmail = email.toLowerCase().trim();

//     if (process.env.NODE_ENV !== "production") {
//       console.log(`Signup attempt for : ${normalizedEmail}`);
//     }

//     // check for the email's existence
//     const existingUser = await UserModel.findOne({ email: normalizedEmail });
//     if (existingUser) {
//       if (process.env.NODE_ENV !== "production") {
//         console.warn(`⚠️ Email already in use: ${normalizedEmail}`);
//       }

//       return res.status(400).json({
//         success: false,
//         message: "Email is already registered. Please use a different one.",
//       });
//     }

//     // hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // create new user
//     const user = await UserModel.create({
//       email: normalizedEmail,
//       fullname: fullname.trim(),
//       password: hashedPassword,
//     });

//     if (!user) {
//       if (process.env.NODE_ENV !== "production") {
//         console.error("❌ Failed to save user to database.");
//       }

//       return res.status(500).json({
//         success: false,
//         message: "Unable to create account. Please try again later.",
//       });
//     }

//     if (process.env.NODE_ENV !== "production") {
//       console.log(`✅ User created: ${fullname} (${normalizedEmail})`);
//     }

//     res.status(201).json({
//       success: true,
//       message: `Account created successfully 🎉 Welcome, ${fullname}!`,
//     });
//   } catch (err) {
//     console.error("🔥 Error during signup:", err.message);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error. Please try again later.",
//       ...(process.env.NODE_ENV !== "production" && { error: err.message }),
//     });
//   }
// };

// // LOGIN
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Email & password are required.",
//       });
//     }

//     const normalizedEmail = email.toLowerCase().trim();

//     if (process.env.NODE_ENV !== "production") {
//       console.log(`🔐 Login attempt for: ${normalizedEmail}`);
//     }

//     // check if user exists?
//     const user = await UserModel.findOne({ email: normalizedEmail });
//     if (!user) {
//       if (process.env.NODE_ENV !== "production") {
//         console.warn(`⚠️ Login failed: user not found (${normalizedEmail})`);
//       }
//       return res.status(404).json({
//         success: false,
//         message:
//           "User not found. Please check your email or register for a new account.",
//       });
//     }

//     // check password
//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       if (process.env.NODE_ENV !== "production") {
//         console.warn(
//           `⚠️ Login failed: invalid password for ${normalizedEmail}`,
//         );
//       }
//       return res.status(401).json({
//         success: false,
//         message: "Invalid password. Please try again.",
//       });
//     }

//     // JWT TOKEN CREATION
//     const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret, {
//       expiresIn: "2h",
//     });

//     if (process.env.NODE_ENV !== "production") {
//       console.log(`✅ User logged in successfully: ${normalizedEmail}`);
//     }

//     return res
//       .cookie("token", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//         maxAge: 24 * 60 * 60 * 1000,
//       })
//       .status(200)
//       .json({
//         success: true,
//         message: "Login successful",
//         token,
//       });
//   } catch (err) {
//     console.error("🔥 Login Error :", err.message);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error. Please try again later.",
//       ...(process.env.NODE_ENV !== "production" && { error: err.message }),
//     });
//   }
// };

// // Logout
// const logout = (req, res) => {
//   try {
//     res
//       .clearCookie("token", {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//       })
//       .status(200)
//       .json({
//         success: true,
//         message: "Logged out successfully.",
//       });
//   } catch (err) {
//     console.error("🔥 Logout error:", err.message);
//     res.status(500).json({
//       success: false,
//       message: "Failed to logout.",
//     });
//   }
// };

// export { signup, login, logout };
