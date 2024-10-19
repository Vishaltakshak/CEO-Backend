import { response } from "express";
import AddContent, { ViewContent } from "../Services/Content-Services.js";

export const addContent=async(request, response)=>{

    try {
        const content = request.body;
        const newContent = await AddContent(content);
        if(newContent&&newContent._id){
            return response.status(200).json({message:"content added succesfully",content:newContent})
        }else{
            response.staus(400).json({message:"error adding new content"})
        }
        
    } catch (error) {
        response.status(500).json({message:"error in finding content", error:error})
        
    }
   
}

export const ViewConten=async(request,response)=>{
    const Content = await ViewContent();
    if(!Content){
        return response.status(404).json({message:'error in showing'})
    }
    else{
       return response.status(200).json({Data:Content})
    }
}