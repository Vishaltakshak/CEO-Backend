import mongoose, { SchemaTypes } from "mongoose";
export const VendorSchema = mongoose.Schema(
    {
        CategoryName:{type:SchemaTypes.String, required: true, minLength:3},
        Description:{type:SchemaTypes.String, required: true, minLength:10},
        Status:{type:SchemaTypes.String, required: true, minLength:5},
    }
)
export const VendorSch=mongoose.model("Vendor-Category",VendorSchema);