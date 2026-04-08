DO $$
DECLARE
  new_user_id uuid;
  new_workspace_id uuid;
  new_client_id uuid;
BEGIN
  -- Seed user 1 (idempotent: skip if email already exists)
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'lucas.salles@riosolenergias.com.br') THEN
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      new_user_id,
      '00000000-0000-0000-0000-000000000000',
      'lucas.salles@riosolenergias.com.br',
      crypt('Skip@Pass', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Lucas Salles"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '',
      NULL,
      '', '', ''
    );

    new_workspace_id := gen_random_uuid();
    INSERT INTO public.workspaces (id, name, slug) 
    VALUES (new_workspace_id, 'Rio Sol Energias', 'rio-sol-energias')
    ON CONFLICT DO NOTHING;

    INSERT INTO public.profiles (id, workspace_id, full_name, email, role)
    VALUES (new_user_id, new_workspace_id, 'Lucas Salles', 'lucas.salles@riosolenergias.com.br', 'owner')
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO public.workspace_members (workspace_id, profile_id, membership_role)
    VALUES (new_workspace_id, new_user_id, 'owner')
    ON CONFLICT DO NOTHING;

    new_client_id := gen_random_uuid();
    INSERT INTO public.clients (id, workspace_id, name, slug, status)
    VALUES (new_client_id, new_workspace_id, 'Alpha Project', 'alpha-project', 'active')
    ON CONFLICT DO NOTHING;

    INSERT INTO public.client_operation_states (client_id, workspace_id, current_module, current_stage)
    VALUES (new_client_id, new_workspace_id, 'Research', 'Market Analysis')
    ON CONFLICT DO NOTHING;

    INSERT INTO public.activity_log (workspace_id, profile_id, action, entity_type, entity_title)
    VALUES (new_workspace_id, new_user_id, 'Iniciou operação', 'client', 'Alpha Project');
  END IF;
END $$;
