"use client";
import dynamic from "next/dynamic";
import {TrendingUp as TrendingUpIcon,Visibility as VisibilityIcon,ShoppingCart as ShoppingCartIcon,} from "@mui/icons-material";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function InventoryChart() {

  const series = [
    {
      name: "Healthy Stock",
      data: [155,270,140,190,145,130,260]
    },
    {
      name: "Low stock",
      data: [35,60,85,160,70,60,30]
    },
    {
      name: "Out of stock",
      data:[20,10,25,7,30,8,25],
    }
  ];

  const options = {
    colors: ["#dad3cb", "#967757", "#795645"], 
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        vertical: true, 
        barHeight: "70%",
        borderRadius: 4,
        borderRadiusApplication: "end",
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Electronics","Fashion","Sport","School","Office","Music"
      ],
     
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          fontSize: "12px",
          fontWeight: 400,
          colors: "#6b7280",
        },
      },
    },
    yaxis: {
      
      labels: {
        style: {
          fontSize: "13px",
          fontWeight: 500,
          colors: "#374151",
        },
       
      },
    },
    legend: {
      show: true,
      position: "top",
      verticalAlign: "right",
      fontFamily: "Outfit",
      fontSize: "13px",
      fontWeight: 500,
      markers: {
        radius: 4,
      },
      itemMargin: {
        horizontal: 15,
        vertical: 5,
      },
    },
    grid: {
      borderColor: "#e5e7eb",
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
      padding: {
        top: 0,
        right: 10,
        bottom: 0,
        left: 0,
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: "light",
      x: {
        show: false,
      },
      y: {
      },
      marker: {
        show: true,
      },
    },
    responsive: [
      {
        breakpoint: 680,
        options: {
          chart: {
            height: 350,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 flex items-center gap-2">
            <TrendingUpIcon className="text-brand-500" />
            Inventory Overview
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
           Stock Levels grouped by category
          </p>
        </div>
      </div>

      <div className="max-w-full overflow-x-hidden">
        <Chart options={options} series={series} type="bar" height={310} />
      </div>
      
    </div>
  );
}