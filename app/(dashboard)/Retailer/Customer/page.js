'use client'
import Button from '@/app/Components/Button/Button'
import React,{useActionState, useState,useEffect} from 'react'
import { createCustomerType } from '@/app/API/action'
import Image from 'next/image'
import DashboardLayout from '../../Cashier/DashboardLayout'
import { NewLabel } from '@mui/icons-material'
import SubmitButton from '@/app/Components/Button/SubmitButton';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import Swal from 'sweetalert2'
import { getCustomers } from '@/app/_Services/customerService'

export default function Customer() {
const [customerTypes, setCustomerTypes] = useState([]);
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
  
  fetchCustomerTypes();
}, [])
const initialState = {
    success:'',
    errors: {
        name: [],
        description: [],
    }
};

const [open, setOpen] = useState(false)
const [state, formAction] = useActionState(createCustomerType,initialState);

const handleCustomerSubmit = async(e) => {
 e.preventDefault();
 const formData = new FormData(e.target);
 
 const result = await createCustomerType(state, formData);
     if(result?.success){
        setOpen(false);
        Swal.fire({
            title: "Customer Type Created!",
            text: "Your customer type has been created successfully!",
            icon: "success",
            confirmButtonText: "OK"
        });
        } else {
        Swal.fire({
            title: "Error!",
            text: "There was an error creating the customer type.",
            icon: "error",
            confirmButtonText: "OK"
        });
    }
}

  return (
  <DashboardLayout>
    <div className='bg-white scrollbar-hide h-full overflow-hidden flex flex-col'>
        <Dialog open={open} onClose={setOpen} className="relative z-5">
            <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"/>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <DialogPanel transition className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95">
                <form onSubmit={handleCustomerSubmit} >
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-primary  sm:mx-0 sm:size-10">
                        <NewLabel aria-hidden="true" className="size-6 text-complementary" />
                        </div>
                        <div className=" w-full text-left ml-2">
                        <DialogTitle as="h1" className="text-base mt-2 font-semibold text-gray-900">
                            Create New Customer Type
                        </DialogTitle>
                        <div className="mt-7 gap-5 flex flex-col">
                            <input type="text" id='name' name='customer_name' placeholder='Customer Type Name' className='w-full p-2 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent'/>
                            {state.errors?.name && ( <p className="text-red-500">{state.errors.name[0]} </p> )}
                            <textarea id='description' name='customer_description' placeholder='Customer Description' className='w-full p-2 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent'/>
                            {state.errors?.description && ( <p className="text-red-500">{state.errors.description[0]} </p> )}
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
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white  px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                        Cancel
                    </button>
                    </div>
                </form>
                </DialogPanel>
            </div>
            </div>
        </Dialog>
        <span className='flex items-center justify-between p-3'>
            <h1 className='text-lg font-semibold mb-4'>All Types</h1>
            <Button variant="outline" className='mb-4' label="Add New Type" onClick={() => setOpen(true)}/>
        </span>
        <div className='flex rounded-t-2xl flex-1 overflow-y-auto scrollbar-hide border-gray-200 bg-primary/40 justify-start space-x-1.5 flex-wrap space-y-2 place-items-start p-3'>
           {customerTypes.length === 0 ? (
                <p className="text-gray-500">No customer types found.</p>
            ) : (
                customerTypes.map((type, index) => (
                    <div key={index} className="bg-neutral-primary-soft max-w-sm h-95 border border-gray-200 rounded-lg shadow-xl flex flex-col">
                        <Image className="rounded-t-lg" src="/walk-in.jpg" alt="Image description" width={450} height={300}/>
                        <div className="p-4 text-center flex-1 flex flex-col justify-between">
                            <h3 className="mb-2 text-lg font-semibold text-default">{type.name}</h3>
                            <p className="mt-2 text-sm text-default line-clamp-3">{type.description}</p> 
                        </div>
                    </div>
                 )))}
            
        </div>
    </div>
  </DashboardLayout>
  
  )
}
