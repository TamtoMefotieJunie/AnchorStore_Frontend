"use client";
import React, { useEffect, useState, useCallback,useEffectEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "@components/dashboard/SidebarContext";

import {
  Dashboard as DashboardIcon,
  Store as StoreIcon,
  Inventory as InventoryIcon,
  CalendarToday as CalendarIcon,
  Receipt as ReceiptIcon,
  ReceiptLong as ReceiptLongIcon,
  AddShoppingCart as AddShoppingCartIcon,
  Notifications as NotificationIcon,
  Person as UserCircleIcon,
  Help as HelpIcon,
  Logout as LogoutIcon,
  MoreHoriz as HorizontalDotsIcon,
  Warehouse as WarehouseIcon,
  Assessment as AssessmentIcon,
  ShoppingCart as ShoppingCartIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

const customerNavItems = [
  { icon: <DashboardIcon />, name: "Dashboard", path: "/Customer" },
  { icon: <StoreIcon />, name: "Points of Sale", path: "/customer/pos-locations" },
  { icon: <InventoryIcon />, name: "Products", path: "/customer/products" },
  { icon: <CalendarIcon />, name: "Arrival Dates", path: "/customer/arrivals" },
  { icon: <ReceiptIcon />, name: "Invoices", path: "/customer/invoices" },
  { icon: <NotificationIcon />, name: "Notifications", path: "/customer/notifications" },
];

const cashierNavItems = [
  { icon: <DashboardIcon />, name: "Dashboard", path: "/Cashier" },
  { icon: <AddShoppingCartIcon />, name: "New Sales", path: "/Cashier/Sales" },
  { icon: <ReceiptLongIcon />, name: "Recent Invoices", path: "/Cashier/Invoices" },
  { icon: <InventoryIcon />, name: "Products", path: "/Cashier/products" },
];

const managerNavItems = [
  { icon: <DashboardIcon />, name: "Dashboard", path: "/Retailer" },
  { icon: <CalendarIcon />, name: "Different products", path: "/Retailer/Products" },
  { icon: <AssessmentIcon />, name: "Stock Verification", path: "/Retailer/Stock" },
  { icon: <ShoppingCartIcon />, name: "Restock Requests", path: "/Retailer/Restock" },
  { icon: <ReceiptIcon />, name: "Sales Reports", path: "/Retailer/Reports" },
  
];

const secondaryItems = [
  { icon: <HelpIcon />, name: "Help Center", path: "/help" },
  { icon: <UserCircleIcon />, name: "Profile", path: "/profile" },
  { icon: <LogoutIcon />, name: "Logout", path: "/logout" },
];

const AppSidebar = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const updateUserRole = useEffectEvent((role) => {
    setUserRole(role);
  });
  const updateUserEmail = useEffectEvent((email) => {
    setUserEmail(email);
  });

  const updateLoadingState = useEffectEvent((loading) => {
    setIsLoading(loading);
  });
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('anchorStoreUser'));
    const role = storedUser?.role?.toLowerCase() || 'customer';
    
    updateUserRole(role);
    updateUserEmail(storedUser?.email || null);
    updateLoadingState(false);
  }, []);

  const getNavItems = () => {
    switch (userRole) {
      case 'manager':
        return managerNavItems;
      case 'cashier':
        return cashierNavItems;
      case 'customer':
      default:
        return customerNavItems;
    }
  };

  const isActive = useCallback((path) => path === pathname, [pathname]);

  const renderMenuItems = (items) => (
    <ul className="flex flex-col gap-4">
      {items.map((item) => (
        <li key={item.path}>
          <Link
            href={item.path}
            className={`menu-item group ${
              isActive(item.path) ? "menu-item-active" : "menu-item-inactive"
            }`}
          >
            <span className={isActive(item.path) ? "menu-item-icon-active" : "menu-item-icon-inactive"}>
              {item.icon}
            </span>
            {(isExpanded || isHovered || isMobileOpen) && (
              <span className="menu-item-text">{item.name}</span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );

  if (isLoading) {
    return (
      <aside className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 ${isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"} ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </aside>
    );
  }

  const currentNavItems = getNavItems();

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-center h-[10%] mb-6 border-b border-gray-200 dark:border-gray-700">
        <Image
          className="block dark:hidden" 
          src="/logo.png" 
          alt="anchorStore Logo"
          width={200}
          height={20}
          priority
        />
        <Image
          className="hidden dark:block" 
          src="/logo.png" 
          alt="anchorStore Logo"
          width={200}
          height={20}
          priority
        />
      </div>
      
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className={`mb-2 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
                {(isExpanded || isHovered || isMobileOpen) ? "Main Menu" : <HorizontalDotsIcon />}
              </h2>
              {renderMenuItems(currentNavItems)}
            </div>
            
            <div className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
              <h2 className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
                {(isExpanded || isHovered || isMobileOpen) ? "Account" : <HorizontalDotsIcon />}
              </h2>
              {renderMenuItems(secondaryItems)}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;