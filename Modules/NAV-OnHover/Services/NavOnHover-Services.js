
import {  VendorSubSch } from '../Model/Vendor-SubCategory-Schema.js'

export const AddNavOnHover = async(Product) => {
    try {
        const NewNavLink = await VendorSubSch.create(Product);
        return NewNavLink;
       
        
    } catch (error) {
        throw error
        
    }
}

export const FindNavOnHover = async(request, response)=>{
    try {
        const{id}=request.params
        const Users = await VendorSubSch.findById(id);
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
export const ViewNavBarOnHover = async(request, response)=>{
    try {
        const ViewNavHover= await VendorSubSch.find({}).exec();
        return ViewNavHover;
        // if (!ViewNavHover) {
        //     response.status(404).json({message:"New Nav is not added"})
            
        // } else {
        //     response.status(200).json({message:"Nav-bar link added",AddedNav:ViewNavHover})
            
        // }
        
    } catch (error) {
        throw error;
        
    }
    
}
export const DeleteNavBarHoverOption = async(req, res)=>{
    const {id} =req.params;
    try {
        const DeletedItem = await VendorSubSch.findByIdAndDelete(id);
        if (!DeletedItem) {
            res.status(404).json({message: "not found"})
            
        }
        res.status(200).json({message:"deletion successful"})
        return DeletedItem;
    } catch (error) {
        throw error
        
    }
}
export const UpdateNavHover = async(req,res)=>{
    const {id}=req.params;
    const{SubCategoryName,MainCategory,SubCategoryTitle,Description,Status} = req.body;
    try {
        const UpdatedNavHover = await VendorSubSch.findByIdAndUpdate(id,{
            SubCategoryName:SubCategoryName,
            MainCategory:MainCategory,
            SubCategoryTitle:SubCategoryTitle,
            Description:Description,
            Status:Status 
        },{new:true})

        if(!UpdatedNavHover){
            res.status(404).json({message:"data couldn't be added"})
        }
        res.status(200).json({message:"update successful", data: UpdatedNavHover})
        return UpdatedNavHover;
    } catch (error) {
        throw error;
        
    }
}