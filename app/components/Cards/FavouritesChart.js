"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import {
  TrendingUp as TrendingUpIcon,
  Visibility as VisibilityIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";

// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function TopProductsChart() {
  // Simulated data - replace with actual API call in production
  const [productsData, setProductsData] = useState({
    categories: ["Wireless Earbuds", "Smart Watch", "Laptop Bag", "Phone Case", "Power Bank"],
    views: [1250, 980, 750, 620, 540],
    purchases: [320, 280, 190, 150, 130],
  });

  const options: ApexOptions = {
    colors: ["#465fff", "#10b981"], // Blue for views, Green for purchases
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 280,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true, // ✅ Changed to horizontal
        barHeight: "70%",
        borderRadius: 4,
        borderRadiusApplication: "end",
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val}`,
      style: {
        fontSize: "12px",
        colors: ["#333"],
        fontWeight: 500,
      },
      offsetX: 10,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: productsData.categories,
      title: {
        text: "Count",
        style: {
          fontSize: "12px",
          fontWeight: 500,
          color: "#6b7280",
        },
      },
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
      title: {
        text: undefined,
      },
      labels: {
        style: {
          fontSize: "13px",
          fontWeight: 500,
          colors: "#374151",
        },
        maxWidth: 120,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
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
        formatter: (val: number) => `${val.toLocaleString()}`,
      },
      marker: {
        show: true,
      },
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: {
            height: 320,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const series = [
    {
      name: "Views",
      data: productsData.views,
      icon: <VisibilityIcon sx={{ fontSize: 16, mr: 0.5 }} />,
    },
    {
      name: "Purchases",
      data: productsData.purchases,
      icon: <ShoppingCartIcon sx={{ fontSize: 16, mr: 0.5 }} />,
    },
  ];

  // Simulate data loading (remove in production when using real API)
  useEffect(() => {
    const timer = setTimeout(() => {
      // This simulates fetching from backend
      setProductsData({
        categories: ["Wireless Earbuds", "Smart Watch", "Laptop Bag", "Phone Case", "Power Bank"],
        views: [1250, 980, 750, 620, 540],
        purchases: [320, 280, 190, 150, 130],
      });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 flex items-center gap-2">
            <TrendingUpIcon className="text-brand-500" />
            Top 5 Most Viewed Products
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Product engagement and purchase metrics
          </p>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[500px] xl:min-w-full">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={280}
          />
        </div>
      </div>

      {/* Legend with Material UI Icons */}
      <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="w-3 h-3 rounded-sm bg-brand-500" />
          <span>Views</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="w-3 h-3 rounded-sm bg-emerald-500" />
          <span>Purchases</span>
        </div>
      </div>
    </div>
  );
}