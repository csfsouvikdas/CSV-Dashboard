'use client';

import React from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { UploadZone } from '@/components/upload/UploadZone';
import { DashboardGrid } from '@/components/dashboard/DashboardGrid';
import { EmptyState } from '@/components/dashboard/EmptyState';

export default function DashboardPage() {
  const { data } = useDashboardStore();

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
            Let's build your <span className="text-[#185FA5]">Insights</span>.
          </h1>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            Upload a CSV file and watch as we automatically profile, analyze, and visualize your data.
          </p>
        </div>
        
        <div className="w-full max-w-2xl">
          <UploadZone />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl pt-12">
          {[
            { title: 'Auto Profiling', desc: 'Instant column type detection & stats' },
            { title: '6 Chart Types', desc: 'Bar, Line, Pie, Scatter, Heatmap, Treemap' },
            { title: 'AI Insights', desc: 'Claude-powered data storytelling' },
          ].map((feature, i) => (
            <div key={i} className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
              <h4 className="font-bold text-sm mb-1">{feature.title}</h4>
              <p className="text-xs text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardGrid />
    </div>
  );
}
