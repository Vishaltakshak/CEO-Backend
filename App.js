import express from "express";
import { createServer } from "http"; 
import { Server } from "socket.io"; 
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { CreateConnection } from "./shared/Connection.js"; 

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

const app = express();
const server = createServer(app); 
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3500",
      "https://ceo-card-back-end-72bl.vercel.app",
      process.env.ADMIN_URL,
      process.env.HOSTED_URL
    ],
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
  }
});

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

app.get("/", (req, res) => {
  res.send("Backend is working with Socket.io!");
});

app.use("/api/notifications", notificationRoutes(io)); 
app.use("/api/booking/services", BookingRoutes);
app.use("/api/Content/management", ContentRoutes);
app.use("/api/Inventory/management", InventoryRouter);
app.use("/api/Nav/hover", SubNavRouter);
app.use("/api/NavBar", NavBarRoutes);
app.use("/api/subnav/link", OnHoverLink);
app.use("/api/user", UserRoutes);
app.use("/api/Vendor", VendorRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

CreateConnection()
  .then(() => {
    server.listen(process.env.PORT || 3500, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 3500}`);
    });
  })
  .catch((err) => console.log("❌ Database Connection Failed:", err));



// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import fs from 'fs';
// import path from 'path';

// import { CreateConnection} from "./shared/Connection.js";
// import { BookingRoutes } from "./Modules/Booking-Management/Routes/Booking-Routes.js";
// import { ContentRoutes } from "./Modules/Content-Management/Routes/Content-Routes.js";
// import InventoryRouter from "./Modules/Inventory-Management/Routes/InventoryRoutes.js";
// import { SubNavRouter } from "./Modules/NAV-OnHover/Routes/NavOnHover-Routes.js";
// import NavBarRoutes from "./Modules/NavBar/routes/NavBarRoutes.js";
// import { OnHoverLink } from "./Modules/OnHover-Links/Routes/OnHoverLinkRouter.js";
// import UserRoutes from "./Modules/User-Management/Routes/UserRoutes.js";
// import { VendorRoutes } from "./Modules/Vendor-Management/routes/VendorRoutes.js";
// import morgan from "morgan";

// dotenv.config({ path: "./env" }); 

// const corsOptions = {
//   origin: ["http://localhost:3500","https://ceo-card-back-end-72bl.vercel.app", process.env.ADMIN_URL, process.env.HOSTED_URL],
//   methods: ["GET", "POST", "PUT", "DELETE"], 
//   allowedHeaders: [
//     'Content-Type', 
//     'Authorization', 
//     'X-Requested-With',
//     'Access-Control-Allow-Origin',
//     'Origin',
//     'Accept'
//   ],
//   credentials: true,
//   maxAge: 86400 
// };

// const App = express();

// App.use(cors(corsOptions)); 
// App.use(morgan('dev'));
// const port = process.env.PORT || 3500;

// App.use(express.json());


// App.get('/', (req, res) => {
//   res.send('Backend is working!');
// });

// App.use("/api/booking/services", BookingRoutes);
// App.use("/api/Content/management", ContentRoutes);
// App.use("/api/Inventory/management", InventoryRouter);
// App.use("/api/Nav/hover", SubNavRouter);
// App.use("/api/NavBar", NavBarRoutes);
// App.use("/api/subnav/link", OnHoverLink);
// App.use("/api/user", UserRoutes);
// App.use("/api/Vendor", VendorRoutes);
// App.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });
// const promise = CreateConnection();
// promise.then((connectionInfo)=>{
//     App.listen(port, err=>{
//         if (err) {
//             console.log('error in app',err);   
//         }else{
//             console.log("server is running",port)
//         }
    
//     })

// }).catch(err=>{
//     console.log(err);
// })