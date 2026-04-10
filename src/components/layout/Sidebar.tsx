'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  Columns, 
  Zap, 
  Sparkles, 
  Layers, 
  History, 
  Database,
  LayoutDashboard,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Columns, label: 'Columns', href: '/dashboard/columns' },
  { icon: Layers, label: 'Correlations', href: '/dashboard/correlations' },
  { icon: Zap, label: 'Clean Data', href: '/dashboard/clean' },
  { icon: Database, label: 'Join Files', href: '/dashboard/join' },
  { icon: Sparkles, label: 'AI Stories', href: '/dashboard/ai-story' },
  { icon: History, label: 'History', href: '/dashboard/history' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-full bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#185FA5] rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <BarChart3 className="w-6 h-6" />
          </div>
          <span className="font-bold text-lg tracking-tight">Universal CSV</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-[#185FA5]/10 text-[#185FA5] font-semibold" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-gray-900 dark:hover:text-gray-100"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-transform duration-200 group-hover:scale-110",
                isActive ? "text-[#185FA5]" : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
              )} />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200"
        >
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Settings</span>
        </Link>
      </div>
    </div>
  );
}
