-- Torq bootstrap migration
-- Creates storage bucket and seeds top-level categories for the current frontend.

insert into storage.buckets (id, name, public, type)
values ('torq-attachments', 'torq-attachments', true, 'STANDARD')
on conflict (id) do nothing;

insert into public.categories (workspace_id, name, slug, icon, display_order, parent_id, module)
select null, v.name, v.slug, v.icon, v.display_order, null, v.module
from (
  values
    ('Vision', 'vision', 'target', 10, 'strategy-os'),
    ('Voice', 'voice', 'megaphone', 20, 'memory-os'),
    ('Clients', 'clients', 'users', 30, 'memory-os'),
    ('Market Intelligence', 'market-intelligence', 'building', 40, 'research-os'),
    ('Offers', 'offers', 'scale', 50, 'conversion-os'),
    ('Storytelling', 'storytelling', 'book-open', 60, 'strategy-os'),
    ('Copy', 'copy', 'file-text', 70, 'conversion-os'),
    ('Content Planning', 'content-planning', 'palette', 80, 'content-os'),
    ('Publishing', 'publishing', 'rocket', 90, 'distribution-os'),
    ('Cases', 'cases', 'dna', 100, 'memory-os')
) as v(name, slug, icon, display_order, module)
where not exists (
  select 1
  from public.categories c
  where c.workspace_id is null
    and c.slug = v.slug
);
