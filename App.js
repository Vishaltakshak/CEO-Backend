import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import express from "express";
import { createServer } from "http"; 
import { Server } from "socket.io"; 
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { CreateConnection } from "./shared/Connection.js"; 
import { protect } from "./Middleware/authMiddleware.js";
import notificationRoutes from "./Modules/Notification/Routes/NotificationRoute.js"; 
import { BookingRoutes } from "./Modules/Booking-Management/Routes/Booking-Routes.js";
import { ContentRoutes } from "./Modules/Content-Management/Routes/Content-Routes.js";
import InventoryRouter from "./Modules/Inventory-Management/Routes/InventoryRoutes.js";
import { SubNavRouter } from "./Modules/NAV-OnHover/Routes/NavOnHover-Routes.js";
import NavBarRoutes from "./Modules/NavBar/routes/NavBarRoutes.js";
import { OnHoverLink } from "./Modules/OnHover-Links/Routes/OnHoverLinkRouter.js";
import UserRoutes from "./Modules/User-Management/Routes/UserRoutes.js";
import { VendorRoutes } from "./Modules/Vendor-Management/routes/VendorRoutes.js";

dotenv.config();

const connectedUsers = {};
const app = express();
const server = createServer(app); 

// ✅ Properly define CORS for Express
app.use(
  cors({
    origin: [
      "https://ceo-card-frontend-three.vercel.app",
      "https://ceo-backend-vhnw.vercel.app/",
      "https://ceo-backend-vhnw.vercel.app",
      "https://ceo-card-frontend-three.vercel.app/",
      process.env.FRONTEND_URL,
      process.env.ADMIN_URL,
      process.env.HOSTED_URL,
    ].filter(Boolean), 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


const io = new Server(server, {
  cors: {
    origin: [
      "https://ceo-card-frontend-three.vercel.app",
      "https://ceo-card-frontend-three.vercel.app/",
      "http://localhost:3500/",
      "https://ceo-backend-vhnw.vercel.app/",
      "https://ceo-backend-vhnw.vercel.app",
      process.env.FRONTEND_URL,
      process.env.ADMIN_URL,
      process.env.HOSTED_URL,
    ].filter(Boolean),
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.set("trust proxy", 1);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 80, 
  message: "Too many requests, please try again later",
});
app.use(limiter);

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId || "unknown"; 

  if (userId !== "unknown") {
    connectedUsers[userId] = socket.id;
    console.log(`✅ User ${userId} connected with socket ID: ${socket.id}`);
  } else {
    console.warn("⚠️ Connected user has no ID!");
  }

  socket.on("disconnect", () => {
    console.log(`❌ User ${userId} disconnected`);
    delete connectedUsers[userId];
  });
});


app.get("/", (req, res) => {
  res.send("Backend is working with Socket.io!");
});


app.use("/api/user", UserRoutes);

app.use("/api/notifications", notificationRoutes(io)); 
app.use("/api/booking/services", protect, BookingRoutes);
app.use("/api/Content/management", protect, ContentRoutes);
app.use("/api/Inventory/management", protect, InventoryRouter);
app.use("/api/Nav/hover", protect, SubNavRouter);
app.use("/api/NavBar", protect, NavBarRoutes);
app.use("/api/subnav/link", protect, OnHoverLink);
app.use("/api/Vendor", protect, VendorRoutes);

app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).send("Something broke!");
});

// ✅ Database Connection & Server Start
CreateConnection()
  .then(() => {
    const PORT = process.env.PORT || 3500;
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log("❌ Database Connection Failed:", err));
