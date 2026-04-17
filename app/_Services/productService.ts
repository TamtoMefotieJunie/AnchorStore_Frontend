import axios from "axios";

const url = 'http://localhost:5000'
export const getProducts = async () => {
    const response = await axios.get(`${url}/products`);
    return response.data;
}
export const createProduct = async (productData: any) => {
    try {
        const response = await axios.post(`${url}/product/get`, productData, { headers: { 'Content-Type': 'application/json' } });
        return {
            success: 'Product created successfully!',
            data: response.data,
        };
    } catch (error) {
        console.log("FULL ERROR:", error);
        console.log("RESPONSE DATA:", error.response?.data);            
    }}