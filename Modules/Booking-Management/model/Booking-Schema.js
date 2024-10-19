import mongoose, { SchemaType, SchemaTypes } from "mongoose";
export const BookingSchema=mongoose.Schema(
    {
        Name:{type:SchemaTypes.String, required:true},
        // BookingType:{type:SchemaTypes.String,required:true},
        Description:{type:SchemaTypes.String,required:true},
        Date:{type:SchemaTypes.Date,required:true},
        BookingStatus:{type:SchemaTypes.String,required:true}
    }
)
export const BookingSch=mongoose.model("Booking-Details",BookingSchema);