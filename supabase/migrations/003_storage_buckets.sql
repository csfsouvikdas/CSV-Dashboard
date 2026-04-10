insert into storage.buckets (id, name, public) values ('csv-uploads', 'csv-uploads', false);

create policy "Users can upload their own csvs" on storage.objects
  for insert with check (bucket_id = 'csv-uploads' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can view their own csvs" on storage.objects
  for select using (bucket_id = 'csv-uploads' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can update their own csvs" on storage.objects
  for update using (bucket_id = 'csv-uploads' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can delete their own csvs" on storage.objects
  for delete using (bucket_id = 'csv-uploads' and (storage.foldername(name))[1] = auth.uid()::text);
