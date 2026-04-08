-- Legacy Torq Central frontend compatibility adjustments

alter table public.torq_docs
  add column if not exists content_markdown text;

update public.torq_docs
set content_markdown = coalesce(content_markdown, body_markdown)
where content_markdown is null;

create or replace function public.sync_torq_docs_markdown()
returns trigger
language plpgsql
as $$
begin
  if new.content_markdown is null and new.body_markdown is not null then
    new.content_markdown := new.body_markdown;
  end if;

  if new.body_markdown is null and new.content_markdown is not null then
    new.body_markdown := new.content_markdown;
  end if;

  if tg_op = 'UPDATE' then
    if new.content_markdown is distinct from old.content_markdown then
      new.body_markdown := new.content_markdown;
    elsif new.body_markdown is distinct from old.body_markdown then
      new.content_markdown := new.body_markdown;
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_sync_torq_docs_markdown on public.torq_docs;
create trigger trg_sync_torq_docs_markdown
before insert or update on public.torq_docs
for each row
execute function public.sync_torq_docs_markdown();

alter table public.attachments
  add column if not exists type text,
  add column if not exists title text,
  add column if not exists url text,
  add column if not exists thumbnail_url text,
  add column if not exists file_size bigint;

update public.attachments
set
  title = coalesce(title, file_name),
  url = coalesce(url, public_url),
  type = coalesce(type, case when mime_type = 'application/pdf' then 'pdf' else 'file' end)
where title is null or url is null or type is null;

drop function if exists public.search_docs(text);

create or replace function public.search_docs(search_query text)
returns table (
  id uuid,
  title text,
  category_id uuid,
  tags text[],
  snippet text,
  rank real
)
language sql
stable
as $$
  with docs as (
    select
      d.id,
      d.title,
      d.category_id,
      d.tags,
      coalesce(d.content_markdown, d.body_markdown, '') as searchable_text
    from public.torq_docs d
    where coalesce(search_query, '') <> ''
  ),
  ranked as (
    select
      d.id,
      d.title,
      d.category_id,
      d.tags,
      ts_headline(
        'simple',
        d.searchable_text,
        plainto_tsquery('simple', search_query),
        'MaxWords=18, MinWords=8, StartSel=**, StopSel=**'
      ) as snippet,
      ts_rank(
        to_tsvector('simple', coalesce(d.title, '') || ' ' || d.searchable_text || ' ' || coalesce(array_to_string(d.tags, ' '), '')),
        plainto_tsquery('simple', search_query)
      ) as rank
    from docs d
    where to_tsvector('simple', coalesce(d.title, '') || ' ' || d.searchable_text || ' ' || coalesce(array_to_string(d.tags, ' '), ''))
      @@ plainto_tsquery('simple', search_query)
  )
  select id, title, category_id, tags, snippet, rank
  from ranked
  order by rank desc, title asc
  limit 20;
$$;
