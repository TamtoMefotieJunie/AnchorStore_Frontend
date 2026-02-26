"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Dropdown } from "@components/Common/Dropdown";
import { DropdownItem } from "@components/Common/DropdownItem";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown(e) {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex mr-3 items-center text-gray-700 dark:text-gray-400"
      >
        <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
          <Image
            width={44}
            height={44}
            src="/doc.jpg"
            alt="User"
            style={{ width: "auto", height: "auto" }}
            className="h-full w-full object-cover"
          />
        </span>

        <span className="mr-1 font-medium text-theme-sm">Musharof</span>

        <svg
          className={`stroke-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-4 flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-lg"
      >
        <div>
          <span className="block font-medium text-gray-700">
            Musharof Chowdhury
          </span>
          <span className="block text-xs text-gray-500">
            randomuser@pimjo.com
          </span>
        </div>

        <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200">
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              href="/profile"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              Edit profile
            </DropdownItem>
          </li>

          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              href="/settings"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              Account settings
            </DropdownItem>
          </li>

          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              href="/support"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              Support
            </DropdownItem>
          </li>
        </ul>

        <Link
          href="/signin"
          className="flex items-center gap-3 px-3 py-2 mt-3 rounded-lg hover:bg-gray-100"
        >
          Sign out
        </Link>
      </Dropdown>
    </div>
  );
}