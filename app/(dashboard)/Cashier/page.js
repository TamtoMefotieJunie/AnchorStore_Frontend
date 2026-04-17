import { EcommerceMetrics } from "@/app/Components/Cards/Metrics";
import React from "react";
import StatisticsChart from "@/app/Components/Cards/StatisticsChart";
import RecentOrders from "@/app/Components/Cards/RecentOrders";
import DashboardLayout from "@/app/(dashboard)/Cashier/DashboardLayout";
import { StoreMallDirectoryOutlined,Payments, Sell } from "@mui/icons-material";

export default function CashierDashboard() {
  const metricsData = [
    { title: "Total Sales", value: "12,450", percentage: "12.5%", status: "increase",icon:<StoreMallDirectoryOutlined/> },
    { title: "Revenue", value: "8,920XAF", percentage: "8.3%", status: "increase", icon:<Payments/> },
    { title: "Orders", value: "5,359", percentage: "9.05%", status: "decrease",icon:<Sell/> },
  ];

  return (
    
    <DashboardLayout>
      <div className="space-y-4 space-x-5">
        <div className="grid grid-cols-3 gap-3">
          {metricsData.map((metric, index) => (
            <EcommerceMetrics
              key={index}
              title={metric.title}
              value={metric.value}
              percentage={metric.percentage}
              status={metric.status}
              icon={metric.icon}
            />
          ))}
        </div>
        
        <div>
          <StatisticsChart/>
        </div>
        
      </div>
   </DashboardLayout>
   
  );
 
}