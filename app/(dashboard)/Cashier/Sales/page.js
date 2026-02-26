
'use client'
import { useState } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'
import PageHeading from "@/app/components/Header/PageHeading";
import { ArchiveBoxIcon, PrinterIcon } from '@heroicons/react/24/outline'
import { SearchCheck, Trash2Icon } from 'lucide-react'
import Search from '@/app/components/ui/search'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Edit } from '@mui/icons-material'
import { useRouter } from 'next/navigation'


const people = [
  {
    id: 1,
    name: 'Wade Cooper',
    avatar:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    name: 'Arlene Mccoy',
    avatar:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 3,
    name: 'Devon Webb',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
  },
  {
    id: 4,
    name: 'Tom Cook',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 5,
    name: 'Tanya Fox',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 6,
    name: 'Hellen Schmidt',
    avatar:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 7,
    name: 'Caroline Schultz',
    avatar:
      'https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 8,
    name: 'Mason Heaney',
    avatar:
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 9,
    name: 'Claudie Smitham',
    avatar:
      'https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 10,
    name: 'Emil Schaefer',
    avatar:
      'https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]
const customers = [
  {id: 1,name:'Walk-in Customer'},
  {id: 2,name:'Registered Customer'},
  {id: 3,name:'Wholesale Buyer'},
  {id: 4,name:'Employee Purchase'},
]
const warehouses = [
  { id: 1, name: "Main Sales Floor", code: "MSF" },
  { id: 2, name: "Backroom Stock", code: "BRS" },
  { id: 3, name: "Warehouse A", code: "WH-A" },
  { id: 4, name: "Warehouse B", code: "WH-B" },
];
function createData(Product, UnitPrice, Quantity, Total) {
  return { Product, UnitPrice, Quantity, Total};
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 9365),
  createData('Ice cream sandwich', 237, 9.0, 3780),
  createData('Eclair', 262, 16.0, 12000),
  createData('Cupcake', 305, 3.7, 6750, ),
  createData('Gingerbread', 356, 16.0, 3289),
];
export default function Sales() {
  const [selected, setSelected] = useState(people[3])
  const [warehouseSelected, setWarehouseSelected] = useState(warehouses[3])
  const [customerSelected, setCustomerSelected] = useState(customers[0])
const router = useRouter();
  return (  
    <>
    <PageHeading
        title="New Sales"
        description="Register sold items and generate invoice"
        secondaryButtons={[
        {
          label: "Save Draft",
          icon: ArchiveBoxIcon,
          onClick: () => console.log("Save draft"),
        },
        {
          label: "Clear",
          icon: Trash2Icon,
          onClick: () => console.log("Clear cart"),
        },
      ]}
      primaryButton={{
        label: "Generate Invoice",
        icon: PrinterIcon,
        onClick: () => router.push("./Invoices/New"),
      }}
      />
    
    <div className='bg-white p-4 rounded-lg'>
        <h4>Order Detail</h4>
        <form className="mx-auto bg-white flex flex-row items-center justify-between w-full">
            <Listbox value={customerSelected} onChange={setCustomerSelected}>
                <div className="relative  w-[30%] ">
                    <Label className="block text-sm/6 font-medium mb-2.5 text-gray-900">Customer</Label>
                    <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-secondary/40 sm:text-sm/6">
                    <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                        <span className="block truncate">{customerSelected.name}</span>
                    </span>
                    <ChevronUpDownIcon
                        aria-hidden="true"
                        className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                    </ListboxButton>

                    <ListboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-1 outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                    >
                    {customers.map((customer) => (
                        <ListboxOption
                        key={customer.id}
                        value={customer}
                        className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-secondary/40 data-focus:text-white data-focus:outline-hidden"
                        >
                        <div className="flex items-center">
                            <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">{customer.name}</span>
                        </div>

                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-secondary/40 group-not-data-selected:hidden group-data-focus:text-white">
                            <CheckIcon aria-hidden="true" className="size-5" />
                        </span>
                        </ListboxOption>
                    ))}
                    </ListboxOptions>
                </div>
            </Listbox>
            
            <Listbox value={warehouseSelected} onChange={setWarehouseSelected}>
                <div className="relative  w-[30%] ">
                    <Label className="block text-sm/6 font-medium mb-2.5 text-gray-900">From Warehouse</Label>
                    <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-secondary/40 sm:text-sm/6">
                    <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                        <span className="block truncate">{warehouseSelected.name}</span>
                    </span>
                    <ChevronUpDownIcon
                        aria-hidden="true"
                        className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                    </ListboxButton>

                    <ListboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-1 outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                    >
                    {warehouses.map((warehouse) => (
                        <ListboxOption
                        key={warehouse.id}
                        value={warehouse}
                        className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-secondary/40 data-focus:text-white data-focus:outline-hidden"
                        >
                        <div className="flex items-center">
                            <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">{warehouse.name}</span>
                        </div>

                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-secondary/40 group-not-data-selected:hidden group-data-focus:text-white">
                            <CheckIcon aria-hidden="true" className="size-5" />
                        </span>
                        </ListboxOption>
                    ))}
                    </ListboxOptions>
                </div>
            </Listbox>
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-2 w-[30%] ">
                    <Label className="block text-sm/6 font-medium mb-2.5 text-gray-900">Assigned to</Label>
                    <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-secondary/40 sm:text-sm/6">
                    <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                        <img alt="" src={selected.avatar} className="size-5 shrink-0 rounded-full bg-gray-100" />
                        <span className="block truncate">{selected.name}</span>
                    </span>
                    <ChevronUpDownIcon
                        aria-hidden="true"
                        className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                    </ListboxButton>

                    <ListboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-1 outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                    >
                    {people.map((person) => (
                        <ListboxOption
                        key={person.id}
                        value={person}
                        className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-secondary/40 data-focus:text-white data-focus:outline-hidden"
                        >
                        <div className="flex items-center">
                            <img alt="" src={person.avatar} className="size-5 shrink-0 rounded-full" />
                            <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">{person.name}</span>
                        </div>

                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-secondary/40 group-not-data-selected:hidden group-data-focus:text-white">
                            <CheckIcon aria-hidden="true" className="size-5" />
                        </span>
                        </ListboxOption>
                    ))}
                    </ListboxOptions>
                </div>
            </Listbox>
        </form>
        <div className='mx-auto bg-white h-full rounded-md'>
            <div className=' border-b border-gray-200 mt-5 p-2 bg-gray-100 rounded-xl'>
              <Search placeholder="Type to add products..." className="p-4 outline-none border-none"/>
              
            </div>
            <div className=''>
             <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow >
                      <TableCell>Product</TableCell>
                      <TableCell align="left">Unit Price</TableCell>
                      <TableCell align="left">Quantity</TableCell>
                      <TableCell align="left">Total(FCFA)</TableCell>
                      <TableCell align="center">Action</TableCell>
                      
                    </TableRow>
                  </TableHead>
                  <TableBody className='p-5'>
                    {rows.map((row) => (
                      <TableRow
                        key={row.Product}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                          {row.Product}
                        </TableCell>
                        
                        <TableCell align="left">{row.UnitPrice}</TableCell>
                        <TableCell align="left">{row.Quantity}</TableCell>
                        <TableCell align="left">{row.Total}</TableCell>
                        <TableCell align="left">
                          <div className="flex items-center justify-center gap-3 ">
                            <span className="cursor-pointer "><Trash2Icon style={{width:"20px"}}/></span>
                            <span className="text-secondary cursor-pointer"><Edit style={{width:"20px"}} /></span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
             <div className='flex justify-end'>
                <div className="bg-primary/60 text-secondary flex flex-col justify-between w-[30%] p-6 rounded-lg mt-3 self-end rounded-base shadow-xl">
                  <div className='mb-2 text-theme-lg font-bold flex justify-between items-center'>
                    SubTotal :<span className="font-semibold">25 000 FCFA</span>
                  </div>
                  <div className='mb-2 text-theme-lg font-bold flex justify-between items-center'>
                    Discount : <span className="font-semibold">5 %</span>
                  </div>
                  <div className='mb-2 text-theme-lg font-bold flex justify-between items-center'>
                    Total : <span className="font-semibold">23 250 FCFA</span>
                  </div>
              </div>
             </div>
            </div>   
                  
                
               
        </div>
    </div>
    </>
  )
}


