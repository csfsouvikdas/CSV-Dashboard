'use client';

import React from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { Button } from '@/components/ui/Button';
import { Upload, User, FileText, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { formatNumber } from '@/lib/utils';

export function Topbar() {
  const { data } = useDashboardStore();

  return (
    <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {data ? (
          <>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/10 flex items-center justify-center">
                <FileText className="w-4 h-4 text-[#185FA5]" />
              </div>
              <h1 className="font-semibold text-gray-900 dark:text-gray-100 max-w-[200px] truncate">
                {data.fileName}
              </h1>
            </div>
            <Badge variant="outline" className="hidden sm:flex border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
              {formatNumber(data.rowCount)} Rows
            </Badge>
          </>
        ) : (
          <h1 className="font-semibold text-gray-400">No file loaded</h1>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" className="hidden md:flex gap-2 border-gray-200 dark:border-gray-800">
          <Upload className="w-4 h-4" />
          <span>Quick Upload</span>
        </Button>
        
        <div className="h-4 w-[1px] bg-gray-200 dark:bg-gray-800 mx-2 hidden md:block" />
        
        <div className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 dark:hover:bg-gray-900 p-1 pr-3 rounded-full transition-colors duration-200">
          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-2 border-white dark:border-gray-900 shadow-sm overflow-hidden">
            <User className="w-4 h-4 text-gray-500" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-bold leading-none">Guest User</span>
            <span className="text-[10px] text-gray-400">Free Plan</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>
      </div>
    </header>
  );
}
