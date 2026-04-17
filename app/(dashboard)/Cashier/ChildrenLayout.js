"use client";

import { useSidebar } from "@/app/Components/dashboard/SidebarContext";
import AppSidebar from "@/app/Components/Bars/AppSidebar";
import Backdrop from "@/app/Components/dashboard/Backdrop";

export default function ChildrenLayout({ children }) {
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
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          {children}
        </div>
      </div>
    </div>
  )
}
