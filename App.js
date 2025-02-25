// import express from "express";
// import { createServer } from "http"; 
// import { Server } from "socket.io"; 
// import dotenv from "dotenv";
// import cors from "cors";
// import morgan from "morgan";
// import { CreateConnection } from "./shared/Connection.js"; 

// import notificationRoutes from "./Modules/Notification/Routes/NotificationRoute.js"; 
// import { BookingRoutes } from "./Modules/Booking-Management/Routes/Booking-Routes.js";
// import { ContentRoutes } from "./Modules/Content-Management/Routes/Content-Routes.js";
// import InventoryRouter from "./Modules/Inventory-Management/Routes/InventoryRoutes.js";
// import { SubNavRouter } from "./Modules/NAV-OnHover/Routes/NavOnHover-Routes.js";
// import NavBarRoutes from "./Modules/NavBar/routes/NavBarRoutes.js";
// import { OnHoverLink } from "./Modules/OnHover-Links/Routes/OnHoverLinkRouter.js";
// import UserRoutes from "./Modules/User-Management/Routes/UserRoutes.js";
// import { VendorRoutes } from "./Modules/Vendor-Management/routes/VendorRoutes.js";

// dotenv.config();

// const app = express();
// const server = createServer(app); 
// const io = new Server(server, {
//   cors: {
//     origin: [
//       "https://ceo-backend-vhnw.vercel.app/",
//       "https://ceo-backend-six.vercel.app/",
//       "http://localhost:3500",
//       "https://ceo-backend-git-main-vishals-projects-de5d45df.vercel.app/",
//       process.env.ADMIN_URL,
//       process.env.HOSTED_URL
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: [
//       "Content-Type",
//       "Authorization",
//       "X-Requested-With",
//       "Access-Control-Allow-Origin",
//       "Origin",
//       "Accept"
//     ],
//     credentials: true,
//     maxAge: 86400
//   }
// });

// app.use(cors());
// app.use(morgan("dev"));
// app.use(express.json());

// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("disconnect", () => {
//     console.log(`User Disconnected: ${socket.id}`);
//   });
// });

// app.get("/", (req, res) => {
//   res.send("Backend is working with Socket.io!");
// });

// app.use("/api/notifications", notificationRoutes(io)); 
// app.use("/api/booking/services", BookingRoutes);
// app.use("/api/Content/management", ContentRoutes);
// app.use("/api/Inventory/management", InventoryRouter);
// app.use("/api/Nav/hover", SubNavRouter);
// app.use("/api/NavBar", NavBarRoutes);
// app.use("/api/subnav/link", OnHoverLink);
// app.use("/api/user", UserRoutes);
// app.use("/api/Vendor", VendorRoutes);



// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

// CreateConnection()
//   .then(() => {
//     server.listen(process.env.PORT || 3500, () => {
//       console.log(`🚀 Server running on port ${process.env.PORT || 3500}`);
//     });
//   })
//   .catch((err) => console.log("❌ Database Connection Failed:", err));
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
const connectedUsers = {};
const app = express();
const server = createServer(app); 

const corsOptions = {
  origin: [
    "https://ceo-card-frontend-three.vercel.app",
    "https://ceo-backend-vhnw.vercel.app",
    "http://localhost:3500",
    process.env.ADMIN_URL,
    process.env.HOSTED_URL,
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Origin", "Accept"],
  credentials: true,
  maxAge: 86400,
};

const io = new Server(server, {
  cors: corsOptions,
});

// ✅ Fix: Preflight requests for Socket.IO
io.engine.on("headers", (headers, req) => {
  headers["Access-Control-Allow-Origin"] = "https://ceo-card-frontend-three.vercel.app";
  headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
  headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
  headers["Access-Control-Allow-Credentials"] = "true";
});

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1);
app.use(cors(corsOptions));

// ✅ Fix: Only keep one preflight handling
app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://ceo-card-frontend-three.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.status(200).end();
});

// ✅ Rate Limiting (Increased limit)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 200, 
  message: "Too many requests, please try again later",
});
app.use(limiter);

// ✅ WebSocket Connection
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId; // Get userId from frontend
  if (userId) {
    connectedUsers[userId] = socket.id;
    console.log(`User ${userId} connected with socket ID: ${socket.id}`);
  }
  socket.on("disconnect", () => {
    console.log(`User ${userId} disconnected`);
    delete connectedUsers[userId];
  });
});

app.get("/", (req, res) => {
  res.send("Backend is working with Socket.io!");
});

// ✅ User Routes with CORS Fix
app.use("/api/user", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://ceo-card-frontend-three.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(200).end();
  next();
}, UserRoutes);

app.use("/api/notifications", notificationRoutes(io)); 
app.use("/api/booking/services", protect, BookingRoutes);
app.use("/api/Content/management", protect, ContentRoutes);
app.use("/api/Inventory/management", protect, InventoryRouter);
app.use("/api/Nav/hover", protect, SubNavRouter);
app.use("/api/NavBar", protect, NavBarRoutes);
app.use("/api/subnav/link", protect, OnHoverLink);
app.use("/api/Vendor", protect, VendorRoutes);

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// ✅ Database Connection & Server Start
CreateConnection()
  .then(() => {
    server.listen(process.env.PORT || 3500, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 3500}`);
    });
  })
  .catch((err) => console.log("❌ Database Connection Failed:", err));
