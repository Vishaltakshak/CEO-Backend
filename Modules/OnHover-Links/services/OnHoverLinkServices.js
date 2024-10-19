
import { LinkSch } from "../Model/OnHoverLInkSchema.js";


export const AddLink = async (request, response) => {
    const Product = request.body;

    // Validate required fields
    if (!Product.ProviderName || !Product.ContactMail || !Product.WebsiteURl) {
        return response.status(400).json({ message: "Missing required fields" });
    }

    try {
        const AddedLink = await LinkSch.create(Product);
        return response.status(201).json({ message: 'Link successfully added', OnHoverLink: AddedLink });
    } catch (error) {
        console.error('Error adding link:', error); // Log the error for debugging
        return response.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const FindSubNavOnHover = async(request, response)=>{
    try {
        const{id}=request.params
        const Users = await LinkSch.findById(id);
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

export const ViewAllLinks=async(request, response)=>{
    const Links = await LinkSch.find({}).exec();
    if (!Links) {
        response.status(404).json({message:'no links are found'})
        
    } else {
        response.status(200).json({message:'available links are',Data:Links})
        
    }
}


export const UpdateLink=async(request, response)=>{
    const{id}= request.params;
    const{
        ProviderName,
        ContactMail,
        WebsiteURl,
        SubCategory,
        ContentTitle,
        ServiceCatergory,
        ContentDescription,
        CardDescription,
        CardTitle,
        BannerIMG,
        ServiceIMG,
        ProviderStatus,
        Offer,
        Latitude,
        Longitude,
        ContactNumber,  
    }=request.body

    try {
        const UpdatedValue= await LinkSch.findByIdAndUpdate(id,{ProviderName,
            ContactMail,
            WebsiteURl,
            SubCategory,
            ContentTitle,
            ServiceCatergory,
            ContentDescription,
            CardDescription,
            CardTitle,
            BannerIMG,
            ServiceIMG,
            ProviderStatus,
            Offer,
            Latitude,
            Longitude,
            ContactNumber,},{new:true})
            if (!UpdatedValue) {
                 return response.status(404).json({message:"Value couldn't be updated"})
                
            } else {
                return  response.status(200).json({message:"Value updated", NewLink:UpdatedValue})

                
            }
        
    } catch (error) {
        return response.status(500).json({message:'internal server error', error:error.message})
        
    }
}

export const DeleteLink =async(request, response)=>{
    const{id}=request.body;
    try {
        const DeletedLink = LinkSch.findByIdAndDelete(id)
        if (!DeletedLink) {
            return response.status(404).json({message:"either not found or couldn't be deleted"})
            
        } else {
            return response.status(200).json({message:"Link deleted", DeletedLink:DeletedLink})     
        }

    } catch (error) {
        return response.status(500).json({message:"server error",error:error.message})

        
    }

}