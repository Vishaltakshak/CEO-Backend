import Notification from "../Schema/NotificationSchema.js"

export const createNotification = async (userId, message, type, heading, io) => {
    try {
        const notification = new Notification({ userId, message, type , heading});
        await notification.save();

        // Emit notification via socket.io
        io.to(userId.toString()).emit("newNotification", notification);

        return notification;
    } catch (error) {
        console.error("Error creating notification:", error);
        throw new Error("Error creating notification");
    }
};

export const getUserNotifications = async (userId) => {
    try {
        return await Notification.find({ userId }).populate("userId", "name email").sort({ createdAt: -1 });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        throw new Error("Error fetching notifications");
    }
};

export const markAsRead = async (notificationId) => {
    try {
        return await Notification.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });
    } catch (error) {
        console.error("Error marking notification as read:", error);
        throw new Error("Error marking notification as read");
    }
};
