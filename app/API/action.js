"use server";

import { z } from "zod";
import axios from "axios";

const categoryFormSchema = z.object({
  category_name: z.string().trim().min(1, { message: "Name field is required" }),
  category_description: z.string().trim().min(1, { message: "Please type in a description" }),
});
const customerTypeFormSchema = z.object({
  name:z.string().trim().min(1, { message: "Name field is required" }),
  description: z.string().trim().min(1, { message: "Please type in a description" }),
});

export async function createCategory(prevState,formData) {
  const validatedcategoryFormData = categoryFormSchema.safeParse(
    {
      category_name: formData.get("category_name"),
      category_description: formData.get("category_description")
    }
  );

  if (!validatedcategoryFormData.success) {
    const formFieldErrors = validatedcategoryFormData.error.flatten().fieldErrors;
    return {
      errors: {
        category_name: formFieldErrors?.category_name,
        category_description: formFieldErrors?.category_description,
      },
    };
  }

  const data ={
    "name": validatedcategoryFormData.data.category_name,
    "description": validatedcategoryFormData.data.category_description
  }
  console.log("Validated category data:", { name: data.name, description: data.description });
  const url = 'http://127.0.0.1:5000/category';
  const options = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try{
    const response = await axios.post(url, data ,options)
    console.log('Response:', response.data);
    return {
    success: "New category saved successfully!",
  };
  }catch(error){
    console.log("Error creating category:", error.message);
    return {
      errors: {
        name: [],
        description: [],
    },
  }
}

}

export async function createCustomerType(prevState,formData) {
  const validatedCustomerTypeFormData = customerTypeFormSchema.safeParse(
    {
      name: formData.get("customer_name"),
      description: formData.get("customer_description")
    }
  );
  if (!validatedCustomerTypeFormData.success) {
    const formFieldErrors = validatedCustomerTypeFormData.error.flatten().fieldErrors;
    return {
      errors: {
        name: formFieldErrors?.name,
        description: formFieldErrors?.description,
      },
    };
  }
  const data ={
    "name": validatedCustomerTypeFormData.data.name,
    "description": validatedCustomerTypeFormData.data.description
  }
  console.log("Validated customer type data:", { name: data.name, description: data.description });
  const url = 'http://127.0.0.1:5000/customer-type/create/new';
  const options = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try{
    console.log("Sending POST request to create customer type with data:", data);
    const response = await axios.post(url, data ,options)
    console.log('Response:', response.data);

  }catch(error){
    console.log("Error creating customer type:", error.message);
  }

  return {
    success: "New customer type saved successfully!",
  };
}