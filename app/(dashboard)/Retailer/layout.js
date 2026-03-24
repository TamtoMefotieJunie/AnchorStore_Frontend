import React from "react";
import { SidebarProvider } from "@components/dashboard/SidebarContext";
import { ThemeProvider } from "@components/dashboard/ThemeContext";

export default function AdminLayout({ children }) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        {children}
      </SidebarProvider>
    </ThemeProvider>
  );
}