'use client';

import React from 'react';
import {
  ScatterChart as RechartsScatter,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ScatterChartProps {
  data: any[];
  xCol: string;
  yCol: string;
}

export function ScatterChart({ data, xCol, yCol }: ScatterChartProps) {
  const chartData = React.useMemo(() => {
    return data.slice(0, 100).map(row => ({
      x: Number(row[xCol]) || 0,
      y: Number(row[yCol]) || 0,
    }));
  }, [data, xCol, yCol]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsScatter margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
        <XAxis 
          type="number" 
          dataKey="x" 
          name={xCol} 
          fontSize={10} 
          tickLine={false} 
          axisLine={false}
          tick={{ fill: '#9ca3af' }}
        />
        <YAxis 
          type="number" 
          dataKey="y" 
          name={yCol} 
          fontSize={10} 
          tickLine={false} 
          axisLine={false}
          tick={{ fill: '#9ca3af' }}
        />
        <ZAxis type="number" range={[64, 64]} />
        <Tooltip 
          cursor={{ strokeDasharray: '3 3' }}
          contentStyle={{ 
            borderRadius: '12px', 
            border: 'none', 
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
          }}
        />
        <Scatter name="Data Points" data={chartData} fill="#185FA5" opacity={0.6} />
      </RechartsScatter>
    </ResponsiveContainer>
  );
}
