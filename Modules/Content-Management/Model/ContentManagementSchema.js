import mongoose, { SchemaType, SchemaTypes } from "mongoose";
export const ConentSchema=mongoose.Schema(
    {
        VendorName:{type:SchemaTypes.String, required:true},
        ContentType:{type:SchemaTypes.String, required:true},
        Title:{type:SchemaTypes.String, required:true},
        Description:{type:SchemaTypes.String, required:true},
        ContentStatus:{type:SchemaTypes.String, required:true},
    }
);
export const ContentSch=mongoose.model("Content-Data", ConentSchema);