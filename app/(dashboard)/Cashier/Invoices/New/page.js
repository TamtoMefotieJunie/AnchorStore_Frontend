"use client"

import PageHeading from '@/app/components/Header/PageHeading'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import React from 'react'
import Image from 'next/image';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@/app/components/Button/Button';
import { DownloadForOffline } from '@mui/icons-material';

export default function NewInvoice() {

  function createData(Product, UnitPrice, Quantity, Total) {
  return { Product, UnitPrice, Quantity, Total};
}
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 9365),
  createData('Ice cream sandwich', 237, 9.0, 3780),
  createData('Cupcake', 305, 3.7, 6750)
]
    return (
      <div className='bg-white h-full p-4 rounded-md'>
        <PageHeading
        title="Create invoice"
        breadcrumb={[
          { label: "Sales", href: "/Cashier/Sales" },
          { label: "Generate Invoice" }
        ]}
        primaryButton={
          {
            label:"Send invoice",
            icon: ArrowOutwardIcon,
            onClick: () => console.log("send invoice")
          }
        }
        />
        <div className='h-full flex justify-center'>
          <div className='w-[40%] shadow-2xl rounded-lg p-4'>
            <div className="px-2 flex justify-between items-center">
              <span>
                <h3 className="text-base/7 font-semibold text-gray-900">Invoice</h3>
                <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Invoice Number INV-1296-000.</p>
              </span>
              <span>
                <Image src="/logo_store.png" width={55} height={35} alt='logo store'/>
              </span>
            </div>
            <div className="mt-2 px-2 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className=" py-3 flex  gap-5">
                  <dt className="text-sm w-[50%] text-gray-900">
                  Billed By:
                  <p className='font-medium'>AnchorStore <span className='font-normal'> <br/> 780 enterprise Avenue, Cameroon country</span> </p>
                  </dt>
                  <dd className=" text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                    Billed To:
                    <p className='font-medium'>Junie M. <span className='font-normal'> <br/> Walk-in Customer</span> </p>
                  </dd>
                </div>
                <div className="py-2 flex gap-5">
                  <dt className="text-sm/6 w-[50%] text-gray-900">
                    Date Issued:
                    <p className='font-medium'>February 09, 2026 </p>
                  </dt>
                  <dd className="text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                    Due date:
                    <p className='font-medium'>February 19, 2026 </p>
                  </dd>
                </div>    
                <div className="py-2 grid gap-2">
                  <dt className="text-sm text-gray-500">Invoice items</dt>
                  <dd className="">
                    <TableContainer component={Paper}>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow >
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Unit Price</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Total(FCFA)</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody className=''>
                          {rows.map((row) => (
                            <TableRow
                              key={row.Product}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                              <TableCell component="th" scope="row">
                                {row.Product}
                              </TableCell>
                              
                              <TableCell align="right">{row.UnitPrice}</TableCell>
                              <TableCell align="right">{row.Quantity}</TableCell>
                              <TableCell align="right">{row.Total}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <div className="text-secondary flex flex-col justify-between mt-2 p-1 rounded-base ">
                      <div className='mb-2 text-theme-sm font-bold flex justify-between items-center'>
                        SubTotal :<span className="font-semibold">25 000 FCFA</span>
                      </div>
                      <div className='mb-2 text-theme-sm font-bold flex justify-between items-center'>
                        Discount : <span className="font-semibold">5 %</span>
                      </div>
                      <div className='mb-2 text-theme-sm font-bold flex justify-between items-center'>
                        Total : <span className="font-semibold">23 250 FCFA</span>
                      </div>
                  </div>
             
                  </dd>
                </div>
                 <div className="py-2 flex gap-5">
                  <dt className="text-sm w-[65%] text-gray-900">
                    <p className='font-medium'>AnchorStore Finance department </p>
                  </dt>
                  <dd className="text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <p className='font-medium'> +237 695 55 79 36 </p>
                  </dd>
                </div>
              </dl>
            </div>
            <div className='w-full justify-end flex'>
            <Button variant="outline" label="save"  />
            </div>
          </div>
          
        </div>
      </div>
    )
  
}
