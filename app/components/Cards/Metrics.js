"use client";
import {ArrowCircleDown, ArrowCircleUp } from "@mui/icons-material";
import React from "react";


export const EcommerceMetrics = ({title,value,percentage,status,icon,cardLabel}) => {
      const isMain = cardLabel === "main";
  return (
      <div className={`rounded-2xl border border-gray-200 p-5 dark:border-gray-800 dark:bg-white/3 md:p-6 ${isMain ? "bg-tertiary/60 text-white" : "bg-white"}`}>
        <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${isMain ? "bg-white/20 text-white" : "bg-gray-100 dark:bg-gray-800"}`}>
         {icon}
        </div>


        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm dark:text-gray-400">
              {title}
            </span>
            <h4 className="mt-2 font-bold text-title-sm dark:text-white/90">
              {value}
            </h4>
          </div>
          <div className={`flex items-center gap-1 ${status === "increase" ? "text-success-500" : "text-error-500"}`}>
            {status === "increase" ? (
              <ArrowCircleUp className="size-5" />
            ) : status === "decrease" ? (
              <ArrowCircleDown className="size-5" />
            ) : null}
            {percentage}
          </div>
         
        </div>
      </div>
  );
};
