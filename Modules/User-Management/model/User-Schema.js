// import mongoose, { SchemaTypes } from "mongoose";

// export const UserSchema = mongoose.Schema({
//   Name: { type: SchemaTypes.String, required: true, minLength: 5 },
//   Mail: {
//     type: SchemaTypes.String,
//     required: true,
//     minLength: 8,
//     unique: true,
//   },
//   Password: { type: SchemaTypes.String, minLength: 8 },
//   ConfirmPassword: { type: SchemaTypes.String, minLength: 8 },
//   MobileNumber: { type: SchemaTypes.String, required: true }, // Changed to String for better validation
//   Role: { type: SchemaTypes.String, default: "User" },
//   DOB: { type: SchemaTypes.Date },
//   LinkedinProfile: { type: SchemaTypes.String }, // Optional field
//   CompanyName: { type: SchemaTypes.String, required: true, minLength: 3 },
//   ProfessionalTitle: { type: SchemaTypes.String, required: true },
//   Status: { type: SchemaTypes.String, default: "Inactive" }, // Default value
//   UserType: { type: SchemaTypes.String, default: "Regular User", minLength: 3 },
//   UserImage: { type: SchemaTypes.String }, // Optional field for storing image URL
//   Currency: { type: SchemaTypes.String, default: "Dollar" },
//   Language: { type: SchemaTypes.String, default: "English" },
// });

// export const userSch = mongoose.model("user-management", UserSchema);



import mongoose, { SchemaTypes } from "mongoose";
import bcrypt from "bcryptjs";  

export const UserSchema = mongoose.Schema({
  Name: { type: SchemaTypes.String, required: true, minLength: 5 },
  Mail: {
    type: SchemaTypes.String,
    required: true,
    minLength: 8,
    unique: true,
  },
  Password: { type: SchemaTypes.String, required: true, minLength: 8 },
  MobileNumber: { type: SchemaTypes.String, required: true }, 
  Role: { type: SchemaTypes.String, default: "User" },
  DOB: { type: SchemaTypes.Date },
  LinkedinProfile: { type: SchemaTypes.String },
  CompanyName: { type: SchemaTypes.String, required: true, minLength: 3 },
  ProfessionalTitle: { type: SchemaTypes.String, required: true },
  Status: { type: SchemaTypes.String, default: "Inactive" },
  UserType: { type: SchemaTypes.String, default: "Regular User", minLength: 3 },
  UserImage: { type: SchemaTypes.String },
  Currency: { type: SchemaTypes.String, default: "Dollar" },
  Language: { type: SchemaTypes.String, default: "English" },
});


UserSchema.pre("save", async function (next) {
  if (!this.isModified("Password")) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.Password = await bcrypt.hash(this.Password, salt);
  next();
});


UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.Password);
};

export const userSch = mongoose.model("user-management", UserSchema);
