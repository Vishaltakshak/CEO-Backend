export const createNotification = async (userId, message, type, io) => {
    try {
        const notification = new Notification({ userId, message, type });
        await notification.save();
        io.to(userId.toString()).emit("newNotification", notification);
        return notification;
    } catch (error) {
        throw new Error("Error creating notification");
    }
};

export const getUserNotifications = async (userId) => {
    try {
        return await Notification.find({ userId }).sort({ createdAt: -1 });
    } catch (error) {
        throw new Error("Error fetching notifications");
    }
};

export const markAsRead = async (notificationId) => {
    try {
        return await Notification.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });
    } catch (error) {
        throw new Error("Error marking notification as read");
    }
};
