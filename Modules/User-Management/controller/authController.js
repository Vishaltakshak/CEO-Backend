import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { userSch } from "../model/User-Schema.js";

export const loginUser = async (req, res) => {
    try {
        const { Mail, Password } = req.body;

        // Input validation
        if (!Mail || !Password) {
            return res.status(400).json({ 
                message: "Email and password are required" 
            });
        }

        // Find user and handle non-existent user
        const user = await userSch.findOne({ Mail }).select('+Password');
        if (!user) {
            // Use a generic message to prevent user enumeration
            return res.status(401).json({ 
                message: "Invalid email or password" 
            });
        }

        // Verify password
        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            // Use the same generic message
            return res.status(401).json({ 
                message: "Invalid email or password" 
            });
        }

        // Generate JWT
        const token = jwt.sign(
            { 
                id: user._id,
                // Add any additional claims you need
                email: user.Mail 
            }, 
            process.env.JWT_SECRET, 
            { 
                expiresIn: "7d",
                algorithm: 'HS256' 
            }
        );

        // Set secure cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/",  // Explicitly set cookie path
            domain: process.env.COOKIE_DOMAIN // Configure based on your domain
        });

        // Send response (exclude sensitive info)
        res.status(200).json({ 
            message: "Login successful",
            user: { 
                id: user._id,
                email: user.Mail,
                // Add other non-sensitive user data as needed
            } 
        });

    } catch (error) {
        console.error("Login error:", error);
        // Don't expose error details to client
        res.status(500).json({ 
            message: "An error occurred during login" 
        });
    }
};

export const logoutUser = (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 0, // Expire immediately
            path: "/",
            domain: process.env.COOKIE_DOMAIN
        });

        res.status(200).json({ 
            message: "Logged out successfully" 
        });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ 
            message: "An error occurred during logout" 
        });
    }
};