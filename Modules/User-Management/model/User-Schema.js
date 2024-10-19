import mongoose, { SchemaTypes } from "mongoose";

export const UserSchema = mongoose.Schema({
    Name: { type: SchemaTypes.String, required: true, minLength: 5 },
    Mail: { type: SchemaTypes.String, required: true, minLength: 8, unique: true },
    Password: { type: SchemaTypes.String, required: true, minLength: 8 },
    ConfirmPassword: { type: SchemaTypes.String, required: true, minLength: 8 },
    MobileNumber: { type: SchemaTypes.String, required: true }, // Changed to String for better validation
    Role: { type: SchemaTypes.String, default: 'User' },
    DOB: { type: SchemaTypes.Date, required: true },
    LinkedinProfile: { type: SchemaTypes.String }, // Optional field
    CompanyName: { type: SchemaTypes.String, required: true, minLength: 10 },
    ProfessionalTitle: { type: SchemaTypes.String, required: true, minLength: 10 },
    Status: { type: SchemaTypes.String, default: 'Active' }, // Default value
    UserType: { type: SchemaTypes.String, default: 'Regular User', required: true, minLength: 3 },
    UserImage: { type: SchemaTypes.String } // Optional field for storing image URL
});

export const userSch = mongoose.model("user-management", UserSchema);