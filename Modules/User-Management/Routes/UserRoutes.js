import express from "express"
import { AddUser, DeleteUser, FetchUser, FindUser, UpdateUser } from "../Services/UserServices.js";

const UserRoutes=express.Router();

UserRoutes.post('/add',AddUser);
UserRoutes.get('/view',FetchUser)
UserRoutes.get('/view/:id',FindUser);
UserRoutes.put('/user/update/:id',UpdateUser);
UserRoutes.delete('/delete/:id',DeleteUser);

export default UserRoutes;