'use client'
import PageHeading from '@/app/components/Header/PageHeading'
import React,{useState} from 'react'
import {Table,TableBody,TableCell,TableHeader,TableRow,} from "@components/ui/table";
import { MoreHoriz } from '@mui/icons-material';
import { ChevronDownIcon } from 'lucide-react';

function Stock() {
  const initialInventory = [
  {
    id: 1,
    productName: "Macbook Pro M1 Pro 14\" 512GB",
    sku: "MAC-09485",
    category: "Electronic",
    supplier: "Urban Deals",
    image:"/product_03.jpg",
    currentStock: 20,
    stockStatus: "Low",
    unitPrice: 1200
  },
  {
    id: 2,
    productName: "Apple 32\" Pro Display XDR Retina",
    sku: "DIS-09484",
    category: "Electronic",
    supplier: "DealZone",
    image:"/product_03.jpg",
    currentStock: 100,
    stockStatus: "High",
    unitPrice: 1600
  },
  {
    id: 3,
    productName: "Macbook Pro M1 2020 13\" 512GB",
    sku: "MAC-0943",
    category: "Electronic",
    supplier: "BuyRight",
    image:"/product_03.jpg",
    currentStock: 40,
    stockStatus: "Low",
    unitPrice: 1100
  },
  {
    id: 4,
    productName: "Monitor MSI 27\" Modern MD27",
    sku: "MSI-09482",
    category: "Electronic",
    image:"/product_03.jpg",
    supplier: "Trendline - Pakuwon",
    currentStock: 210,
    stockStatus: "High",
    unitPrice: 280
  },
  {
    id: 5,
    productName: "Macbook Pro M1 Pro 14\" 512GB",
    sku: "MAC-09481",
    category: "Electronic",
    image:"/product_03.jpg",
    supplier: "iBox Indonesia - Pakuwon",
    currentStock: 180,
    stockStatus: "High",
    unitPrice: 380
  },
  {
    id: 6,
    productName: "Monitor MSI 27\" Modern MD27",
    sku: "MSI-09480",
    category: "Electronic",
    image:"/product_03.jpg",
    supplier: "MetroShop",
    currentStock: 70,
    stockStatus: "Low",
    unitPrice: 110
  },
  {
    id: 7,
    productName: "Macbook Air M1 2020 13\" 256GB",
    sku: "MAC-09479",
    category: "Electronic",
    supplier: "Urban Deals - Central Park",
    currentStock: 240,
    image:"/product_03.jpg",
    stockStatus: "High",
    unitPrice: 1300
  },
  {
    id: 8,
    productName: "Apple 32\" Pro Display XDR Retina",
    sku: "DIS-09478",
    category: "Electronic",
    supplier: "Urban Deals - Ambarrukmo Plaza",
    currentStock: 220,
    image:"/product_03.jpg",
    stockStatus: "High",
    unitPrice: 1600
  },
  {
    id: 9,
    productName: "Dell XPS 9320 Plus Laptop 13\"",
    sku: "DEL-09477",
    category: "Electronic",
    supplier: "Urban Deals - Surabaya",
    currentStock: 0,
    image:"/product_03.jpg",
    stockStatus: "Out",
    unitPrice: 2200
  },
  {
    id: 10,
    productName: "Dell XPS 9520 Laptop 15\"",
    sku: "DEL-09476",
    category: "Electronic",
    supplier: "ShopEase",
    currentStock: 0,
    image:"/product_03.jpg",
    stockStatus: "Out",
    unitPrice: 1700
  },
  {
    id: 11,
    productName: "Acer Aspire Vero AV16-51P 16\"",
    sku: "ACE-09475",
    category: "Electronic",
    supplier: "Trendline - Pakuwon",
    currentStock: 30,
    image:"/product_03.jpg",
    stockStatus: "Low",
    unitPrice: 1300
  },
  {
    id: 12,
    productName: "Acer Aspire 5 Spin 14\"",
    sku: "ACE-09474",
    image:"/product_03.jpg",
    category: "Electronic",
    supplier: "Trendline - Gejayan",
    currentStock: 200,
    stockStatus: "High",
    unitPrice: 1400
  }
];
const [openRowId, setOpenRowId] = useState(null);

const handleStatusChange = (id) => {
  setOpenRowId(openRowId === id ? null : id);
};
  return (
    <>
      <PageHeading
      title="Stock Overview"
      description="Monitor your inventory levels, track stock movements, and ensure you have the right products available to meet customer demand."    
      />
      <div className='flex items-center bg-white p-5 rounded-xl justify-between mb-4'>
        <div className='shadow-xl w-[25%] text-center bg-white p-4 rounded-md dark:bg-gray-700'>
          <h2 className='text-lg text-gray-900 dark:text-gray-100'>Current Stock Levels</h2>
          <h4 className='order-first text-3xl font-semibold tracking-tight text-gray-900'>11 200</h4>
        </div>
        <div className='shadow-xl rounded-md bg-white text-center p-4 w-[25%]'>
          <h2 className='text-lg text-gray-900 dark:text-gray-100'>Total sales Product</h2>
          <h4 className='order-first text-3xl font-semibold tracking-tight text-gray-900'>09 107</h4>
        </div>
        <div className='shadow-xl rounded-md  bg-white text-center p-4 w-[25%]'>
          <h2 className='text-lg text-gray-900 dark:text-gray-100'>available stock</h2>
          <h4 className='order-first text-3xl font-semibold tracking-tight text-gray-900'>1 997</h4>
        </div>
      </div>
      <div className='bg-white rounded-lg h-[30%] p-4 dark:bg-gray-800'>
        <div className='mb-3'>
          <span className='text-sm  w-[40%] rounded-md flex items-center justify-between mt-4'>
            <select id='duration' name='duration' className='w-[40%] h-full border-gray-400 border rounded-lg p-1 bg-transparent focus:outline-none '>
              <option value = "">Choose a period</option>
              <option value="last7days">Last 7 days</option>
              <option value="last30days">Last 30 days</option>
              <option value="last90days">Last 90 days</option>
            </select>
          </span>
        </div>
        <Table >                 
          <TableHeader className="items-center justify-items-start w-full bg-gray-100/50 dark:border-gray-800 ">
            <TableRow className="p-2" >
              <TableCell className="py-3 items-center justify-start flex text-gray-50 text-theme-sm dark:text-gray-400">
               Product Name
              </TableCell>
              <TableCell className="py-3 text-gray-100 text-center text-theme-sm dark:text-gray-400">
              ID Number
              </TableCell>
              <TableCell className="py-3 text-gray-100 text-center text-theme-sm dark:text-gray-400">
                Category
              </TableCell>
              <TableCell className="py-3 text-gray-100 text-center text-theme-sm dark:text-gray-400">
                Supplier
              </TableCell>
              <TableCell className="py-3 text-gray-100 text-center text-theme-sm dark:text-gray-400">
                Current Stock
              </TableCell>
              <TableCell className="py-3 text-gray-100 text-center text-theme-sm dark:text-gray-400">   
                unitPrice
              </TableCell>
              <TableCell className="py-3 text-gray-100 text-center text-theme-sm dark:text-gray-400">
                Action
              </TableCell>
            </TableRow>
          </TableHeader>     
          <TableBody className="divide-y divide-gray-50  dark:divide-gray-800">
            {initialInventory.map((inventory) => (
            <TableRow key={inventory.id} className="">
              <TableCell className="py-3">
                <div className="flex items-center gap-3">
                  <img src={inventory.image} alt={inventory.productName} className="w-10 h-10 rounded-md object-cover" />
                  <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {inventory.productName}
                  </span>
                </div>
              </TableCell>
              <TableCell className="py-3 text-gray-100 text-theme-sm text-center dark:text-gray-400">
                {inventory.sku}
              </TableCell>
                 
              <TableCell className="py-3 text-gray-100 text-theme-sm text-center dark:text-gray-400">
                {inventory.category}
              </TableCell>
              <TableCell className="py-3 text-gray-100 text-theme-sm text-center dark:text-gray-400">
                {inventory.supplier}
              </TableCell>
              <TableCell className="py-3 text-gray-100  text-theme-sm text-center dark:text-gray-400">
                <div className="rounded-full px-3 py-1 text-center text-theme-md dark:text-white/90">
                  {inventory.currentStock} - {inventory.stockStatus}
                </div>
               <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={` h-2 rounded-full ${inventory.stockStatus === "High" ? "w-3/4 bg-success-300" : inventory.stockStatus === "Low" ? "bg-warning-300 w-1/2" : "bg-error-500 w-1/4"}`}>
                  </div>
                </div>
                </TableCell>
                <TableCell className="py-3 text-gray-100 text-theme-sm text-center dark:text-gray-400">
                    {inventory.unitPrice}
                </TableCell>
                <TableCell key={inventory.id} className="py-3 text-gray-100 text-theme-sm text-center dark:text-gray-400">
                <div className="relative inline-block">
                  <MoreHoriz
                    className="cursor-pointer"
                    onClick={() => handleStatusChange(inventory.id)}
                    
                  />
                  {openRowId === inventory.id && (
                    <div  className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-600">
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-sm text-gray-800 dark:text-gray-200">
                        Audit Stock
                      </button>
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-sm text-gray-800 dark:text-gray-200">
                        create Stock Alert
                      </button>
                     
                    </div>
                  )}
                </div>
                </TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      
      </div>
    </>
  )
}

export default Stock