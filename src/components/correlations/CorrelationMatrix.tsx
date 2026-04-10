'use client';

import React, { useMemo } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { computeCorrelationMatrix } from '@/lib/correlation';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CorrelationMatrix() {
  const { data } = useDashboardStore();

  const numericCols = useMemo(() => {
    if (!data) return [];
    return Object.values(data.profiles)
      .filter(p => p.type === 'numeric')
      .map(p => p.name);
  }, [data]);

  const matrix = useMemo(() => {
    if (!data || numericCols.length === 0) return null;
    return computeCorrelationMatrix(data.rows, numericCols);
  }, [data, numericCols]);

  if (!data || numericCols.length === 0) return (
    <div className="flex items-center justify-center p-12 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
      <p className="text-gray-400">Need at least two numeric columns to compute correlations.</p>
    </div>
  );

  return (
    <div className="overflow-x-auto pb-4">
      <table className="border-collapse mx-auto">
        <thead>
          <tr>
            <th className="p-2"></th>
            {numericCols.map((col) => (
              <th key={col} className="p-2 text-[10px] font-bold uppercase text-gray-400 max-w-[80px] truncate" title={col}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {numericCols.map((rowCol) => (
            <tr key={rowCol}>
              <th className="p-2 text-[10px] font-bold uppercase text-gray-400 text-right pr-4 max-w-[100px] truncate" title={rowCol}>
                {rowCol}
              </th>
              {numericCols.map((col) => {
                const r = matrix?.[rowCol]?.[col] || 0;
                const absR = Math.abs(r);
                const isPositive = r > 0;
                const opacity = Math.max(0.1, absR);
                
                return (
                  <td 
                    key={col} 
                    className="p-1"
                  >
                    <div 
                      className={cn(
                        "w-12 h-12 flex flex-col items-center justify-center rounded-lg relative transition-transform hover:scale-105",
                        isPositive ? "bg-blue-500" : "bg-red-500"
                      )}
                      style={{ opacity }}
                    >
                      <span className={cn(
                        "text-[10px] font-bold",
                        absR > 0.4 ? "text-white" : "text-gray-900 dark:text-gray-100"
                      )}>
                        {r.toFixed(2)}
                      </span>
                      {absR > 0.7 && (
                        <Star className={cn(
                          "w-2.5 h-2.5 absolute top-1 right-1",
                          absR > 0.4 ? "fill-white text-white" : "fill-blue-500 text-blue-500"
                        )} />
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
