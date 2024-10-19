
import { BookingSch } from '../model/Booking-Schema.js'


export const addBooking = async(Product) => {
  try {
    const doc = BookingSch.create(Product)
    return doc
  } catch (error) {
    console.log(error)
    
  }
}

export const ViewBooking = async(Product) => {
    try {
        const doc = await BookingSch.find({}).exec();
        return doc
    } catch (error) {
        console.log(error)
        
    }
  
}
export const FindBooking = async(request, response)=>{
  try {
      const{id}=request.params
      const Users = await BookingSch.findById(id);
      if (!Users || Users.length === 0) {
          return response.status(404).json({ message: 'No bookuiins found' });
      } else {
          return response.status(200).json({ Users: Users });
      }
  } catch (error) {
      console.error("Error fetching users:", error);
      return response.status(500).json({ message: 'Error in fetching users' });
  }

}

export const DeleteBooking = async (request, response) => {
  const { id } = request.params;

  try {
      const doc = await BookingSch.findByIdAndDelete(id);

      if (!doc) {
          return response.status(404).json({ message: "Booking not found" }); 
      }

      return response.status(200).json({ message: "Deletion successful" });

  } catch (error) {
      console.error("Error deleting booking:", error); 
      return response.status(500).json({ message: "Internal server error", error: error.message }); 
  }
};

export const UpdateBooking = async (request, response) => {
  const { id } = request.params;
  const {
    Name,
    Description,
    Date,
    BookingStatus
  } = request.body; 

  try {
    const doc = await BookingSch.findByIdAndUpdate(id, {
      Name,
      
      Description,
      Date,
      BookingStatus
    }, { new: true }); 

    if (!doc) {
      return response.status(404).json({ message: "Data couldn't be found" });
    }

    return response.status(200).json({ message: "Update successful", BookingData: doc });

  } catch (error) {
    console.error("Error updating booking:", error); 
    return response.status(500).json({ message: "Internal server error", error: error.message }); 
  }
};

