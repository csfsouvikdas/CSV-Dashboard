export type ColumnType = 'numeric' | 'categorical' | 'date' | 'boolean' | 'text';

export interface ColumnProfile {
  name: string;
  type: ColumnType;
  nullCount: number;
  uniqueCount: number;
  min?: number | string;
  max?: number | string;
  mean?: number;
  top5?: { value: string; count: number }[];
  dateRange?: { start: string; end: string };
  distribution?: { value: string | number; count: number }[];
}

export interface CSVData {
  fileName: string;
  rowCount: number;
  columns: string[];
  profiles: Record<string, ColumnProfile>;
  rows: any[];
}
