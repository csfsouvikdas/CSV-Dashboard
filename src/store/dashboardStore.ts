import { create } from 'zustand';
import { CSVData, ColumnProfile } from '@/types/csv';

interface DashboardState {
  data: CSVData | null;
  setData: (data: CSVData | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  filters: Record<string, any>;
  setFilters: (filters: Record<string, any>) => void;
  updateFilter: (column: string, value: any) => void;
  layout: any[];
  setLayout: (layout: any[]) => void;
  chartConfigs: any[];
  setChartConfigs: (configs: any[]) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  data: null,
  setData: (data) => set({ data }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  filters: {},
  setFilters: (filters) => set({ filters }),
  updateFilter: (column, value) => set((state) => ({
    filters: { ...state.filters, [column]: value }
  })),
  layout: [],
  setLayout: (layout) => set({ layout }),
  chartConfigs: [],
  setChartConfigs: (chartConfigs) => set({ chartConfigs }),
}));
