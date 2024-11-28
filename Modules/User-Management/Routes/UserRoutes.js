import express from "express"
import { AddUser, DeleteUser, FetchUser, FindUser, UpdateUser, uploadImage } from "../Services/UserServices.js";
import multer from 'multer';
const UserRoutes=express.Router();

UserRoutes.post('/add',AddUser);
UserRoutes.get('/view',FetchUser)
UserRoutes.get('/view/:id',FindUser);
UserRoutes.put('/update/:id',UpdateUser);
UserRoutes.delete('/delete/:id',DeleteUser);

const storage = multer.memoryStorage();
const upload = multer({ storage });

UserRoutes.post('/upload', upload.single('image'), uploadImage);


export default UserRoutes;

// import express from "express";
// import { AddUser, DeleteUser, FetchUser, FindUser, UpdateUser, uploadImage } from "../Services/UserServices.js";

// import Upload from '../../Upload/upload.js';
// const UserRoutes = express.Router();

// // Standard CRUD routes
// UserRoutes.post('/add', AddUser);
// UserRoutes.get('/view', FetchUser);
// UserRoutes.get('/view/:id', FindUser);
// UserRoutes.put('/update/:id', UpdateUser);
// UserRoutes.delete('/delete/:id', DeleteUser);

// UserRoutes.post('/upload', Upload.single('image'), uploadImage);

// export default UserRoutes;
