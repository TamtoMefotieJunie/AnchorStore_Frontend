import React from "react";
import { SidebarProvider } from "@/app/Components/dashboard/SidebarContext";
import { ThemeProvider } from "@/app/Components/dashboard/ThemeContext";

export default function AdminLayout({ children }) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        {children}
      </SidebarProvider>
    </ThemeProvider>
  );
}