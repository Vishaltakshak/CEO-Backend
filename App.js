
// import cookieParser from "cookie-parser";
// import rateLimit from "express-rate-limit";
// import express from "express";
// import { createServer } from "http"; 
// import { Server } from "socket.io"; 
// import dotenv from "dotenv";
// import cors from "cors";
// import morgan from "morgan";
// import { CreateConnection } from "./shared/Connection.js"; 
// import { protect } from "./Middleware/authMiddleware.js";
// import { getUserNotifications } from "./Modules/Notification/Services/NotificationService.js";
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
// const connectedUsers = {};
// const app = express();
// const server = createServer(app); 

// const corsOptions = {
//   origin: [
//     "https://ceo-card-frontend-three.vercel.app",
//     "https://ceo-backend-vhnw.vercel.app",
//     "http://localhost:3500",
//     process.env.ADMIN_URL,
//     process.env.HOSTED_URL,
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Origin", "Accept"],
//   credentials: true,
//   maxAge: 86400,
// };

// const io = new Server(server, {
//   cors: corsOptions,
// });

// // ✅ Fix: Preflight requests for Socket.IO
// io.engine.on("headers", (headers, req) => {
//   headers["Access-Control-Allow-Origin"] = "https://ceo-card-frontend-three.vercel.app";
//   headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
//   headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
//   headers["Access-Control-Allow-Credentials"] = "true";
// });

// app.use(morgan("dev"));
// app.use(express.json());
// app.use(cookieParser());
// app.set("trust proxy", 1);
// app.use(cors(corsOptions));

// // ✅ Fix: Only keep one preflight handling
// app.options("*", (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "https://ceo-card-frontend-three.vercel.app");
//   res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.status(200).end();
// });

// // ✅ Rate Limiting (Increased limit)
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, 
//   max: 200, 
//   message: "Too many requests, please try again later",
// });
// app.use(limiter);

// // ✅ WebSocket Connection
// io.on("connection", (socket) => {
//   const userId = socket.handshake.query.userId; // Get userId from frontend
//   if (userId) {
//     connectedUsers[userId] = socket.id;
//     console.log(`User ${userId} connected with socket ID: ${socket.id}`);
//   }
//   socket.on("disconnect", () => {
//     console.log(`User ${userId} disconnected`);
//     delete connectedUsers[userId];
//   });
// });

// app.get("/", (req, res) => {
//   res.send("Backend is working with Socket.io!");
// });

// // ✅ User Routes with CORS Fix
// app.use("/api/user", (req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "https://ceo-card-frontend-three.vercel.app");
//   res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   if (req.method === "OPTIONS") return res.status(200).end();
//   next();
// }, UserRoutes);

// app.use("/api/notifications", notificationRoutes(io)); 
// app.use("/api/booking/services", protect, BookingRoutes);
// app.use("/api/Content/management", protect, ContentRoutes);
// app.use("/api/Inventory/management", protect, InventoryRouter);
// app.use("/api/Nav/hover", protect, SubNavRouter);
// app.use("/api/NavBar", protect, NavBarRoutes);
// app.use("/api/subnav/link", protect, OnHoverLink);
// app.use("/api/Vendor", protect, VendorRoutes);

// // ✅ Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

// // ✅ Database Connection & Server Start
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

// 🔥 FINAL FIX: CORS SETTINGS (APPLY THIS CORRECTLY)
const allowedOrigins = [
  "https://ceo-card-frontend-b123oiqoq-vishals-projects-de5d45df.vercel.app",
  "https://ceo-card-frontend-vishals-projects-de5d45df.vercel.app",
  "https://ceo-card-frontend-three.vercel.app",
  "https://ceo-backend-vhnw.vercel.app",
  "http://localhost:3500",
  "https://ceo-card-frontend-mv4jbpm3b-vishals-projects-de5d45df.vercel.app",
  
];

const corsOptions = {
  // origin: function (origin, callback) {
  //   if (!origin || allowedOrigins.includes(origin)) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error("Not allowed by CORS"));
  //   }
  // },
  origin:true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));


app.options("*", cors(corsOptions));

const io = new Server(server, {
  cors: {
    // origin: allowedOrigins[0] , 
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.engine.on("headers", (headers, req) => {
  // The second parameter is the request
  if (req && req.headers && req.headers.origin && allowedOrigins.includes(req.headers.origin)) {
    headers["Access-Control-Allow-Origin"] = req.headers.origin;
  } else {
    headers["Access-Control-Allow-Origin"] = allowedOrigins[0]; // Fallback
  }
  headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS";
  headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
  headers["Access-Control-Allow-Credentials"] = "true";
});


app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1);


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 200, 
  message: "Too many requests, please try again later",
});
app.use(limiter);

// ✅ WebSocket Connection
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) {
    connectedUsers[userId] = socket.id;
    console.log(`User ${userId} connected with socket ID: ${socket.id}`);
  }
  socket.on("disconnect", () => {
    console.log(`User ${userId} disconnected`);
    delete connectedUsers[userId];
  });
});

// ✅ API Route Test
app.get("/", (req, res) => {
  res.send("Backend is working with Socket.io!");
});

// ✅ Fix: Apply CORS Headers to API Routes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", allowedOrigins[0]);
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(200).end();
  next();
});

// ✅ Routes
app.use("/api/user", UserRoutes);
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
