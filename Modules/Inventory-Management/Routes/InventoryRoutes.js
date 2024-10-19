import express from "express";
import { addInventory, ViewInventory } from "../Controller/InventoryController.js";
import { DeleteInventoryItem, FindInventory, UpdateInventory } from "../Services/InventoryServices.js";

export const InventoryRouter = express.Router();

InventoryRouter.get("/view",ViewInventory);
InventoryRouter.get("/view/:id",FindInventory);
InventoryRouter.post('/add',addInventory)
InventoryRouter.put('/updated/:id',UpdateInventory)
InventoryRouter.delete('/delete/:id',DeleteInventoryItem)
export default InventoryRouter;