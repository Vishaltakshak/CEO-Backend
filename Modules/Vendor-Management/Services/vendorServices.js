
import { VendorManagementSch } from "../Model/VendorManagement-Schema.js";

export const AddVendor = async (request, response) => {
    
    const vendorData = request.body;
    try {
        const addedVendor = await VendorManagementSch.create(vendorData);
        if (!addedVendor) {
            return response.status(400).json({ message: 'Vendor not added', error:error.message });
        }
        return response.status(200).json({ message: 'Vendor added successfully', vendor: addedVendor });
    } catch (error) {
        return response.status(500).json({ message: 'Server side error', error: error.message });
    }
}

export const VendorList = async (request, response) => {
    try {
        const vendors = await VendorManagementSch.find({}).exec();
        if (!vendors || vendors.length === 0) {
            return response.status(404).json({ message: 'No vendors found' });
        }
        return response.status(200).json({ Data: vendors });
    } catch (error) {
        return response.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const UpdateVendor = async (request, response) => {
    const { id } = request.params;
    const {
        VendorName,
        VendorCategory,
        ContactName,
        ContactMail,
        ContactNumber,
        VendorWebsite,
        VendorAddress,
        VendorRating,
        VendorImages,
        VendorOpenHours,
        VendorPricingInfo,
        VendorAmenities,
        VendorStatus,
        VendorDescription,
        VendorLoactionCoordinates,
        City,
        Brand,
        Paid
    } = request.body;

    try {
        const updatedVendor = await VendorManagementSch.findByIdAndUpdate(id, {
            VendorName,
            VendorCategory,
            ContactName,
            ContactMail,
            ContactNumber,
            VendorWebsite,
            VendorAddress,
            VendorRating,
            VendorImages,
            VendorOpenHours,
            VendorPricingInfo,
            VendorAmenities,
            VendorStatus,
            VendorDescription,
            VendorLoactionCoordinates,
            City,
            Brand,
            Paid
        }, { new: true }); // Use { new: true } to return the updated document

        if (!updatedVendor) {
            return response.status(404).json({ message: 'Vendor not found or not updated' });
        }
        
        return response.status(200).json({ message: 'Vendor updated successfully', updatedVendor });
        
    } catch (error) {
        return response.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const FindVendorManagement = async(request, response)=>{
    try {
        const{id}=request.params
        const Users = await VendorManagementSch.findById(id);
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

export const DeleteVendor = async (request, response) => {
    const { id } = request.params;
    try {
        const deletedVendor = await VendorManagementSch.findByIdAndDelete(id);
        
        if (!deletedVendor) {
            return response.status(404).json({ message: 'Vendor not found or not deleted' });
        }

        return response.status(200).json({ message: 'Vendor deleted successfully', deletedVendor });
        
    } catch (error) {
        return response.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const uploadVendorImage = async(req, res) => {
    if (!req || !res) {
        return res.status(500).json({ success: false, message: 'Request or response object is missing' });
    }

    if (!req.file || !req.file.location) {
        return res.status(400).json({ success: false, message: 'Upload failed' });
    }

    try {
        const imageUrl = req.file.location;
        // Save the `imageUrl` in MongoDB alongside other document data if needed.
        try {
            const newLink = new VendorManagementSch({
                VendorImages: imageUrl
            });
            await newLink.save();
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
        }
        return res.json({ success: true, imageUrl });
    } catch (error) {
        console.error("Error during image upload:", error);
        return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};


