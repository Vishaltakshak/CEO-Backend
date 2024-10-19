import express from "express";
import { addBooking, DeleteBooking, FindBooking, UpdateBooking, ViewBooking } from "../Services/Booking-Sercvices.js";
import { addBook, ViewBook } from "../controller/BookingController.js";

export const BookingRoutes = express.Router();
BookingRoutes.get('/view',ViewBook);
BookingRoutes.get('/view/:id',FindBooking);

BookingRoutes.post('/add',addBook);
BookingRoutes.put('/update/:id',UpdateBooking);
BookingRoutes.delete('/delete/:id',DeleteBooking);

BookingRoutes.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});