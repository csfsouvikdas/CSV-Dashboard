'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { MoreVertical, Maximize2, RefreshCw } from 'lucide-react';
import { ChartType } from '@/lib/charts/autoLayout';
import { cn } from '@/lib/utils';

interface ChartCardProps {
  title: string;
  type: ChartType;
  children: React.ReactNode;
  className?: string;
  onTypeChange?: (type: ChartType) => void;
}

export function ChartCard({ title, type, children, className, onTypeChange }: ChartCardProps) {
  return (
    <Card className={cn("overflow-hidden flex flex-col h-full group", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 border-b border-gray-50 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-sm font-bold truncate max-w-[200px]">
            {title}
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#185FA5]" />
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">{type}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-400">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-400">
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-400">
            <MoreVertical className="w-3.5 h-3.5" />
          </button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-4 pt-6 min-h-[250px] relative">
        {children}
      </CardContent>
    </Card>
  );
}
