import { EcommerceMetrics } from "@/app/Components/Cards/Metrics";
import React from "react";
import InventoryChart from "@/app/Components/Cards/InventoryChart";
import DashboardLayout from "../Cashier/DashboardLayout";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Inventory2, PendingActions, Wallet } from "@mui/icons-material";
import RecentOrders from "@/app/Components/Cards/RecentOrders";

export default function CustomerDashboard() {
  return (
   <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <EcommerceMetrics title="Total Sales" value="12 000XAF" icon={<Wallet/>} cardLabel="main" />
        <EcommerceMetrics title="Total Products" value="67" icon={<Inventory2/>} />
        <EcommerceMetrics title="Low stock Products" value="45" icon={<TrendingDownIcon/>} />
        <EcommerceMetrics title="Products out of stock" value="123" icon={<PendingActions/>} />
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <InventoryChart />
        <RecentOrders/>
      </div>
   </DashboardLayout>
  );
}