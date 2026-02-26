'use client';
import { useSearchParams,usePathname,useRouter } from 'next/navigation';
import { SearchOutlined } from '@mui/icons-material';
import { useDebouncedCallback } from 'use-debounce';
 
export default function Search({ placeholder}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
        console.log(`Searching... ${term}`);
        const params = new URLSearchParams(searchParams);
        if (term) {
        params.set('query', term);
        } else {
        params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);
  

 
  return (
    <div className="relative w-[20%] flex">
      
      <input
        className="border-gray-50 border outline-1 focus-visible:outline-gray-400 block w-full rounded-md py-[9px] pl-10 text-sm  placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
         defaultValue={searchParams.get('query')?.toString()}
      />
      <SearchOutlined className="absolute left-3 top-1/2 h-[10%] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}