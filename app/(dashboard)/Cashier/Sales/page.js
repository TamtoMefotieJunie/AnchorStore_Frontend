
'use client'
import { useState,useEffect,useRef } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'
import PageHeading from "@/app/Components/Header/PageHeading";
import { ArchiveBoxIcon, PrinterIcon } from '@heroicons/react/24/outline'
import { SearchCheck, Trash2Icon } from 'lucide-react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useRouter } from 'next/navigation'

const customers = [
  {id: 1,name:'Walk-in Customer'},
  {id: 2,name:'Registered Customer'},
  {id: 3,name:'Wholesale Buyer'},
  {id: 4,name:'Employee Purchase'},
]

function createCartRow(product, quantity = 1) {
  return {
    id: product.id || Date.now(),
    name: product.name || product.Product || 'Unknown',
    unitPrice: product.price || product.UnitPrice || 0,
    quantity: quantity,
    total: (product.price || product.UnitPrice || 0) * quantity,
    sku: product.sku || ''
  };
}
export default function Sales() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
   const [cartItems, setCartItems] = useState([]);
  const [customerSelected, setCustomerSelected] = useState(customers[0])
  const [filteredProducts, setFilteredProducts] = useState([]);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('http://127.0.0.1:5000/product/get', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const productList = Array.isArray(data) ? data : (data.products || data.data || []);
        
        if (productList.length === 0) {
          setError('No products found in inventory');
        }
        setProducts(productList);
        setFilteredProducts(productList);
        console.log(productList)
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError(`Failed to load products: ${err.message}`);
      }
    };
    fetchProducts();
  }, []); 
    useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProducts(products);
      setIsDropdownOpen(products.length > 0);
      return;
    }
    const query = searchQuery.toLowerCase().trim();
    const filtered = products.filter(product => 
      product.name?.toLowerCase().includes(query) ||
      product.sku?.toLowerCase().includes(query) ||
      product.barcode?.toLowerCase().includes(query) ||
      product.category?.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
    setIsDropdownOpen(filtered.length > 0);
  }, [searchQuery, products]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target) && 
          dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const handleProductSelect = (product) => {
    const existingItem = cartItems.find(item => item.sku === product.sku);
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.sku === product.sku 
          ? { ...item, quantity: item.quantity, total: item.unitPrice * (item.quantity) }
          : item
      ));
    } else {
      setCartItems([...cartItems, createCartRow(product)]);
    }
    setSearchQuery('');
    setIsDropdownOpen(false);
  };
  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  const handleQuantityChange = (id, newQuantity) => {
    const qty = newQuantity;
    setCartItems(cartItems.map(item => 
      item.id === id 
        ? { ...item, quantity: qty, total: item.unitPrice * qty }
        : item
    ));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  const discount = 0; 
  const total = subtotal - discount;

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
        <form className="mx-auto bg-white flex flex-row items-center gap-4 w-full">
            <Listbox value={customerSelected} onChange={setCustomerSelected}>
              <Label className="block text-sm/6 font-medium mb-2.5 text-gray-900">Customer</Label>
              <div className="relative  w-[30%] ">
                  <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-secondary/40 sm:text-sm/6">
                  <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                      <span className="block truncate">{customerSelected.name}</span>
                  </span>
                  <ChevronUpDownIcon aria-hidden="true" className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"/>
                  </ListboxButton>
                  <ListboxOptions transition className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-1 outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm">
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
        </form>
        <div className='mx-auto bg-white h-full rounded-md'>
          <div className="relative mb-6" ref={searchRef}>
            <label className="block text-sm font-medium mb-1.5 text-gray-700">Add Products</label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsDropdownOpen(filteredProducts.length > 0)}
                placeholder="Search products by name, SKU, or barcode..."
                className="w-full rounded-md border border-gray-300 py-2.5 pl-4 pr-12 shadow-sm focus:border-secondary focus:ring-1 focus:ring-secondary sm:text-sm"
              />
              
          </div>
          {isDropdownOpen && filteredProducts.length > 0 && (
            <div 
              ref={dropdownRef}
              className="absolute z-20 mt-1 w-full rounded-md bg-white shadow-lg border border-gray-200 max-h-72 overflow-y-auto"
            >
              <div className="py-1">
                {filteredProducts.slice(0, 10).map((product) => (
                  <div
                    key={product.id || product.sku || product.name}
                    onClick={() => handleProductSelect(product)}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-secondary/10 cursor-pointer transition-colors"
                  >
                    <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                      {product.name?.charAt(0).toUpperCase() || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{product.name || product.Product}</p>
                      <div className="flex gap-3 mt-0.5">
                        {product.sku && (
                          <span className="text-xs text-gray-500">SKU: {product.sku}</span>
                        )}
                        {product.stock !== undefined && (
                          <span className={`text-xs ${
                            product.stock < 5 ? 'text-red-500' : 'text-green-600'
                          }`}>
                            Stock: {product.stock}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="font-medium text-gray-900">
                      {product.price?.toLocaleString('fr-FR') || product.UnitPrice?.toLocaleString('fr-FR') || '0'} FCFA
                    </span>
                  </div>
                ))}
                {filteredProducts.length > 10 && (
                  <div className="px-4 py-2 text-center text-sm text-gray-500 border-t border-gray-100">
                    +{filteredProducts.length - 10} more results
                  </div>
                )}
              </div>
            </div>
          )}
          {searchQuery.trim() && filteredProducts.length === 0 && (
            <div className="absolute z-20 mt-1 w-full rounded-md bg-white shadow-lg border border-gray-200 py-3 px-4 text-sm text-gray-500">
              No products found 
            </div>
          )}
          {error && !isLoading && (
            <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded-md">
              {error}
            </div>
          )}
        </div>
            <div className=''>
             <TableContainer component={Paper} className="shadow-sm">
          <Table sx={{ minWidth: 650 }} aria-label="cart table">
            <TableHead className="bg-gray-50">
              <TableRow>
                <TableCell className="font-semibold">Product</TableCell>
                <TableCell align="left" className="font-semibold">Unit Price (FCFA)</TableCell>
                <TableCell align="left" className="font-semibold">Quantity</TableCell>
                <TableCell align="left" className="font-semibold">Total (FCFA)</TableCell>
                <TableCell align="center" className="font-semibold">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" className="font-medium">
                    {item.name} {item.sku && <span className="text-gray-500 text-sm ml-1">({item.sku})</span>}
                  </TableCell>
                  <TableCell align="left">{item.unitPrice.toLocaleString('fr-FR')}</TableCell>
                  <TableCell align="left">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      className="w-16 rounded border border-gray-300 px-2 py-1 text-center"
                    />
                  </TableCell>
                  <TableCell align="left" className="font-medium">
                    {item.total.toLocaleString('fr-FR')}
                  </TableCell>
                  <TableCell align="center">
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2Icon style={{ width: "20px" }} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
              
              {/* EMPTY STATE */}
              {cartItems.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    Your cart is empty. Search for products above to add items.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
             <div className='flex justify-end'>
                <div className="bg-primary/60 text-secondary flex flex-col justify-between w-[30%] p-6 rounded-lg mt-3 self-end rounded-base shadow-xl">
                  <div className='mb-2 text-theme-lg font-bold flex justify-between items-center'>
                    SubTotal :<span className="font-semibold">{subtotal}</span>
                  </div>
                  <div className='mb-2 text-theme-lg font-bold flex justify-between items-center'>
                    Discount : <span className="font-semibold">{discount} %</span>
                  </div>
                  <div className='mb-2 text-theme-lg font-bold flex justify-between items-center'>
                    Total : <span className="font-semibold">{total}</span>
                  </div>
              </div>
             </div>
            </div>     
        </div>
    </div>
    </>
  )
}


