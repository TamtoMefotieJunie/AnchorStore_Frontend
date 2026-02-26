"use client";
import {BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
} from '@heroicons/react/20/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import React from "react";
import Link from 'next/link';

export default function PageHeading({title,description,breadcrumb,metadata = [], primaryButton = null,secondaryButtons = []}) {
  return (

    <div className="lg:flex lg:items-center bg-white border-b mb-3 p-3 rounded-md lg:justify-between">
        <div className="min-w-0 flex-1">
            <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
            {title}
            </h2>
            {description? (
                <p className="mt-1 text-sm text-gray-600">
                    {description}
                </p>
                ) :
                <div className="flex items-center text-sm gap-2"> 
                    { breadcrumb.map((element,index) => ( 
                        element.href?(
                            <Link href={element.href} key={index}
                            className=" cursor-pointer hover:bg-primary p-2 text-gray-600 rounded-md transition-all duration-300">
                            {element.label}
                            <span> &gt; </span>
                            </Link>
                            ):
                            (<span key={index} className="font-medium text-gray-900">
                                {element.label}
                            </span>)
                        )
                    )
                    }
                </div>
            }
            <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6"> 
                {metadata.map((item,index) => (
                    <div key={index} className="mt-2 flex items-center text-sm text-gray-500">
                        {item.icon && <item.icon className="mr-1.5 size-5 shrink-0 text-gray-400" aria-hidden="true"/>}
                        {item.label}
                    </div>
                ))}
            </div>
       
    </div>
     <div className="mt-5 flex lg:mt-0 lg:ml-4">
            {secondaryButtons.map((btn, idx) => (
            <span key={idx} className={idx === 0 ? "" : "ml-3"}>
                <button
                type="button"
                onClick={btn.onClick}
                className={`inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 ${btn.className || ''}`}
                >
                {btn.icon && <btn.icon className= "mr-1.5 -ml-0.5 size-5 text-gray-400 aria-hidden:true"/>}
                {btn.label}
                </button>
            </span>
            ))}
            
            {primaryButton && (
                <button type="button" onClick={primaryButton.onClick} className="inline-flex items-center bg-complementary hover:bg-tertiary/80 ml-3 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"  
                    >
                        {primaryButton.icon && <primaryButton.icon
                        className="mr-1.5 -ml-2 size-5 aria-hidden:true"/>}
                        {primaryButton.label}
                    
                </button>
            
            )}
           
        </div>
    </div>
);
}