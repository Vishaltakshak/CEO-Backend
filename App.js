import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { creatConnection} from "./shared/Connection.js";
import { BookingRoutes } from "./Modules/Booking-Management/Routes/Booking-Routes.js";
import { ContentRoutes } from "./Modules/Content-Management/Routes/Content-Routes.js";
import InventoryRouter from "./Modules/Inventory-Management/Routes/InventoryRoutes.js";
import { SubNavRouter } from "./Modules/NAV-OnHover/Routes/NavOnHover-Routes.js";
import NavBarRoutes from "./Modules/NavBar/routes/NavBarRoutes.js";
import { OnHoverLink } from "./Modules/OnHover-Links/Routes/OnHoverLinkRouter.js";
import UserRoutes from "./Modules/User-Management/Routes/UserRoutes.js";
import { VendorRoutes } from "./Modules/Vendor-Management/routes/VendorRoutes.js";
import morgan from "morgan";

dotenv.config({ path: "./env" }); 

const corsOptions = {
  origin: ["http://localhost:3500","https://ceo-backend-six.vercel.app", process.env.ADMIN_URL, process.env.HOSTED_URL],
  methods: ["GET", "POST", "PUT", "DELETE"], 
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Access-Control-Allow-Origin',
    'Origin',
    'Accept'
  ],
  credentials: true,
  maxAge: 86400 
};

const App = express();

App.use(cors(corsOptions)); 
App.use(morgan('dev'));
const port = process.env.PORT || 3500;

App.use(express.json());

// Define routes
App.get('/', (req, res) => {
  res.send('Backend is working!');
});
startServer();
App.use("/api/booking/services", BookingRoutes);
App.use("/api/Content/management", ContentRoutes);
App.use("/api/Inventory/management", InventoryRouter);
App.use("/api/Nav/hover", SubNavRouter);
App.use("/api/NavBar", NavBarRoutes);
App.use("/api/subnav/link", OnHoverLink);
App.use("/api/user", UserRoutes);
App.use("/api/Vendor", VendorRoutes);
App.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
const startServer = async () => {
  try {
    await creatConnection();
    App.listen(port, () => {
      console.log("Server is running on port", port);
    });
  } catch (err) {
    console.error("Error while starting server:", err);
    process.exit(1);
  }
};
