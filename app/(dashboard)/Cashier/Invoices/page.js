"use client"
import Button from "@/app/components/Button/Button";
import { Autorenew, DownloadForOfflineOutlined, FilterAltRounded } from "@mui/icons-material";
import React from "react";
import {Table,TableBody,TableCell,TableHeader,TableRow,} from "@components/ui/table";
import Search from '@components/ui/search';
import { useSearchParams } from "next/navigation";
import UserDropdown from "@components/Header/UserDropdown";
// import { InvoicesTableSkeleton } from '@/app/ui/skeletons';


const stats = [
  { id: 1, name: 'Today\'s Sales', value: '15,248XFA', trend: '+12%', trendColor: 'text-green-500'},
  { id: 2, name: 'Transactions Today', value: '37', trend: '+5', trendColor: 'text-green-500'},
  { id: 3, name: 'Avg. Transaction', value: '2000XFA', trend: '+$2.10', trendColor: 'text-green-500'},
  { id: 4, name: 'Items Sold', value: '142', trend: '-8', trendColor: 'text-red-500'},
];
const tableData = [
  { id: "INV-2026-001", customer: "Alice Johnson", total: 8250, status: "paid", amountDue: 2000, date: "2026-01-30T14:22:00" },
  { id: "INV-2026-002", customer: "Bob Smith", total: 4200, status: "issued", amountDue: 4000, date: "2026-01-30T15:10:00" },
  { id: "INV-2026-003", customer: "Carol White", total: 1200, status: "paid", amountDue: 1550, date: "2026-01-30T16:45:00" },
  { id: "INV-2026-004", customer: "David Brown", total: 63000, status: "overdue", amountDue: 6350, date: "2026-01-29T11:30:00" },
  { id: "INV-2026-005", customer: "Eva Green", total: 3750, status: "draft", amountDue: 750, date: "2026-01-30T17:05:00" },
];

export default function Invoices() {
  
  return (
    <>
        <div className="bg-white rounded-lg flex items-center justify-between mb-2">
            <div className=" border-b py-3 px-7 border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
              <p className="text-sm text-gray-500 mt-1">Manage and track all invoices</p>
            </div>
            <UserDropdown />
        </div>
        <div className="bg-white p-4 h-full">
            <div className="justify-center self-center gap-2 p-4 border-b border-gray-300 items-center flex-col flex"> 
                <h2 className="text-theme-xl font-semibold">
                Invoices
                </h2>
                <h4>Last update a min ago <span><Autorenew/></span></h4>
                <Button variant="outline" label="Export as .csv" icon={<DownloadForOfflineOutlined/>}/>
            </div>
            <div className="border-b mb-2 border-gray-300 p-5 w-full ">
                <dl className="grid grid-cols-1 gap-x-8 gap-y-10 text-center lg:grid-cols-4">
                {stats.map((stat) => (
                    <div key={stat.id} className="mx-auto flex max-w-sm flex-col gap-y-4">
                    <dd className="text-lg text-gray-600">{stat.name}</dd>
                    <dt className=" text-2xl font-semibold tracking-tight text-gray-900 ">
                        {stat.value}
                    </dt>
                    </div>
                ))}
                </dl>
            </div>
            <div className="flex items-center justify-between gap-2 mt-4 mb-4">
                <button type="button" className=" flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"> 
                    <FilterAltRounded />
                    Filter
                </button>
                <Search placeholder="Search invoices..." />
            </div>
        
                <Table 
                // query={query} currentPage={currentPage}
                >
                    
                    <TableHeader className="items-center w-full bg-gray-100/50 dark:border-gray-800 ">
                        
                        <TableRow className="" >
                            <TableCell className="py-3 font-medium items-center justify-center flex text-gray-500 text-theme-sm dark:text-gray-400">
                                <div className="flex justify-end w-1/2 items-center gap-4">
                                    <input
                                        type="checkbox"
                                        // checked={selectedIds.includes(item.id)}
                                        // onChange={() => handleCheckboxChange(item.id)}
                                    />
                                    <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                        Invoice Number
                                    </p>
                                </div>
                            </TableCell>
                            <TableCell
                                className="py-3 font-medium text-gray-500 text-center text-theme-sm dark:text-gray-400">
                            Customer
                            </TableCell>
                            <TableCell
                                className="py-3 font-medium text-gray-500 text-center text-theme-sm dark:text-gray-400">
                                Total
                            </TableCell>
                            <TableCell
                                className="py-3 font-medium text-gray-500 text-center text-theme-sm dark:text-gray-400">
                                Status
                            </TableCell>
                            <TableCell
                                className="py-3 font-medium text-gray-500 text-center text-theme-sm dark:text-gray-400">
                                Amount Due
                            </TableCell>
                            <TableCell
                                className="py-3 font-medium text-gray-500 text-center text-theme-sm dark:text-gray-400">
                                Date
                            </TableCell>
                        </TableRow>
                    </TableHeader>
            
                    <TableBody className="divide-y divide-gray-50  dark:divide-gray-800">
                        {tableData.map((invoice) => (
                        <TableRow key={invoice.id} className="">
                            <TableCell className="py-3">
                            <div className="flex items-center gap-4 justify-center">
                                <input
                                    type="checkbox"
                                    // checked={selectedIds.includes(item.id)}
                                    // onChange={() => handleCheckboxChange(item.id)}
                                />
                                <p className="font-medium text-center text-gray-800 text-theme-sm dark:text-white/90">
                                    {invoice.id}
                                </p>
                            </div>
                            </TableCell>
                            <TableCell className="py-3 text-gray-500 text-theme-sm text-center dark:text-gray-400">
                                {invoice.customer}
                            </TableCell>
                                
                            <TableCell className="py-3 text-gray-500 text-theme-sm text-center dark:text-gray-400">
                            {invoice.total}
                            </TableCell>
                            <TableCell className="py-3 text-gray-500 text-theme-sm text-center dark:text-gray-400">
                            <div 
                                className={`inline-block rounded-full px-3 py-1 text-center text-theme-md font-medium dark:text-white/90"
                                ${
                                invoice.status === "paid"
                                    ? "bg-success-100 dark:bg-success-300 text-success-400"
                                    : invoice.status === "issued"
                                    ? "bg-warning-100 dark:bg-warning-300 text-warning-400"
                                    : invoice.status === "draft"
                                    ? "bg-gray-100 text-gary-400  dark:bg-info-300"
                                    : "bg-error-100 text-error-400 dark:bg-error-400"
                                }`}
                            >
                                {invoice.status}
                            </div>
                            </TableCell>
                            <TableCell className="py-3 text-gray-500 text-theme-sm text-center dark:text-gray-400">
                                {invoice.amountDue}
                            </TableCell>
                            <TableCell className="py-3 text-gray-500 text-theme-sm text-center dark:text-gray-400">
                            {new Date(invoice.date).toLocaleDateString()}
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
        
        
        <div className="mt-5 flex w-full justify-center">
            {/* <Pagination totalPages={totalPages} /> */}
        </div>
        </div>
    </> 
  )
}
