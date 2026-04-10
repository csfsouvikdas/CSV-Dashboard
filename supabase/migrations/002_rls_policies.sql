alter table csv_sessions enable row level security;
alter table dashboards enable row level security;
alter table joined_csvs enable row level security;

create policy "Users can only see their own sessions" on csv_sessions
  for all using (auth.uid() = user_id);

create policy "Users can only see their own dashboards" on dashboards
  for all using (auth.uid() = user_id);

create policy "Users can only see their own joined csvs" on joined_csvs
  for all using (auth.uid() = user_id);
