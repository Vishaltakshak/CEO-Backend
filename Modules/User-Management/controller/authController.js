import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { userSch } from "../model/User-Schema.js";

export const loginUser = async (req, res) => {
    try {
        const { Mail, Password, isMobile } = req.body; // Expect a flag from client to differentiate app vs web

        // Input validation
        if (!Mail || !Password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user and handle non-existent user
        const user = await userSch.findOne({ Mail }).select('+Password');
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Verify password
        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate JWT
        const token = jwt.sign(
            { 
                id: user._id,
                email: user.Mail 
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: "7d", algorithm: 'HS256' }
        );

        if (isMobile) {

            return res.status(200).json({ 
                message: "Login successful",
                token,  
                user: { 
                    id: user._id,
                    email: user.Mail,
                } 
            });
        } else {
            // Web apps use cookies
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "None",
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: "/",
                domain: process.env.COOKIE_DOMAIN
            });

            return res.status(200).json({ 
                message: "Login successful",
                token: token,
                user: { 
                    id: user._id,
                    email: user.Mail,
                } 
            });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "An error occurred during login" });
    }
};

export const logoutUser = (req, res) => {
    try {
        const { isMobile } = req.body;

        if (isMobile) {
            // For mobile, just send a success response (client should delete stored token)
            return res.status(200).json({ message: "Logged out successfully" });
        } else {
            // For web, clear the authentication cookie
            res.cookie("token", "", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
                maxAge: 20*60,
                path: "/",
                domain: process.env.COOKIE_DOMAIN
            });

            return res.status(200).json({ message: "Logged out successfully" });
        }
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "An error occurred during logout" });
    }
};
