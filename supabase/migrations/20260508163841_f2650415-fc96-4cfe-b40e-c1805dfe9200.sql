
-- Roles enum + table (security best practice: roles in dedicated table)
create type public.app_role as enum ('admin', 'moderator', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

create policy "admins manage roles"
  on public.user_roles for all
  to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- Leads table
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  email text not null,
  domain text not null,
  sub_domain text,
  capital_range text,
  decision_stage text,
  privacy_consent boolean not null,
  marketing_consent boolean not null default false,
  consent_timestamp timestamptz not null default now(),
  status text not null default 'new',
  assigned_to text,
  source_page text,
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  constraint leads_privacy_required check (privacy_consent = true),
  constraint leads_status_valid check (status in ('new','assigned','in_progress','closed'))
);

create index leads_created_at_idx on public.leads (created_at desc);
create index leads_domain_idx on public.leads (domain);
create index leads_status_idx on public.leads (status);

alter table public.leads enable row level security;

-- Public can submit a lead only with explicit privacy consent
create policy "public can insert leads with consent"
  on public.leads for insert
  to anon, authenticated
  with check (privacy_consent = true);

-- Only admins can read/update/delete leads
create policy "admins read leads"
  on public.leads for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "admins update leads"
  on public.leads for update
  to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create policy "admins delete leads"
  on public.leads for delete
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));
