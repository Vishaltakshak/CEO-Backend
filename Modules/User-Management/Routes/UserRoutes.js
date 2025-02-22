import express from "express"
import { AddUser, DeleteUser, FetchUser, FindUser, UpdateUser } from "../Services/UserServices.js";
import { uploadImage } from "../../Upload/upload.js";
import { upload } from "../../Upload/upload.js";
import { loginUser, logoutUser } from "../controller/authController.js";
const UserRoutes=express.Router();

UserRoutes.post('/add',AddUser);
UserRoutes.get('/view',FetchUser)
UserRoutes.get('/view/:id',FindUser);
UserRoutes.put('/update/:id',UpdateUser);
UserRoutes.delete('/delete/:id',DeleteUser);
UserRoutes.post('/upload', upload.single('image'), uploadImage);
UserRoutes.post('/login',loginUser);
UserRoutes.post('/logout',logoutUser)




export default UserRoutes;

