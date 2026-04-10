'use client';

import React from 'react';
import { ChartConfig } from '@/lib/charts/autoLayout';
import { BarChart } from '@/components/charts/BarChart';
import { LineChart } from '@/components/charts/LineChart';
import { PieChart } from '@/components/charts/PieChart';
import { ScatterChart } from '@/components/charts/ScatterChart';
import { useDashboardStore } from '@/store/dashboardStore';

interface ChartPanelProps {
  config: ChartConfig;
}

export function ChartPanel({ config }: ChartPanelProps) {
  const { data } = useDashboardStore();

  if (!data) return null;

  const renderChart = () => {
    switch (config.type) {
      case 'bar':
        return <BarChart data={data.rows} xCol={config.xCol} yCol={config.yCol} />;
      case 'line':
        return <LineChart data={data.rows} xCol={config.xCol} yCol={config.yCol} />;
      case 'pie':
        return <PieChart data={data.rows} xCol={config.xCol} />;
      case 'scatter':
        return <ScatterChart data={data.rows} xCol={config.xCol} yCol={config.yCol} />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-gray-400 italic text-sm">
            {config.type} chart logic coming soon.
          </div>
        );
    }
  };

  return renderChart();
}
