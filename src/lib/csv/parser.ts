import Papa from 'papaparse';
import { CSVData } from '@/types/csv';
import { profileColumn } from './profiler';

export async function parseCSV(file: File): Promise<CSVData> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        const rows = results.data;
        const columns = results.meta.fields || [];
        const profiles: Record<string, any> = {};

        columns.forEach(col => {
          const values = rows.map((row: any) => row[col]);
          profiles[col] = profileColumn(col, values);
        });

        resolve({
          fileName: file.name,
          rowCount: rows.length,
          columns,
          profiles,
          rows,
        });
      },
      error: (error) => reject(error),
    });
  });
}

export function parseCSVString(content: string, fileName: string = 'merged.csv'): CSVData {
  const results = Papa.parse(content, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
  });

  const rows = results.data;
  const columns = results.meta.fields || [];
  const profiles: Record<string, any> = {};

  columns.forEach(col => {
    const values = rows.map((row: any) => row[col]);
    profiles[col] = profileColumn(col, values);
  });

  return {
    fileName,
    rowCount: rows.length,
    columns,
    profiles,
    rows,
  };
}
