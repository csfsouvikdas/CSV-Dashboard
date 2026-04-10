'use client';

import React from 'react';
import {
  LineChart as RechartsLine,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface LineChartProps {
  data: any[];
  xCol: string;
  yCol: string;
}

export function LineChart({ data, xCol, yCol }: LineChartProps) {
  const chartData = React.useMemo(() => {
    return data
      .map(row => ({
        name: row[xCol],
        value: Number(row[yCol]) || 0,
      }))
      .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());
  }, [data, xCol, yCol]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLine data={chartData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
        <XAxis 
          dataKey="name" 
          fontSize={10} 
          tickLine={false} 
          axisLine={false}
          tick={{ fill: '#9ca3af' }}
          minTickGap={30}
        />
        <YAxis 
          fontSize={10} 
          tickLine={false} 
          axisLine={false}
          tick={{ fill: '#9ca3af' }}
        />
        <Tooltip 
          contentStyle={{ 
            borderRadius: '12px', 
            border: 'none', 
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
          }}
        />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#185FA5" 
          strokeWidth={2}
          dot={{ r: 2, fill: '#185FA5' }}
          activeDot={{ r: 4, strokeWidth: 0 }}
        />
      </RechartsLine>
    </ResponsiveContainer>
  );
}
