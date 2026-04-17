'use client'
import React, { useEffect,useState } from "react";
import DashboardLayout from "../DashboardLayout";
import axios from "axios";



export default function Products(){
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const url = 'http://127.0.0.1:5000/product/get';
            const options = {
                headers: {
                'Content-Type': 'application/json',
                },
            };
            try {
            const response = await axios.get(url, options);
            console.log('Products response:', response.data);
            setProducts(response.data.data);  
            console.log(products.files);
            } catch (error) {
                console.error('Error fetching products:', error);
                console.error('Error details:', {
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message
                });
            }
        }
    fetchProducts();
    },[setProducts]);
    return (
        <DashboardLayout>
            <div className="bg-white">
                <div className="mx-auto max-w-full p-4 ">
                    <h2 className="text-xl font-bold tracking-tight text-gray-900">Available Products</h2>
                    <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product._id} className="group relative">
                        <img  alt="product image" src={product.files[0]?.url} className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-70"/>
                        <div className="mt-2 flex flex-wrap justify-between">
                            <div className="">
                                <h3 className="text-md font-semibold text-gray-700">
                                    <span  className="absolute text-lg font-bold inset-0" />
                                    {product.name}
                                </h3>
                                <p className="text-base text-gray-700">{product.stock}</p>
                                
                            </div>
                            <p className="text-sm font-medium text-gray-900">{product.price}</p>
                        </div>
                        </div>
                        
                    ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
        
    )
}