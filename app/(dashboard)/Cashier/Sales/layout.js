import React from "react";
import { SidebarProvider } from "@/app/Components/dashboard/SidebarContext";
import { ThemeProvider } from "@/app/Components/dashboard/ThemeContext";
import LayoutContent from "@/app/(dashboard)/Cashier/ChildrenLayout";
import ChildrenLayout from "@/app/(dashboard)/Cashier/ChildrenLayout";

export default function SalesLayout({ children }) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <ChildrenLayout>
          {children}
        </ChildrenLayout>
      </SidebarProvider>
    </ThemeProvider>
  );
}