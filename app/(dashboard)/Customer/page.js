import { EcommerceMetrics } from "@/app/Components/Cards/Metrics";
import React from "react";
import StatisticsChart from "@/app/Components/Cards/StatisticsChart";
import RecentOrders from "@/app/Components/Cards/RecentOrders";

export default function CustomerDashboard() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-4">
      <div className="col-span-12 space-y-4 xl:col-span-7">
        <EcommerceMetrics />
        <StatisticsChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <RecentOrders />
        
      </div>

      <div className="col-span-12">
        {/* <MonthlySalesChart /> */}
      </div>

      <div className="col-span-12 xl:col-span-5">
        {/* <DemographicCard /> */}
      </div>

      <div className="col-span-12 xl:col-span-7">
          {/* <MonthlyTarget /> */}
      </div>
    </div>
  );
}