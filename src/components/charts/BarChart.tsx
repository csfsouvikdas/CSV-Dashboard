'use client';

import React from 'react';
import {
  BarChart as RechartsBar,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { CHART_PALETTE } from '@/lib/charts/autoLayout';

interface BarChartProps {
  data: any[];
  xCol: string;
  yCol: string;
}

export function BarChart({ data, xCol, yCol }: BarChartProps) {
  // Aggregate data if necessary (simple grouping by xCol)
  const chartData = React.useMemo(() => {
    const groups: Record<string, number> = {};
    data.forEach(row => {
      const key = String(row[xCol]);
      groups[key] = (groups[key] || 0) + (Number(row[yCol]) || 0);
    });
    return Object.entries(groups)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 15); // Top 15
  }, [data, xCol, yCol]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBar data={chartData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
        <XAxis 
          dataKey="name" 
          fontSize={10} 
          tickLine={false} 
          axisLine={false}
          tick={{ fill: '#9ca3af' }}
        />
        <YAxis 
          fontSize={10} 
          tickLine={false} 
          axisLine={false}
          tick={{ fill: '#9ca3af' }}
          tickFormatter={(value) => (value >= 1000 ? `${value / 1000}k` : value)}
        />
        <Tooltip 
          contentStyle={{ 
            borderRadius: '12px', 
            border: 'none', 
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
          }}
        />
        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={CHART_PALETTE[index % CHART_PALETTE.length]} />
          ))}
        </Bar>
      </RechartsBar>
    </ResponsiveContainer>
  );
}
