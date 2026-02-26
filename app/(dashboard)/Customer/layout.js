import React from "react";
import { SidebarProvider } from "@components/dashboard/SidebarContext";
import { ThemeProvider } from "@components/dashboard/ThemeContext";
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