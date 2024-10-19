
import { VendorSch } from '../model/Vendor-Schema.js'


export const AddNewNavOption = async(request, response) => {
    const Product=request.body
  try {
    const doc = await VendorSch.create(Product)
    if(!doc){
        return response.status(404).json({message:'items not found'})
    }else{
        return response.status(200).json({message:'here are the requested items ', NavBar:doc})
    }
    return doc;

  } catch (error) {
    throw error
    
  }
}


export const ViewNavBar= async(request,response) => {
    try {
        const doc =await VendorSch.find({}).exec()
        if (!doc) {
            return response.status(404).json({message:'requested items not found'})
            
        } else {
            return response.status(200).json({message:'here are the requested items ', Data:doc})
            
        }
        return doc;
        
    } catch (error) {
        throw error    
    }

}

export const DeleteNavOption = async(req, res)=>{
    const {id} = req.params;
    try {
        const DeleteNavBarOption = await VendorSch.findByIdAndDelete(id);
        if (!DeleteNavBarOption) {
            res.status(404).json({message: "not found"})
            
        }
        res.status(200).json({message:"deletion successful"})
        return DeleteNavBarOption;
    } catch (error) {
        throw error
        
    }

}


export const UpdateNavBar = async(req, res) => {
    const{id}= req.params;
    const{CategoryName,Description,Status}=req.body;
    try {
        const UpdateNavBarOption= await VendorSch.findByIdAndUpdate(id,{
            CategoryName: CategoryName,
            Description:Description,
            Status:Status
        
        })
        if(!UpdateNavBarOption){
            res.status(404).json({message:"data couldn't be added"})
        }
        res.status(200).json({message:"update successful", data: UpdateNavBarOption})
        return UpdateNavBarOption;
    } catch (error) {
        throw error
    }
  
}
