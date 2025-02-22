import express from "express";
import {getUserNotifications, markAsRead } from "../Services/NotificationService.js";
import {createNotification} from "../Services/NotificationService.js"
const router = express.Router();

const notificationRoutes = (io) => {

    // Get notifications for a user
    router.get("/:userId", async (req, res) => {
        try {
            const notifications = await getUserNotifications(req.params.userId);
            res.json(notifications);
        } catch (error) {
            console.error("Error fetching notifications:", error);
            res.status(500).json({ error: error.message });
        }
    });

    // Create a new notification
    router.post("/post", async (req, res) => {
        try {
            const { userId, message, type, heading } = req.body;
            if (!userId || !message || !type) {
                return res.status(400).json({ error: "Missing required fields" });
            }

            const notification = await createNotification(userId, heading, message, type, io);
            res.json(notification);
        } catch (error) {
            console.error("Error creating notification:", error);
            res.status(500).json({ error: error.message });
        }
    });

    // Mark notification as read
    router.put("/read/:id", async (req, res) => {
        try {
            const updatedNotification = await markAsRead(req.params.id);
            res.json(updatedNotification);
        } catch (error) {
            console.error("Error marking notification as read:", error);
            res.status(500).json({ error: error.message });
        }
    });

    return router;
};

export default notificationRoutes;
