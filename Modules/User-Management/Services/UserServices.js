
import { request, response } from "express";
import { userSch } from "../model/User-Schema.js";

export const AddUser = async (request, response) => {
    const User = request.body;
    try {
        const AddedUser = await userSch.create(User);
        if (!AddedUser) {
            return response.status(400).json({ message: 'User not added' });
        } else {
            return response.status(200).json({ message: 'User added successfully', Data: AddedUser });
        }
    } catch (error) {
        console.error("Error adding user:", error);
        return response.status(500).json({ message: 'Internal server error',error:error.message});
    }
}
export const FindUser = async(request, response)=>{
    try {
        const{id}=request.params
        const Users = await userSch.findById(id);
        if (!Users || Users.length === 0) {
            return response.status(404).json({ message: 'No users found' });
        } else {
            return response.status(200).json({ Users: Users });
        }
    } catch (error) {
        console.error("Error fetching users:", error);
        return response.status(500).json({ message: 'Error in fetching users' });
    }

}
export const FetchUser = async (request, response) => {

    try {
        
        const Users = await userSch.find({}).exec();
        if (!Users || Users.length === 0) {
            return response.status(404).json({ message: 'No users found' });
        } else {
            return response.status(200).json({ Users: Users });
        }
    } catch (error) {
        console.error("Error fetching users:", error);
        return response.status(500).json({ message: 'Error in fetching users' });
    }
}

export const UpdateUser = async (request, response) => {
    const { id } = request.params;
    const { Name, Mail, Role, UserType, Password, MobileNumber, CompanyName, DOB, ProfessionalTitle } = request.body;

    try {
        const UpdatedUser = await userSch.findByIdAndUpdate(id, {
            Name,
            Mail,
            Role,
            UserType,
            Password,
            MobileNumber,
            CompanyName,
            DOB,
            ProfessionalTitle
        }, { new: true });

        if (!UpdatedUser) {
            return response.status(404).json({ message: 'User could not be updated' });
        }

        return response.status(200).json({ message: 'User updated successfully', updatedUser: UpdatedUser });

    } catch (error) {
        console.error("Error updating user:", error);
        return response.status(500).json({ message: 'Server side error' });
    }
}

export const DeleteUser = async (request, response) => {
    const { id } = request.params;
    try {
        const DeletedUser = await userSch.findByIdAndDelete(id);
        
        if (!DeletedUser) {
            return response.status(404).json({ message: 'User could not be deleted' });
        }

        return response.status(200).json({ message: 'User deleted successfully', deletedUser: DeletedUser });
        
    } catch (error) {
        console.error("Error deleting user:", error);
        return response.status(500).json({ message: 'Server side error' });
    }
}