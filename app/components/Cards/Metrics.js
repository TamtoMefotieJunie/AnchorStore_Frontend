"use client";
import {ArrowCircleDown, ArrowCircleUp, GroupOutlined, LibraryAddCheck, ProductionQuantityLimits, StoreMallDirectoryTwoTone } from "@mui/icons-material";
import React from "react";


export const EcommerceMetrics = ({title,value,percentage,status,icon}) => {
  return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
         {icon}
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {title}
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {value}
            </h4>
          </div>
          <div className={`flex items-center gap-1 ${status === "increase" ? "text-success-500" : "text-error-500"}`}>
            {status === "increase" ? (
              <ArrowCircleUp className="size-5" />
            ) : (
              <ArrowCircleDown className="size-5" />
            )}
            {percentage}
          </div>
         
        </div>
      </div>
  );
};
