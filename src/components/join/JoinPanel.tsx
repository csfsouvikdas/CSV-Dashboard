'use client';

import React, { useState } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Upload, Database, ArrowRightLeft, FileText, CheckCircle2 } from 'lucide-react';
import { parseCSV } from '@/lib/csv/parser';
import { detectCommonColumns, joinCSVs, JoinType } from '@/lib/csv/joiner';
import { profileColumn } from '@/lib/csv/profiler';
import { cn } from '@/lib/utils';

export function JoinPanel() {
  const { data: primaryData, setData } = useDashboardStore();
  const [secondaryData, setSecondaryData] = useState<any>(null);
  const [joinCol, setJoinCol] = useState<string>('');
  const [joinType, setJoinType] = useState<JoinType>('inner');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!primaryData) return null;

  const handleSecondaryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const parsed = await parseCSV(file);
      setSecondaryData(parsed);
      const common = detectCommonColumns(primaryData.rows, parsed.rows);
      if (common.length > 0) setJoinCol(common[0]);
    }
  };

  const handleJoin = () => {
    if (!secondaryData || !joinCol) return;
    setIsProcessing(true);
    
    setTimeout(() => {
      const joinedRows = joinCSVs(primaryData.rows, secondaryData.rows, joinCol, joinType);
      const columns = Array.from(new Set([...primaryData.columns, ...secondaryData.columns]));
      const profiles: Record<string, any> = {};
      
      columns.forEach(col => {
        profiles[col] = profileColumn(col, joinedRows.map(r => r[col]));
      });

      setData({
        fileName: `Joined: ${primaryData.fileName} + ${secondaryData.fileName}`,
        rowCount: joinedRows.length,
        columns,
        profiles,
        rows: joinedRows
      });
      
      setIsProcessing(false);
      setSecondaryData(null);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <Card className="border-2 border-dashed border-gray-200 dark:border-gray-800">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-[#185FA5]" />
              <CardTitle>Source 1 (Current)</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <span className="font-bold truncate max-w-[150px]">{primaryData.fileName}</span>
              </div>
              <Badge variant="outline">{primaryData.rowCount} rows</Badge>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center -my-3 relative z-10">
          <div className="bg-white dark:bg-gray-900 p-2 rounded-full border border-gray-200 dark:border-gray-800 shadow-sm">
            <ArrowRightLeft className="w-5 h-5 text-gray-400 rotate-90" />
          </div>
        </div>

        <Card className={secondaryData ? "border-green-100 bg-green-50/10" : "border-2 border-dashed"}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-purple-600" />
              <CardTitle>Source 2</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {secondaryData ? (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="font-bold truncate max-w-[150px]">{secondaryData.fileName}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSecondaryData(null)}>Change</Button>
              </div>
            ) : (
              <div className="relative group p-8 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl flex flex-col items-center hover:bg-gray-50 transition-colors">
                <input type="file" onChange={handleSecondaryUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                <Upload className="w-6 h-6 text-gray-400 mb-2 group-hover:text-blue-500" />
                <span className="text-xs font-medium text-gray-500">Upload Second CSV</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Join Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-400">Join Column</label>
            <select 
              className="w-full p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:ring-2 focus:ring-blue-500"
              value={joinCol}
              onChange={(e) => setJoinCol(e.target.value)}
              disabled={!secondaryData}
            >
              {!secondaryData && <option>Waiting for second source...</option>}
              {secondaryData && detectCommonColumns(primaryData.rows, secondaryData.rows).map(col => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-400">Join Type</label>
            <div className="grid grid-cols-3 gap-2">
              {(['inner', 'left', 'right'] as JoinType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setJoinType(type)}
                  disabled={!secondaryData}
                  className={cn(
                    "p-3 rounded-xl border text-xs font-bold capitalize transition-all",
                    joinType === type 
                      ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20" 
                      : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-500 hover:border-blue-200"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <Button 
            className="w-full" 
            size="lg" 
            disabled={!secondaryData || isProcessing}
            onClick={handleJoin}
          >
            {isProcessing ? 'Merging Datasets...' : 'Join & Create New Session'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
