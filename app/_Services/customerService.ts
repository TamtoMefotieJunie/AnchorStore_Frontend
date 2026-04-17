import axios from "axios";
const url = 'http://localhost:5000'

export const getCustomers = async () => {
    try{
        console.log("Sending GET request to fetch customer types");
        const response = await axios.get(`${url}/customer-type/fetch/all`);
        console.log('Response:', response.data.data);
       
    }catch(error){
        console.log("Error fetching customer type:", error.message);
    }
}
export const createCustomer = async (customerData: any) => {
     const options = {
       headers: {
         'Content-Type': 'application/json'
       }
     };
     try{
       console.log("Sending POST request to create customer type with data:", customerData);
       const response = await axios.post(`${url}/customer-type/create/new`, customerData ,options)
       console.log('Response:', response.data);
   
     }catch(error){
       console.log("Error creating customer type:", error.message);
     }
   
     return {
       success: "New customer type saved successfully!",
     };
}