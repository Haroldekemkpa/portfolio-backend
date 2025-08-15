import {
  createAdmin,
  getAdminByEmail,
  deleteAdmin,
  getAllAdmin,
} from "../model/adminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { signToken } from "../utilities/jwt.js";
dotenv.config();

export const createAdminController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    // Check name and email condition
    if (name !== process.env.ADMIN_NAME || email !== process.env.ADMIN_MAIL) {
      return res.status(403).json({
        success: false,
        message: "Name and email invalid",
      });
    }

    // Hash password

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create admin
    const result = await createAdmin({ name, email, password: hashedPassword });

    return res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      data: result,
    });
  } catch (error) {
    console.error("Admin registration failed:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong during admin registration",
    });
  }
};

// GET ADMIN BY EMAIL

const JWT_SECRET = process.env.SECRETE_KEY;

export const loginAdminController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    // Check if admin exists
    const admin = await getAdminByEmail(email);
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Compare password with hash
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT
    const token = signToken({
      id: admin.id,
      email: admin.email,
      role: admin.role,
    });

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Error in loginAdminController:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE ADMIN

export const deleteAdminController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteAdmin(parseInt(id));

    if (!result.success) {
      return res.status(404).json({ success: false, message: result.message });
    }

    return res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    console.error("Error in deleteAdminController:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET ALL ADMIN

export const getAllAdminController = async (req, res) => {
  try {
    const admins = await getAllAdmin();
    return res.status(200).json({ success: true, admins });
  } catch (error) {
    console.error("Error in getAllAdminController:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
