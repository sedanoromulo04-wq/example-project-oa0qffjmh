-- Torq Central v1 category seed
-- Inserts top-level operational categories aligned to the Torq OS operating model.

insert into categories (name, slug, icon, display_order, parent_id)
values
  ('Vision', 'vision', 'target', 10, null),
  ('Voice', 'voice', 'megaphone', 20, null),
  ('Clients', 'clients', 'users', 30, null),
  ('Market Intelligence', 'market-intelligence', 'building', 40, null),
  ('Offers', 'offers', 'scale', 50, null),
  ('Storytelling', 'storytelling', 'book-open', 60, null),
  ('Copy', 'copy', 'file-text', 70, null),
  ('Content Planning', 'content-planning', 'palette', 80, null),
  ('Publishing', 'publishing', 'rocket', 90, null),
  ('Cases', 'cases', 'dna', 100, null)
on conflict (slug) do update
set
  name = excluded.name,
  icon = excluded.icon,
  display_order = excluded.display_order,
  parent_id = excluded.parent_id;
