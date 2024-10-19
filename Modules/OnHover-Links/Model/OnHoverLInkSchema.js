import mongoose, { SchemaTypes } from "mongoose";
export const LinkSchema=mongoose.Schema(
    {
        ProviderName:{type:SchemaTypes.String, required:true},
        ContactMail:{type:SchemaTypes.String, required:true},
        WebsiteURl:{type:SchemaTypes.String, required:true},
        ServiceCatergory:{type:SchemaTypes.String, required:true},
        SubCategory:{type:SchemaTypes.String, required:true},
        ContentTitle:{type:SchemaTypes.String, required:true},
        ContentDescription:{type:SchemaTypes.String, required:true},
        CardTitle:{type:SchemaTypes.String, required:true},
        CardDescription:{type:SchemaTypes.String, required:true},
        BannerIMG:{type:SchemaTypes.String},
        ServiceIMG:{type:SchemaTypes.String},
        ProviderStatus:{type:SchemaTypes.String, required:true},
        Offer:{type:SchemaTypes.String, required:true},
        Latitude:{type:SchemaTypes.Number, required:true},
        Longitude:{type:SchemaTypes.Number, required:true},
        ContactNumber:{type:SchemaTypes.Number, required:true}
    }
)
export const LinkSch = mongoose.model("on-Hover-Links",LinkSchema);