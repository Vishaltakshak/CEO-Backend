import express from "express"
import { AddNewNavOption, DeleteNavOption, UpdateNavBar, ViewNavBar } from "../services/NavBar-Operation.js";
export const NavBarRoutes =express.Router();

NavBarRoutes.post("/add",AddNewNavOption);
NavBarRoutes.get('/view',ViewNavBar);
NavBarRoutes.delete('/:id',DeleteNavOption);
NavBarRoutes.put('/update/:id',UpdateNavBar);

NavBarRoutes.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default NavBarRoutes;