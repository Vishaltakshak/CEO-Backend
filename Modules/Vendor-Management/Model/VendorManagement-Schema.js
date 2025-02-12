import mongoose, { SchemaTypes } from "mongoose";

export const VendorManagementSchema = mongoose.Schema({
  VendorName: { type: SchemaTypes.String, required: true },
  VendorCategory: { type: SchemaTypes.String, required: true },
  ContactName: { type: SchemaTypes.String, required: true },
  ContactMail: { type: SchemaTypes.String, required: true },
  ContactNumber: { type: SchemaTypes.String, required: true, unique: true },
  VendorWebsite: { type: SchemaTypes.String, required: true },
  VendorDescription: {
    type: SchemaTypes.String,
    required: true,
    minLength: 20
  },
  VendorAddress: { type: SchemaTypes.String, required: true },
  VendorRating: { type: SchemaTypes.String, required: true },
  VendorImages: { type: SchemaTypes.String },
  VendorOpenHours: { type: SchemaTypes.String, required:true }, // Plain object for open hours
  VendorPricingInfo: {
    type: {
      Currency: { type: SchemaTypes.String, required: true },
      PriceRange: {
        Min: { type: SchemaTypes.Number, required: true },
        Max: { type: SchemaTypes.Number, required: true },
      },
    },
    required: true,
  },
  VendorAmenities: { type: [SchemaTypes.String], required: true },
  MapUrl: { type: SchemaTypes.String },
  VendorStatus: { type: SchemaTypes.String },
  Brand:{type:SchemaTypes.String, required:true},
  nodemon :{type:SchemaTypes.String, required:true},
  Paid:{type:SchemaTypes.String, required:true}
});

export const VendorManagementSch = mongoose.model(
  "VendorManagement",
  VendorManagementSchema
);
