import mongoose, { SchemaTypes } from "mongoose";

export const UserSchema = mongoose.Schema({
  Name: { type: SchemaTypes.String, required: true, minLength: 5 },
  Mail: {
    type: SchemaTypes.String,
    required: true,
    minLength: 8,
    unique: true,
  },
  Password: { type: SchemaTypes.String, required: true, minLength: 8 },
  ConfirmPassword: { type: SchemaTypes.String, required: true, minLength: 8 },
  MobileNumber: { type: SchemaTypes.String, required: true }, // Changed to String for better validation
  Role: { type: SchemaTypes.String, default: "User" },
  DOB: { type: SchemaTypes.Date, required: true },
  LinkedinProfile: { type: SchemaTypes.String }, // Optional field
  CompanyName: { type: SchemaTypes.String, required: true, minLength: 3 },
  ProfessionalTitle: { type: SchemaTypes.String, required: true },
  Status: { type: SchemaTypes.String, default: "Inactive" }, // Default value
  UserType: { type: SchemaTypes.String, default: "Regular User", minLength: 3 },
  UserImage: { type: SchemaTypes.String }, // Optional field for storing image URL
  Currency: { type: SchemaTypes.String, default: "Dollar" },
  Language: { type: SchemaTypes.String, default: "English" },
});

export const userSch = mongoose.model("user-management", UserSchema);
