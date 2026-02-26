"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

import {
  BarChart as BarChartIcon,
  DateRange as DateRangeIcon,
  ShoppingCart,
  VisibilityOutlined
} from "@mui/icons-material";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function StatisticsChart() {
  const datePickerRef = useRef(null);

  
  const series = [
    {
      name: "Revenue",   
      data: [4500, 5200, 4800, 6000, 7500, 8200] 
    },
    {
      name: "Orders",
      data: [4525, 522, 5748, 7860, 775, 2782]
    }
  ];

  useEffect(() => {
    
  
  }, []);

  const options = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["primary", "complementary"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width:3,
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.25,
        opacityTo: 0.15,
      },
    },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      x: {
        format: "dd MMM yyyy",
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: "primary",
        },
      },
      title: {
        text: "",
        style: {
          fontSize: "0px",
        },
      },
    },
  };


  return (
    <div className="rounded-2xl border w-[98%] border-gray-200 bg-white  dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Revenue analytics
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Product Management and purchase Statistics
          </p>
        </div>
        <div className="flex items-center gap-3 sm:justify-end">
          <BarChartIcon className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 cursor-pointer" />
          
          <div className="relative inline-flex items-center">
            <DateRangeIcon 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-3 lg:top-1/2 lg:translate-x-0 lg:-translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none z-10 w-5 h-5" 
            />
            <input
              ref={datePickerRef}
              className="w-45 h-auto pl-10 pr-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-transparent lg:text-gray-700 outline-none dark:border-gray-700 dark:bg-gray-800 dark:lg:text-gray-300 cursor-pointer"
              placeholder="Select date range"
            />
          </div>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          <Chart options={options} series={series} type="area" height={280} />
        </div>
      </div>
    </div>
  );
}