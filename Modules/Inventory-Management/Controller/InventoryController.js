import { AddInventory, fetchInventory } from "../Services/InventoryServices.js";

export const addInventory=async(request, response)=>{
    try {
        const Item = request.body;
        const AddedItem = await AddInventory(Item);
        if (!AddedItem) {
           return response.status(404).json({message:"item is not added"})
            
        } else {
           return response.status(200).json({message:"Item added successfully", Items:AddedItem})
            
        }
        
    } catch (error) {
        return response.status(500).json({message:"internal server error"})
        
    }
    

}

export const ViewInventory=async(request, response)=>{
    console.log('inside view inventory')
    try {
        const Inventory=await fetchInventory();
        if (!Inventory) {
           return response.status(404).json({message:'inventory is empty'})
            
        } else {
            return response.status(200).json({message:"the available inventory is ", Data:Inventory})
            
        }
        
    } catch (error) {
        return response.status(500).json({message:"internal server error",error:error.message})
    }
    
}