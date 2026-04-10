import { CSVData, ColumnProfile, ColumnType } from '@/types/csv';

export type ChartType = 'bar' | 'line' | 'pie' | 'scatter' | 'heatmap' | 'treemap';

export interface ChartConfig {
  id: string;
  type: ChartType;
  title: string;
  xCol: string;
  yCol: string;
  groupCol?: string;
  color?: string;
}

export function generateAutoConfigs(data: CSVData): ChartConfig[] {
  const configs: ChartConfig[] = [];
  const columns = Object.values(data.profiles);
  
  const numerics = columns.filter(c => c.type === 'numeric');
  const categoricals = columns.filter(c => c.type === 'categorical' || c.type === 'boolean');
  const dates = columns.filter(c => c.type === 'date');

  // 1. Bar Chart: Categorical + Numeric
  if (categoricals.length > 0 && numerics.length > 0) {
    configs.push({
      id: 'auto-bar',
      type: 'bar',
      title: `${numerics[0].name} by ${categoricals[0].name}`,
      xCol: categoricals[0].name,
      yCol: numerics[0].name,
    });
  }

  // 2. Line Chart: Date + Numeric
  if (dates.length > 0 && numerics.length > 0) {
    configs.push({
      id: 'auto-line',
      type: 'line',
      title: `${numerics[0].name} Over Time`,
      xCol: dates[0].name,
      yCol: numerics[0].name,
    });
  } else if (numerics.length > 0) {
    // Fallback line chart with row index or first numeric
    configs.push({
      id: 'auto-line',
      type: 'line',
      title: `${numerics[0].name} Trend`,
      xCol: numerics[1]?.name || numerics[0].name,
      yCol: numerics[0].name,
    });
  }

  // 3. Pie Chart: Categorical with low cardinality
  const lowCardCategoricals = categoricals.filter(c => c.uniqueCount <= 8);
  if (lowCardCategoricals.length > 0) {
    configs.push({
      id: 'auto-pie',
      type: 'pie',
      title: `Distribution of ${lowCardCategoricals[0].name}`,
      xCol: lowCardCategoricals[0].name,
      yCol: 'count', // Virtual column for pie
    });
  }

  // 4. Scatter Plot: Two Numerics
  if (numerics.length >= 2) {
    configs.push({
      id: 'auto-scatter',
      type: 'scatter',
      title: `${numerics[1].name} vs ${numerics[0].name}`,
      xCol: numerics[0].name,
      yCol: numerics[1].name,
    });
  }

  // 5. Heatmap: Two Categoricals + Numeric
  if (categoricals.length >= 2 && numerics.length > 0) {
    configs.push({
      id: 'auto-heatmap',
      type: 'heatmap',
      title: `${numerics[0].name} Correlation Matrix`,
      xCol: categoricals[0].name,
      yCol: categoricals[1].name,
      groupCol: numerics[0].name
    });
  }

  // 6. Treemap: Categorical + Numeric
  if (categoricals.length > 0 && numerics.length > 0) {
    configs.push({
      id: 'auto-treemap',
      type: 'treemap',
      title: `${categoricals[0].name} Hierarchy by ${numerics[0].name}`,
      xCol: categoricals[0].name,
      yCol: numerics[0].name,
    });
  }

  return configs;
}

export const CHART_PALETTE = ['#378ADD', '#1D9E75', '#EF9F27', '#D4537E', '#7F77DD', '#E24B4A'];
