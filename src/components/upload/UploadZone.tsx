'use client';

import React, { useCallback, useState } from 'react';
import { Upload, FileType, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { parseCSV } from '@/lib/csv/parser';
import { useDashboardStore } from '@/store/dashboardStore';
import { Button } from '@/components/ui/Button';

export function UploadZone() {
  const [isDragging, setIsDragging] = useState(false);
  const { setData, setIsLoading } = useDashboardStore();
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    if (!file.name.endsWith('.csv')) {
      setError('Please upload a CSV file.');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setError('File size exceeds 50MB limit.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const parsedData = await parseCSV(file);
      setData(parsedData);
      console.log('Parsed Data:', parsedData);
    } catch (err) {
      setError('Failed to parse CSV file.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      className={cn(
        "relative group cursor-pointer border-2 border-dashed rounded-2xl p-12 transition-all duration-300 flex flex-col items-center justify-center text-center",
        isDragging 
          ? "border-[#185FA5] bg-blue-50/50 dark:bg-blue-900/10 scale-[0.99]" 
          : "border-gray-300 hover:border-[#185FA5] hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900/50"
      )}
    >
      <input
        type="file"
        accept=".csv"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={onFileChange}
      />
      
      <div className="w-16 h-16 bg-[#185FA5]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <Upload className="w-8 h-8 text-[#185FA5]" />
      </div>
      
      <h3 className="text-xl font-bold mb-2">Upload your CSV</h3>
      <p className="text-gray-500 mb-6 max-w-xs">
        Drag and drop your file here, or click to browse. Max size 50MB.
      </p>
      
      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg mb-4">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      <Button variant="outline" className="pointer-events-none">
        Select CSV Data
      </Button>

      <div className="mt-8 flex gap-4 text-xs text-gray-400">
        <div className="flex items-center gap-1">
          <FileType className="w-3 h-3" />
          <span>CSV Only</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle className="w-3 h-3" />
          <span>Auto-Profiling</span>
        </div>
      </div>
    </div>
  );
}
