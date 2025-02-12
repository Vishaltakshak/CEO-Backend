import express from "express";
import { createNotification, getUserNotifications, markAsRead } from "../Services/NotificationService.js";


const router = express.Router();

const notificationRoutes = (io) => {
  
    router.get("/:userId", async (req, res) => {
        try {
            const notifications = await getUserNotifications(req.params.userId);
            res.json(notifications);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    router.post("/", async (req, res) => {
        try {
            const { userId, message, type } = req.body;
            const notification = await createNotification(userId, message, type, io);
            res.json(notification);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });


    router.put("/read/:id", async (req, res) => {
        try {
            const updatedNotification = await markAsRead(req.params.id);
            res.json(updatedNotification);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
};

export default notificationRoutes;
