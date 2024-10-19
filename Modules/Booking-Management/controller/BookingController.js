import { request, response } from "express";
import { addBooking, ViewBooking } from "../Services/Booking-Sercvices.js";

export const addBook =async(request, response)=>{
    try {
        const Product = request.body;
    const Bookings = await addBooking(Product);
    if(Bookings && Bookings._id){
        return response.status(200).json({message:"booking added", Bookings:Bookings})
    }else{
        return response.status(400).json({message:"booking not added"})
    }
        
    } catch (error) {
        return response.status(500).json({message:"Problem in adding booking", error:error})
        
    }
    


}

export const ViewBook = async (request, response) => {
    try {
        const viewBookings = await ViewBooking(); // Await the result
        if (!viewBookings || viewBookings.length === 0) {
            return response.status(404).json({ message: "No bookings found" });
        }
        return response.status(200).json({ message: "Here are all the bookings", Data: viewBookings });
    } catch (error) {
        console.error("Error fetching bookings:", error); // Log the error for debugging
        return response.status(500).json({ message: "Internal server error", error: error.message });
    }
};