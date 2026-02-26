"use client";

import React from "react";
import { useSidebar } from "@components/dashboard/SidebarContext";
import AppHeader from "@components/Bars/AppHeader";
import AppSidebar from "@components/Bars/AppSidebar";
import Backdrop from "@components/dashboard/Backdrop";

export default function DashboardLayout({ children }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen bg-gray-100 xl:flex">
      <AppSidebar />
      <Backdrop />

      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}