import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import express from "express";
import { createServer } from "http"; 
import { Server } from "socket.io"; 
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { CreateConnection } from "./shared/Connection.js"; 
import {protect} from './Middleware/authMiddleware.js'
import { getUserNotifications } from "./Modules/Notification/Services/NotificationService.js";
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

// Consolidated list of allowed origins
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
  process.env.HOSTED_URL,
  "https://ceo-backend-vhnw.vercel.app",
  "https://ceo-backend-six.vercel.app",
  "http://localhost:3500",
  "https://ceo-backend-git-main-vishals-projects-de5d45df.vercel.app",
  "https://ceo-card-frontend-three.vercel.app",
  "https://ceo-card-frontend-three.vercel.app/",
  // Remove trailing slashes from URLs to prevent CORS issues
  "https://ceo-backend-vhnw.vercel.app",
  "https://ceo-backend-six.vercel.app"
].filter(Boolean); // Remove any undefined values from environment variables

const app = express();
const server = createServer(app);

// Improved CORS configuration for Socket.io
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Access-Control-Allow-Origin",
      "Origin",
      "Accept"
    ],
    credentials: true,
    maxAge: 86400
  },
  transports: ['websocket', 'polling'], // Explicitly define transport methods
  pingTimeout: 60000, // Increase ping timeout to handle slow connections
  pingInterval: 25000 // Adjust ping interval
});

// Enhanced CORS middleware for Express
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Access-Control-Allow-Origin',
    'Origin',
    'Accept'
  ],
  maxAge: 86400
}));

// Standard middleware
app.use(morgan("dev"));
app.use(express.json({ limit: '50mb' })); // Increase payload limit if needed
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.set("trust proxy", 1);

// Improved rate limiter configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 80,
  message: "Too many requests from this IP, please try again later",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    res.status(429).json({
      error: "Too many requests, please try again later",
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000)
    });
  }
});

app.use(limiter);

// Enhanced Socket.io connection handling
const connectedUsers = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    connectedUsers[userId] = socket.id;
    console.log(`User ${userId} connected with socket ID: ${socket.id}`);

    // Handle user disconnection
    socket.on("disconnect", () => {
      console.log(`User ${userId} disconnected`);
      delete connectedUsers[userId];
    });

    // Handle connection errors
    socket.on("error", (error) => {
      console.error(`Socket error for user ${userId}:`, error);
    });

    // Handle reconnection attempts
    socket.on("reconnect_attempt", () => {
      console.log(`Reconnection attempt by user ${userId}`);
    });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Welcome endpoint
app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend is working with Socket.io!" });
});

// Public routes
app.use("/api/user", UserRoutes);

// Protected Routes (Require Authentication)
app.use("/api/notifications", notificationRoutes(io));
app.use("/api/booking/services", protect, BookingRoutes);
app.use("/api/Content/management", protect, ContentRoutes);
app.use("/api/Inventory/management", protect, InventoryRouter);
app.use("/api/Nav/hover", protect, SubNavRouter);
app.use("/api/NavBar", protect, NavBarRoutes);
app.use("/api/subnav/link", protect, OnHoverLink);
app.use("/api/Vendor", protect, VendorRoutes);

// Enhanced error handling middleware
app.use((err, req, res, next) => {
  console.error(`Error ${err.message}:`, err.stack);
  
  const errorResponse = {
    error: true,
    message: process.env.NODE_ENV === 'production' 
      ? 'An unexpected error occurred' 
      : err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  };

  res.status(err.status || 500).json(errorResponse);
});

// Database Connection & Server Start with better error handling
CreateConnection()
  .then(() => {
    server.listen(process.env.PORT || 3500, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 3500}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV}`);
      console.log(`🔒 CORS enabled for ${allowedOrigins.length} origins`);
    });
  })
  .catch((err) => {
    console.error("❌ Database Connection Failed:", err);
    process.exit(1); // Exit process with failure
  });

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});