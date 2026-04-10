-- Users are handled by Supabase Auth

create table csv_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  file_name text not null,
  row_count int,
  column_profiles jsonb,   -- {col_name: {type, nulls, unique, min, max, top5}}
  storage_path text,
  created_at timestamptz default now()
);

create table dashboards (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references csv_sessions,
  user_id uuid references auth.users not null,
  layout jsonb,            -- react-grid-layout config
  chart_configs jsonb,     -- [{id, type, x_col, y_col, color, title}]
  filters jsonb,           -- {date_range, column_filters}
  ai_story text,
  correlation_matrix jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table joined_csvs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  session_ids uuid[],
  join_column text,
  result_storage_path text,
  created_at timestamptz default now()
);
