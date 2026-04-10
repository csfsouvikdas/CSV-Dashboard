'use client';

import React from 'react';
import {
  PieChart as RechartsPie,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend
} from 'recharts';
import { CHART_PALETTE } from '@/lib/charts/autoLayout';

interface PieChartProps {
  data: any[];
  xCol: string; // The categorical column
}

export function PieChart({ data, xCol }: PieChartProps) {
  const chartData = React.useMemo(() => {
    const counts: Record<string, number> = {};
    data.forEach(row => {
      const val = String(row[xCol]);
      counts[val] = (counts[val] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8); // Top 8
  }, [data, xCol]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPie>
        <Pie
          data={chartData}
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
          stroke="none"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={CHART_PALETTE[index % CHART_PALETTE.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ 
            borderRadius: '12px', 
            border: 'none', 
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
          }}
        />
        <Legend verticalAlign="bottom" height={36} iconType="circle" />
      </RechartsPie>
    </ResponsiveContainer>
  );
}
