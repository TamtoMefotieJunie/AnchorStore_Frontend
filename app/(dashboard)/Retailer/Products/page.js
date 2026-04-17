'use client'
import { useState, useEffect } from 'react';
import React from 'react';
import DashboardLayout from '@/app/(dashboard)/Cashier/DashboardLayout'
import Button from '@/app/Components/Button/Button'
import { AddCard, Done, NewLabel, Upload } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useActionState } from "react";
import { createCategory } from "@app/API/action";
import { createProduct } from '@/app/API/product';
import SubmitButton from '@/app/Components/Button/SubmitButton';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getCustomers } from '@/app/_Services/customerService'


const initialState = {
  success: "",
  errors: {
    category_name: [],
    category_description: [],
  }
};
const prodInitialState = {
  success: "",
  errors:{
    prodName: [],
    prodDescription: [],
    prodPrice:[],
    prodStock:[],
    prodDiscounts:[],
    prodImages:[],
    prodCategory:[]
  }
}

function Products() {
  const [open, setOpen] = useState(false)
  const [state, formAction] = useActionState(createCategory,initialState);
  const [prodState, FormAction] = useActionState(createProduct,prodInitialState)
  const [customerTypes, setCustomerTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [hasSubmittedCategory, setHasSubmittedCategory] = useState(false);
  const [hasSubmittedProduct, setHasSubmittedProduct] = useState(false);
  
  useEffect(() => {
    if (hasSubmittedCategory && state.success) {
      Swal.fire({
        title: "Category Created!",
        text: state.success,
        icon: "success",
        confirmButtonText: "OK"
      }).then(() => {
        setOpen(false);
        setHasSubmittedCategory(false);
      });
    }
  }, [state.success, hasSubmittedCategory]);
  useEffect(() => {
    if (hasSubmittedProduct && prodState.success) {
      Swal.fire({
        title: "Product Created!",
        text: prodState.success,
        icon: "success",
        confirmButtonText: "OK"
      }).then(() => {
        setHasSubmittedProduct(false);
      });
    }
  }, [prodState.success, hasSubmittedProduct]);
  useEffect(() => {
    const fetchCustomerTypes = async () => {
      try{
        const data = await getCustomers();
        console.log('Response:', data);
        setCustomerTypes(data);
      }catch(error){
        console.log("Error fetching customer type:", error.message);
      }
    };
    const fetchCategories = async () => {
      const url = 'http://127.0.0.1:5000/category/get';
      try{
        console.log("Sending GET request to fetch categories");
        const response = await axios.get(url)
        console.log('Response:', response.data.data);
        setCategories(response.data.data);
      }catch(error){
        console.log("Error fetching categories:", error.message);
      }
    };

    fetchCustomerTypes();
    fetchCategories();
  }, [])
 const handleCategorySubmit = () => {
  setHasSubmittedCategory(true);
}
const handleSubmit = () => {
  setHasSubmittedProduct(true);
}
  return (
    
   <DashboardLayout>
      <div className="text-gray-800 bg-white rounded-xl w-full h-full p-3 text-theme-md font-medium">
        <div>
        <Dialog open={open} onClose={setOpen}  className="relative z-5">
          <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"/>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel transition className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95">
              <form action={formAction} onSubmit={handleCategorySubmit} >
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-primary  sm:mx-0 sm:size-10">
                        <NewLabel aria-hidden="true" className="size-6 text-complementary" />
                      </div>
                      <div className=" w-full text-left ml-2">
                        <DialogTitle as="h1" className="text-base mt-2 font-semibold text-gray-900">
                          Create New Category
                        </DialogTitle>
                        <div className="mt-7 gap-5 flex flex-col">
                          <input type="text" id='category-name'name='category_name' placeholder='Category Name' className='w-full p-2 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent'/>
                          {state.errors?.category_name && ( <p className="text-red-500">{state.errors.category_name[0]} </p> )}
                          <textarea id='category-description' name='category_description' placeholder='Category Description' className='w-full p-2 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent'/>
                          {state.errors?.category_description && ( <p className="text-red-500">{state.errors.category_description[0]} </p> )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <SubmitButton/>
                    <button
                      type="button"
                      data-autofocus
                      onClick={() => setOpen(false)}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
              </form>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
        {/* {state?.success && <p className="text-green-600">{state.success}</p>} */}
      </div>
        <form action={FormAction} onSubmit={handleSubmit} className="" >
          <div className='flex items-center w-full justify-between'>
            <span className='flex gap-3'>
              <AddCard/>
              <h2>Add New Product</h2>
            </span>
            <span className='w-[23%] items-end justify-end flex'>
              <button type="submit" className='flex items-center gap-2 bg-tertiary text-white rounded-4xl p-3 text-center hover:bg-tertiary/70'>
                <Done/>
                Save Product
              </button>
            </span>             
          </div>
          <div className='w-full  mt-3 flex justify-between'>
            <span className='bg-gray-50 rounded-lg p-5'>
              <h2 className='text-lg mb-2'>General information</h2>
              <label htmlFor='name' className='text-sm mb-2 font-medium'>Product Name</label>
              <input type="text" id='name' name='name' placeholder='Product Name' className='w-full p-2 mb-2 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent'/>
              {prodState.errors?.prodName && ( <p className="text-red-500">{prodState.errors.prodName[0]} </p> )}
              <label htmlFor='description' className='text-sm font-medium' >Description</label>
              <textarea type="text" id='description' name='description' placeholder='Description' className='w-full p-2 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent'/>
              {prodState.errors?.prodDescription && ( <p className="text-red-500">{prodState.errors.prodDescription[0]} </p> )}
            </span>
            <span className='bg-gray-50 rounded-lg p-5 w-[45%]'>
              <h2 className='text-lg mb-2'>Upload Image</h2>
              <label htmlFor="dropzone-file-2" className="flex items-center justify-center w-full cursor-pointer">
                <div className="flex flex-col items-center justify-center w-full h-50 bg-neutral-secondary-medium border border-dashed border-default-strong rounded-base">
                  <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
                    <Upload size={80}/>
                    <p className="mb-2 text-sm">Click to upload or drag file</p>
                    <p className="text-xs mb-4">
                      Max. File Size: <span className="font-semibold">30MB</span>
                    </p>
                    <Button variant="text" label="Browse File" icon={<SearchIcon/>} onClick={() => document.getElementById("dropzone-file-2").click()}/>
                  </div>
                </div>
              </label>
              <input id="dropzone-file-2" name="files" type="file" multiple className="hidden"/>
              {prodState.errors?.prodImages && (<p className="text-red-500">{prodState.errors.prodImages[0]}</p>)}
            </span>
          </div>
          <div className='w-full h-[30%] mt-3 flex justify-between'>
            <span className='bg-gray-50 rounded-lg p-5 w-[51%]'>
              <h2 className='text-lg mb-2'>Pricing and Stock</h2>
              <div className='flex space-y-2 gap-4'>
                <div className='flex flex-col gap-2 w-full'>
                  <label htmlFor='price' className='text-sm font-medium'>Price</label>
                  <input type="number" id='price' name='price' placeholder='Price' className='w-full p-2 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent'/>
                  {prodState.errors?.prodPrice && ( <p className="text-red-500">{prodState.errors.prodPrice[0]} </p> )}
                </div>
                <div className='flex flex-col gap-2 w-full'>
                  <label htmlFor='stock' className='text-sm font-medium'>Stock Quantity</label>
                  <input type="number" id='stock' name='stock' placeholder='Stock Quantity' className='w-full p-2 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent'/>
                  {prodState.errors?.prodStock && ( <p className="text-red-500">{prodState.errors.prodStock[0]} </p> )}
                </div>
              </div>
              <div className='flex flex-col overflow-y-auto h-[45%] gap-2 scroll-auto w-full'>
              {customerTypes.map((type) => (
                <div key={type._id} className="flex items-center">
                  <label htmlFor='discount' className="w-40">{type.name}</label>
                  <input
                    type="number"
                    id="discount"
                    name={`${type._id}`}
                    placeholder="0"
                    className='w-full p-2 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent'
                  />
                </div>
              ))}
              </div>
            </span>
            <span className='bg-gray-50 rounded-lg p-5 w-[45%]'>
              <h2 className='text-lg mb-2'>Category</h2>
              {categories.length === 0 ? (
                <p className="text-gray-500">No categories found.</p>
              ) : (
                <div className="flex flex-col gap-2">
                  <select id='category' name='category' className='w-full p-2 mt-2 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent'>
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option value={category._id} key={category._id}>{category.name}</option> 
                    ))}
                  </select>
                  {prodState.errors?.prodCategory && ( <p className="text-red-500">{prodState.errors.prodCategory[0]} </p> )}
                  </div>
              )}
              <button type='button' className='bg-tertiary text-white rounded-4xl p-3 mt-6 text-center hover:bg-tertiary/70' onClick={() => setOpen(true)}>
              Add Category
            </button>
            </span>
          </div>   
        </form>
      </div> 
   </DashboardLayout>
  )
}

export default Products
