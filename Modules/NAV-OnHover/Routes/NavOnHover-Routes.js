import express from "express";
import { AddNewNavBarHover, ViewSubNav } from "../Controller/NavBarOnHover-Controller.js";
import { DeleteNavBarHoverOption, FindNavOnHover, UpdateNavHover } from "../Services/NavOnHover-Services.js";

export const SubNavRouter=express.Router()

SubNavRouter.get('/view',ViewSubNav)
SubNavRouter.get('/view/:id',FindNavOnHover);
SubNavRouter.post('/add',AddNewNavBarHover)
SubNavRouter.put('/update/:id',UpdateNavHover)
SubNavRouter.delete('/delete/:id',DeleteNavBarHoverOption)