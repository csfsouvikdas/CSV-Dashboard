'use client';

import React, { useEffect, useState } from 'react';
import { Responsive, Layout } from 'react-grid-layout';
// @ts-ignore
import WidthProvider from 'react-grid-layout/build/WidthProvider';
import { useDashboardStore } from '@/store/dashboardStore';
import { generateAutoConfigs } from '@/lib/charts/autoLayout';
import { ChartCard } from '@/components/charts/ChartCard';
import { ChartPanel } from '@/components/dashboard/ChartPanel';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

export function DashboardGrid() {
  const { data, layout, setLayout, chartConfigs, setChartConfigs } = useDashboardStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (data && chartConfigs.length === 0) {
      const configs = generateAutoConfigs(data);
      setChartConfigs(configs);
      
      // Default layout
      const initialLayout = configs.map((c, i) => ({
        i: c.id,
        x: (i % 3) * 4,
        y: Math.floor(i / 3) * 4,
        w: 4,
        h: 4,
      }));
      setLayout(initialLayout);
    }
  }, [data, chartConfigs.length, setChartConfigs, setLayout]);

  if (!isMounted || !data) return null;

  return (
    <div className="w-full">
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        onLayoutChange={(currentLayout: Layout[]) => setLayout(currentLayout)}
        draggableHandle=".group-header"
      >
        {chartConfigs.map((config) => (
          <div key={config.id} className="group">
            <ChartCard title={config.title} type={config.type}>
              <ChartPanel config={config} />
            </ChartCard>
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}
