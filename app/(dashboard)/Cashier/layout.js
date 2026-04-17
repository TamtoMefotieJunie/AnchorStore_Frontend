import React from "react";
import { SidebarProvider } from "@/app/Components/dashboard/SidebarContext";
import { ThemeProvider } from "@/app/Components/dashboard/ThemeContext";
import LayoutContent from "@/app/(dashboard)/Cashier/DashboardLayout";

export default function AdminLayout({ children }) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        {children}
      </SidebarProvider>
    </ThemeProvider>
  );
}