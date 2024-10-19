import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { CreatConnection } from "./shared/Connection.js";
import { BookingRoutes } from "./Modules/Booking-Management/Routes/Booking-Routes.js";
import { ContentRoutes } from "./Modules/Content-Management/Routes/Content-Routes.js";
import InventoryRouter from "./Modules/Inventory-Management/Routes/InventoryRoutes.js";
import { SubNavRouter } from "./Modules/NAV-OnHover/Routes/NavOnHover-Routes.js";
import NavBarRoutes from "./Modules/NavBar/routes/NavBarRoutes.js";
import { OnHoverLink } from "./Modules/OnHover-Links/Routes/OnHoverLinkRouter.js";
import UserRoutes from "./Modules/User-Management/Routes/UserRoutes.js";
import { VendorRoutes } from "./Modules/Vendor-Management/routes/VendorRoutes.js";

dotenv.config({ path: "./env" }); // Load environment variables

const App = express();
const port = process.env.PORT || 3000;

App.use(express.json());
App.use(cors()); // Apply CORS middleware

// Define routes
App.use("/api/booking/services", BookingRoutes);
App.use("/api/Content/management", ContentRoutes);
App.use("/api/Inventory/management", InventoryRouter);
App.use("/api/Nav/hover", SubNavRouter);
App.use("/api/NavBar", NavBarRoutes);
App.use("/api/subnav/link", OnHoverLink);
App.use("/api/user", UserRoutes);
App.use("/api/Vendor", VendorRoutes);

const startServer = async () => {
  try {
    await CreatConnection();
    App.listen(port, () => {
      console.log("Server is running on port", port);
    });
  } catch (err) {
    console.error("Error while starting server:", err);
    process.exit(1);
  }
};

startServer();
