import { z } from 'zod';
import axios from "axios";

const productFormSchema = z.object({
  prodName: z.string().trim().min(3, { message: 'Name field is required' }),
  prodDescription: z.string().trim().min(4, { message: 'Description field is required' }),
  prodPrice: z.number().min(0, { message: 'Price field is required' }),
  prodStock: z.number().min(0, { message: 'Stock quantity is needed' }),
  prodCategory: z.string().trim().min(1, { message: 'product category is required' }),
  prodImages: z.array(z.any()).refine((files) => files?.length > 0, "At least one file is required"),
  prodDiscounts: z.array(z.object({})).refine(() => true, { message: 'please precise the discount for each customer type'})

})

export const createProduct = async (previousState, formData) => {
      console.log("function triggered");
    const validatedProductFormData = productFormSchema.safeParse({
        prodName:formData.get('name'),
        prodDescription:formData.get('description'),
        prodPrice: parseFloat(formData.get('price')) ,
        prodStock: parseInt(formData.get('stock'), 10),
        prodCategory:formData.get('category'),
        prodImages:formData.getAll('files'),
        prodDiscounts:formData.getAll('discount')
    })
  

    if (!validatedProductFormData.success) {
        const formFieldErrors = validatedProductFormData.error.flatten().fieldErrors;
        return {
          errors: {
            prodName: formFieldErrors?.prodName,
            prodDescription: formFieldErrors?.prodDescription,
            prodPrice:formFieldErrors?.prodPrice,
            prodStock:formFieldErrors?.prodStock,
            prodCategory:formFieldErrors?.prodCategory,
            prodImages:formFieldErrors?.prodImages,
            prodDiscounts:formFieldErrors?.prodDiscounts
          },
        };
      }
      const data ={
        "name": validatedProductFormData.data.prodName,
        "price": validatedProductFormData.data.prodPrice,
        "stock":validatedProductFormData.data.prodStock,
        "category":validatedProductFormData.data.prodCategory,
        "description": validatedProductFormData.data.prodDescription,
        "discounts": validatedProductFormData.data.prodDiscounts,
        "files":validatedProductFormData.data.prodImages
      }
      console.log("Validated product data:", { prodName: data.name, prodDescription: data.description });
      const url = 'http://localhost:5000/product/create';
    
      console.log("FormData being sent:");
      for (let [key, value] of formData.entries()) {
        console.log(`  ${key}:`, value instanceof File ? `File(${value.name})` : value);
      }
      
      try{  
        const response = await axios.post(url, formData);
        console.log('Response:', response.data);
        return {
          success: "New product saved successfully!",
        }
      }
      catch(error){
        console.log("RESPONSE STATUS:", error?.response?.status);
        console.log("RESPONSE DATA:", error?.response?.data);
        return {
          errors: {
            prodName: [error?.response?.data?.message || error.message],
            prodDescription: [],
            prodPrice:[],
            prodStock:[],
            prodDiscounts:[],
            prodImages:[],
            prodCategory:[]
        },
      }
    }
};