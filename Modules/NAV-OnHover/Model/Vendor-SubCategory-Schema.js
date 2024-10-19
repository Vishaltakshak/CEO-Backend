import mongoose, { SchemaTypes } from "mongoose";
export const VendorSubCategorySchema=mongoose.Schema(
    {
        SubCategoryName:{type:SchemaTypes.String, required: true, minLength:3},
        MainCategory :{type:SchemaTypes.String, required: true, minLength:3},
        SubCategoryTitle:{type:SchemaTypes.String, required: true, minLength:3},
        Description:{type:SchemaTypes.String, required: true, minLength:10},
        Status:{type:SchemaTypes.String, required: true, minLength:4}
    }
)
export const VendorSubSch =mongoose.model("Vendor-subCategory-Schema", VendorSubCategorySchema);