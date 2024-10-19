import { AddNavOnHover, ViewNavBarOnHover } from "../Services/NavOnHover-Services.js";

export const AddNewNavBarHover=async(request, response)=>{
    const Product = request.body;

    try {
        const AddedItem = await AddNavOnHover(Product);
    if (!AddedItem) {
        return response.status(400).json({message:'subnav not added'})
        
    } else {
       return  response.status(200).json({message:'subnav added succesfully',HoverLink:AddedItem})
        
    }
        
    } catch (error) {
        return response.status(500).json({message:'internal server error',error:error.message})
        
    }
    
}


export const ViewSubNav =async(request, response)=>{
    try {
        const subNavBar= await ViewNavBarOnHover();

        if(!subNavBar) {
        return response.status(404).json({message:'empty navhover link'})
        } else {
        return response.status(200).json({Data:subNavBar})
        
    }
        
    } catch (error) {
        return response.status(500).json({message:' server error', error:error.message})
        
    }
    
}