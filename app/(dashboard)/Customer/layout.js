import React from "react";
import { SidebarProvider } from "@/app/Components/dashboard/SidebarContext";
import { ThemeProvider } from "@/app/Components/dashboard/ThemeContext";
import AdminLayoutContent from "@/app/(dashboard)/Customer/AdminLayoutContent";

export default function AdminLayout({ children }) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </SidebarProvider>
    </ThemeProvider>
  );
}