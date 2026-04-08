// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.5'
  }
  public: {
    Tables: {
      activity_log: {
        Row: {
          action: string
          category_name: string | null
          created_at: string
          entity_id: string | null
          entity_title: string | null
          entity_type: string | null
          id: string
          payload: Json | null
          profile_id: string | null
          workspace_id: string | null
        }
        Insert: {
          action: string
          category_name?: string | null
          created_at?: string
          entity_id?: string | null
          entity_title?: string | null
          entity_type?: string | null
          id?: string
          payload?: Json | null
          profile_id?: string | null
          workspace_id?: string | null
        }
        Update: {
          action?: string
          category_name?: string | null
          created_at?: string
          entity_id?: string | null
          entity_title?: string | null
          entity_type?: string | null
          id?: string
          payload?: Json | null
          profile_id?: string | null
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'activity_log_profile_id_fkey'
            columns: ['profile_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'activity_log_workspace_id_fkey'
            columns: ['workspace_id']
            isOneToOne: false
            referencedRelation: 'workspaces'
            referencedColumns: ['id']
          },
        ]
      }
      agent_context_packs: {
        Row: {
          client_id: string | null
          created_at: string
          current_module: string | null
          current_stage: string | null
          id: string
          payload: Json
          session_id: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          current_module?: string | null
          current_stage?: string | null
          id?: string
          payload: Json
          session_id: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          current_module?: string | null
          current_stage?: string | null
          id?: string
          payload?: Json
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'agent_context_packs_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'clients'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'agent_context_packs_session_id_fkey'
            columns: ['session_id']
            isOneToOne: false
            referencedRelation: 'jarvis_sessions'
            referencedColumns: ['id']
          },
        ]
      }
      agent_runs: {
        Row: {
          agent_name: string
          context_pack: Json | null
          created_at: string
          finished_at: string | null
          id: string
          module: string | null
          parent_run_id: string | null
          result_payload: Json | null
          session_id: string | null
          status: string
        }
        Insert: {
          agent_name: string
          context_pack?: Json | null
          created_at?: string
          finished_at?: string | null
          id?: string
          module?: string | null
          parent_run_id?: string | null
          result_payload?: Json | null
          session_id?: string | null
          status?: string
        }
        Update: {
          agent_name?: string
          context_pack?: Json | null
          created_at?: string
          finished_at?: string | null
          id?: string
          module?: string | null
          parent_run_id?: string | null
          result_payload?: Json | null
          session_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: 'agent_runs_parent_run_id_fkey'
            columns: ['parent_run_id']
            isOneToOne: false
            referencedRelation: 'agent_runs'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'agent_runs_session_id_fkey'
            columns: ['session_id']
            isOneToOne: false
            referencedRelation: 'jarvis_sessions'
            referencedColumns: ['id']
          },
        ]
      }
      approval_decisions: {
        Row: {
          approval_item_id: string
          created_at: string
          decided_by: string | null
          decision: string
          id: string
          notes: string | null
        }
        Insert: {
          approval_item_id: string
          created_at?: string
          decided_by?: string | null
          decision: string
          id?: string
          notes?: string | null
        }
        Update: {
          approval_item_id?: string
          created_at?: string
          decided_by?: string | null
          decision?: string
          id?: string
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'approval_decisions_approval_item_id_fkey'
            columns: ['approval_item_id']
            isOneToOne: false
            referencedRelation: 'approval_items'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'approval_decisions_decided_by_fkey'
            columns: ['decided_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      approval_items: {
        Row: {
          artifact_id: string | null
          client_id: string | null
          created_at: string
          id: string
          required_approver_profile_id: string | null
          review_payload: Json | null
          risk_level: string | null
          status: string
          updated_at: string
          workspace_id: string
        }
        Insert: {
          artifact_id?: string | null
          client_id?: string | null
          created_at?: string
          id?: string
          required_approver_profile_id?: string | null
          review_payload?: Json | null
          risk_level?: string | null
          status?: string
          updated_at?: string
          workspace_id?: string
        }
        Update: {
          artifact_id?: string | null
          client_id?: string | null
          created_at?: string
          id?: string
          required_approver_profile_id?: string | null
          review_payload?: Json | null
          risk_level?: string | null
          status?: string
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'approval_items_artifact_id_fkey'
            columns: ['artifact_id']
            isOneToOne: false
            referencedRelation: 'artifact_registry'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'approval_items_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'clients'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'approval_items_required_approver_profile_id_fkey'
            columns: ['required_approver_profile_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'approval_items_workspace_id_fkey'
            columns: ['workspace_id']
            isOneToOne: false
            referencedRelation: 'workspaces'
            referencedColumns: ['id']
          },
        ]
      }
      artifact_registry: {
        Row: {
          approval_state: string
          artifact_type: string
          client_id: string | null
          created_at: string
          doc_id: string | null
          id: string
          job_id: string | null
          json_payload: Json | null
          storage_mode: string | null
          title: string | null
          updated_at: string
          workspace_id: string
        }
        Insert: {
          approval_state?: string
          artifact_type: string
          client_id?: string | null
          created_at?: string
          doc_id?: string | null
          id?: string
          job_id?: string | null
          json_payload?: Json | null
          storage_mode?: string | null
          title?: string | null
          updated_at?: string
          workspace_id?: string
        }
        Update: {
          approval_state?: string
          artifact_type?: string
          client_id?: string | null
          created_at?: string
          doc_id?: string | null
          id?: string
          job_id?: string | null
          json_payload?: Json | null
          storage_mode?: string | null
          title?: string | null
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'artifact_registry_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'clients'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'artifact_registry_doc_id_fkey'
            columns: ['doc_id']
            isOneToOne: false
            referencedRelation: 'torq_docs'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'artifact_registry_job_id_fkey'
            columns: ['job_id']
            isOneToOne: false
            referencedRelation: 'jobs'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'artifact_registry_workspace_id_fkey'
            columns: ['workspace_id']
            isOneToOne: false
            referencedRelation: 'workspaces'
            referencedColumns: ['id']
          },
        ]
      }
      attachments: {
        Row: {
          client_id: string | null
          created_at: string
          created_by: string | null
          doc_id: string | null
          file_name: string
          file_size: number | null
          id: string
          mime_type: string | null
          public_url: string | null
          storage_bucket: string
          storage_path: string
          thumbnail_url: string | null
          title: string | null
          type: string | null
          url: string | null
          workspace_id: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          created_by?: string | null
          doc_id?: string | null
          file_name: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          public_url?: string | null
          storage_bucket: string
          storage_path: string
          thumbnail_url?: string | null
          title?: string | null
          type?: string | null
          url?: string | null
          workspace_id?: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          created_by?: string | null
          doc_id?: string | null
          file_name?: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          public_url?: string | null
          storage_bucket?: string
          storage_path?: string
          thumbnail_url?: string | null
          title?: string | null
          type?: string | null
          url?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'attachments_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'clients'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'attachments_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'attachments_doc_id_fkey'
            columns: ['doc_id']
            isOneToOne: false
            referencedRelation: 'torq_docs'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'attachments_workspace_id_fkey'
            columns: ['workspace_id']
            isOneToOne: false
            referencedRelation: 'workspaces'
            referencedColumns: ['id']
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          display_order: number
          icon: string | null
          id: string
          module: string | null
          name: string
          parent_id: string | null
          slug: string
          updated_at: string
          workspace_id: string | null
        }
        Insert: {
          created_at?: string
          display_order?: number
          icon?: string | null
          id?: string
          module?: string | null
          name: string
          parent_id?: string | null
          slug: string
          updated_at?: string
          workspace_id?: string | null
        }
        Update: {
          created_at?: string
          display_order?: number
          icon?: string | null
          id?: string
          module?: string | null
          name?: string
          parent_id?: string | null
          slug?: string
          updated_at?: string
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'categories_parent_id_fkey'
            columns: ['parent_id']
            isOneToOne: false
            referencedRelation: 'categories'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'categories_workspace_id_fkey'
            columns: ['workspace_id']
            isOneToOne: false
            referencedRelation: 'workspaces'
            referencedColumns: ['id']
          },
        ]
      }
      client_asset_links: {
        Row: {
          artifact_id: string
          client_id: string
          created_at: string
          id: string
          relation_kind: string
        }
        Insert: {
          artifact_id: string
          client_id: string
          created_at?: string
          id?: string
          relation_kind?: string
        }
        Update: {
          artifact_id?: string
          client_id?: string
          created_at?: string
          id?: string
          relation_kind?: string
        }
        Relationships: [
          {
            foreignKeyName: 'client_asset_links_artifact_id_fkey'
            columns: ['artifact_id']
            isOneToOne: false
            referencedRelation: 'artifact_registry'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'client_asset_links_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'clients'
            referencedColumns: ['id']
          },
        ]
      }
      client_operation_briefs: {
        Row: {
          client_id: string
          created_at: string
          created_by: string | null
          id: string
          payload: Json
          updated_at: string
          workspace_id: string
        }
        Insert: {
          client_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          payload: Json
          updated_at?: string
          workspace_id: string
        }
        Update: {
          client_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          payload?: Json
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'client_operation_briefs_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'clients'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'client_operation_briefs_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'client_operation_briefs_workspace_id_fkey'
            columns: ['workspace_id']
            isOneToOne: false
            referencedRelation: 'workspaces'
            referencedColumns: ['id']
          },
        ]
      }
      client_operation_states: {
        Row: {
          approval_owner_profile_id: string | null
          block_reason: string | null
          client_id: string
          current_module: string | null
          current_stage: string | null
          is_blocked: boolean
          last_transition_at: string | null
          next_required_job_kind: string | null
          updated_at: string
          workspace_id: string
        }
        Insert: {
          approval_owner_profile_id?: string | null
          block_reason?: string | null
          client_id: string
          current_module?: string | null
          current_stage?: string | null
          is_blocked?: boolean
          last_transition_at?: string | null
          next_required_job_kind?: string | null
          updated_at?: string
          workspace_id: string
        }
        Update: {
          approval_owner_profile_id?: string | null
          block_reason?: string | null
          client_id?: string
          current_module?: string | null
          current_stage?: string | null
          is_blocked?: boolean
          last_transition_at?: string | null
          next_required_job_kind?: string | null
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'client_operation_states_approval_owner_profile_id_fkey'
            columns: ['approval_owner_profile_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'client_operation_states_client_id_fkey'
            columns: ['client_id']
            isOneToOne: true
            referencedRelation: 'clients'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'client_operation_states_workspace_id_fkey'
            columns: ['workspace_id']
            isOneToOne: false
            referencedRelation: 'workspaces'
            referencedColumns: ['id']
          },
        ]
      }
      client_stage_history: {
        Row: {
          changed_by: string | null
          client_id: string
          created_at: string
          from_stage: string | null
          id: string
          to_stage: string
          transition_reason: string | null
        }
        Insert: {
          changed_by?: string | null
          client_id: string
          created_at?: string
          from_stage?: string | null
          id?: string
          to_stage: string
          transition_reason?: string | null
        }
        Update: {
          changed_by?: string | null
          client_id?: string
          created_at?: string
          from_stage?: string | null
          id?: string
          to_stage?: string
          transition_reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'client_stage_history_changed_by_fkey'
            columns: ['changed_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'client_stage_history_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'clients'
            referencedColumns: ['id']
          },
        ]
      }
      clients: {
        Row: {
          business_model: string | null
          created_at: string
          id: string
          name: string
          segment: string | null
          slug: string | null
          status: string
          updated_at: string
          workspace_id: string
        }
        Insert: {
          business_model?: string | null
          created_at?: string
          id?: string
          name: string
          segment?: string | null
          slug?: string | null
          status?: string
          updated_at?: string
          workspace_id?: string
        }
        Update: {
          business_model?: string | null
          created_at?: string
          id?: string
          name?: string
          segment?: string | null
          slug?: string | null
          status?: string
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'clients_workspace_id_fkey'
            columns: ['workspace_id']
            isOneToOne: false
            referencedRelation: 'workspaces'
            referencedColumns: ['id']
          },
        ]
      }
      distribution_events: {
        Row: {
          created_at: string
          distribution_job_id: string
          event_type: string
          id: string
          payload: Json | null
        }
        Insert: {
          created_at?: string
          distribution_job_id: string
          event_type: string
          id?: string
          payload?: Json | null
        }
        Update: {
          created_at?: string
          distribution_job_id?: string
          event_type?: string
          id?: string
          payload?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: 'distribution_events_distribution_job_id_fkey'
            columns: ['distribution_job_id']
            isOneToOne: false
            referencedRelation: 'distribution_jobs'
            referencedColumns: ['id']
          },
        ]
      }
      distribution_jobs: {
        Row: {
          artifact_id: string
          client_id: string | null
          created_at: string
          destination_channel: string
          id: string
          metadata: Json | null
          scheduled_for: string | null
          status: string
          updated_at: string
          workspace_id: string
        }
        Insert: {
          artifact_id: string
          client_id?: string | null
          created_at?: string
          destination_channel: string
          id?: string
          metadata?: Json | null
          scheduled_for?: string | null
          status?: string
          updated_at?: string
          workspace_id?: string
        }
        Update: {
          artifact_id?: string
          client_id?: string | null
          created_at?: string
          destination_channel?: string
          id?: string
          metadata?: Json | null
          scheduled_for?: string | null
          status?: string
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'distribution_jobs_artifact_id_fkey'
            columns: ['artifact_id']
            isOneToOne: false
            referencedRelation: 'artifact_registry'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'distribution_jobs_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'clients'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'distribution_jobs_workspace_id_fkey'
            columns: ['workspace_id']
            isOneToOne: false
            referencedRelation: 'workspaces'
            referencedColumns: ['id']
          },
        ]
      }
      doc_links: {
        Row: {
          created_at: string
          from_doc_id: string
          id: string
          link_kind: string
          to_doc_id: string
        }
        Insert: {
          created_at?: string
          from_doc_id: string
          id?: string
          link_kind?: string
          to_doc_id: string
        }
        Update: {
          created_at?: string
          from_doc_id?: string
          id?: string
          link_kind?: string
          to_doc_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'doc_links_from_doc_id_fkey'
            columns: ['from_doc_id']
            isOneToOne: false
            referencedRelation: 'torq_docs'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'doc_links_to_doc_id_fkey'
            columns: ['to_doc_id']
            isOneToOne: false
            referencedRelation: 'torq_docs'
            referencedColumns: ['id']
          },
        ]
      }
      doc_versions: {
        Row: {
          body_markdown: string | null
          change_summary: string | null
          created_at: string
          doc_id: string
          id: string
          profile_id: string | null
          title: string | null
        }
        Insert: {
          body_markdown?: string | null
          change_summary?: string | null
          created_at?: string
          doc_id: string
          id?: string
          profile_id?: string | null
          title?: string | null
        }
        Update: {
          body_markdown?: string | null
          change_summary?: string | null
          created_at?: string
          doc_id?: string
          id?: string
          profile_id?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'doc_versions_doc_id_fkey'
            columns: ['doc_id']
            isOneToOne: false
            referencedRelation: 'torq_docs'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'doc_versions_profile_id_fkey'
            columns: ['profile_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      embedding_jobs: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          model_name: string | null
          source_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          model_name?: string | null
          source_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          model_name?: string | null
          source_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'embedding_jobs_source_id_fkey'
            columns: ['source_id']
            isOneToOne: false
            referencedRelation: 'knowledge_sources'
            referencedColumns: ['id']
          },
        ]
      }
      jarvis_actions: {
        Row: {
          action_type: string
          agent_run_id: string | null
          approval_required: boolean
          created_at: string
          id: string
          payload: Json | null
          session_id: string
          status: string
          target_record_id: string | null
          target_table: string | null
        }
        Insert: {
          action_type: string
          agent_run_id?: string | null
          approval_required?: boolean
          created_at?: string
          id?: string
          payload?: Json | null
          session_id: string
          status?: string
          target_record_id?: string | null
          target_table?: string | null
        }
        Update: {
          action_type?: string
          agent_run_id?: string | null
          approval_required?: boolean
          created_at?: string
          id?: string
          payload?: Json | null
          session_id?: string
          status?: string
          target_record_id?: string | null
          target_table?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'jarvis_actions_agent_run_id_fkey'
            columns: ['agent_run_id']
            isOneToOne: false
            referencedRelation: 'agent_runs'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'jarvis_actions_session_id_fkey'
            columns: ['session_id']
            isOneToOne: false
            referencedRelation: 'jarvis_sessions'
            referencedColumns: ['id']
          },
        ]
      }
      jarvis_messages: {
        Row: {
          content: string | null
          created_at: string
          id: string
          input_mode: string | null
          role: string
          session_id: string
          structured_payload: Json | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          input_mode?: string | null
          role: string
          session_id: string
          structured_payload?: Json | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          input_mode?: string | null
          role?: string
          session_id?: string
          structured_payload?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: 'jarvis_messages_session_id_fkey'
            columns: ['session_id']
            isOneToOne: false
            referencedRelation: 'jarvis_sessions'
            referencedColumns: ['id']
          },
        ]
      }
      jarvis_sessions: {
        Row: {
          client_id: string | null
          created_at: string
          id: string
          profile_id: string | null
          status: string
          title: string | null
          updated_at: string
          workspace_id: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          id?: string
          profile_id?: string | null
          status?: string
          title?: string | null
          updated_at?: string
          workspace_id?: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          id?: string
          profile_id?: string | null
          status?: string
          title?: string | null
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'jarvis_sessions_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'clients'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'jarvis_sessions_profile_id_fkey'
            columns: ['profile_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'jarvis_sessions_workspace_id_fkey'
            columns: ['workspace_id']
            isOneToOne: false
            referencedRelation: 'workspaces'
            referencedColumns: ['id']
          },
        ]
      }
      job_assignments: {
        Row: {
          assigned_role: string | null
          created_at: string
          id: string
          job_id: string
          profile_id: string | null
        }
        Insert: {
          assigned_role?: string | null
          created_at?: string
          id?: string
          job_id: string
          profile_id?: string | null
        }
        Update: {
          assigned_role?: string | null
          created_at?: string
          id?: string
          job_id?: string
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'job_assignments_job_id_fkey'
            columns: ['job_id']
            isOneToOne: false
            referencedRelation: 'jobs'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'job_assignments_profile_id_fkey'
            columns: ['profile_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      job_dependencies: {
        Row: {
          created_at: string
          dependency_kind: string
          depends_on_job_id: string
          id: string
          job_id: string
        }
        Insert: {
          created_at?: string
          dependency_kind?: string
          depends_on_job_id: string
          id?: string
          job_id: string
        }
        Update: {
          created_at?: string
          dependency_kind?: string
          depends_on_job_id?: string
          id?: string
          job_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'job_dependencies_depends_on_job_id_fkey'
            columns: ['depends_on_job_id']
            isOneToOne: false
            referencedRelation: 'jobs'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'job_dependencies_job_id_fkey'
            columns: ['job_id']
            isOneToOne: false
            referencedRelation: 'jobs'
            referencedColumns: ['id']
          },
        ]
      }
      job_outputs: {
        Row: {
          artifact_id: string | null
          created_at: string
          id: string
          job_id: string
          output_type: string
          payload: Json | null
        }
        Insert: {
          artifact_id?: string | null
          created_at?: string
          id?: string
          job_id: string
          output_type: string
          payload?: Json | null
        }
        Update: {
          artifact_id?: string | null
          created_at?: string
          id?: string
          job_id?: string
          output_type?: string
          payload?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: 'job_outputs_artifact_id_fkey'
            columns: ['artifact_id']
            isOneToOne: false
            referencedRelation: 'artifact_registry'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'job_outputs_job_id_fkey'
            columns: ['job_id']
            isOneToOne: false
            referencedRelation: 'jobs'
            referencedColumns: ['id']
          },
        ]
      }
      jobs: {
        Row: {
          approval_state: string
          blocker_reason: string | null
          client_id: string | null
          created_at: string
          created_by: string | null
          id: string
          input_payload: Json | null
          kind: string
          module: string
          output_payload: Json | null
          owner_profile_id: string | null
          source_record_id: string | null
          status: string
          updated_at: string
          workspace_id: string
        }
        Insert: {
          approval_state?: string
          blocker_reason?: string | null
          client_id?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          input_payload?: Json | null
          kind: string
          module: string
          output_payload?: Json | null
          owner_profile_id?: string | null
          source_record_id?: string | null
          status?: string
          updated_at?: string
          workspace_id?: string
        }
        Update: {
          approval_state?: string
          blocker_reason?: string | null
          client_id?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          input_payload?: Json | null
          kind?: string
          module?: string
          output_payload?: Json | null
          owner_profile_id?: string | null
          source_record_id?: string | null
          status?: string
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'jobs_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'clients'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'jobs_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'jobs_owner_profile_id_fkey'
            columns: ['owner_profile_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'jobs_workspace_id_fkey'
            columns: ['workspace_id']
            isOneToOne: false
            referencedRelation: 'workspaces'
            referencedColumns: ['id']
          },
        ]
      }
      knowledge_chunks: {
        Row: {
          chunk_index: number
          chunk_summary: string | null
          chunk_text: string
          client_id: string | null
          created_at: string
          embedding: string | null
          id: string
          metadata: Json | null
          source_id: string
          token_count: number | null
          workspace_id: string
        }
        Insert: {
          chunk_index: number
          chunk_summary?: string | null
          chunk_text: string
          client_id?: string | null
          created_at?: string
          embedding?: string | null
          id?: string
          metadata?: Json | null
          source_id: string
          token_count?: number | null
          workspace_id: string
        }
        Update: {
          chunk_index?: number
          chunk_summary?: string | null
          chunk_text?: string
          client_id?: string | null
          created_at?: string
          embedding?: string | null
          id?: string
          metadata?: Json | null
          source_id?: string
          token_count?: number | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'knowledge_chunks_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'clients'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'knowledge_chunks_source_id_fkey'
            columns: ['source_id']
            isOneToOne: false
            referencedRelation: 'knowledge_sources'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'knowledge_chunks_workspace_id_fkey'
            columns: ['workspace_id']
            isOneToOne: false
            referencedRelation: 'workspaces'
            referencedColumns: ['id']
          },
        ]
      }
      knowledge_sources: {
        Row: {
          approval_state: string
          client_id: string | null
          created_at: string
          id: string
          metadata: Json | null
          source_record_id: string | null
          source_type: string
          title: string | null
          workspace_id: string
        }
        Insert: {
          approval_state?: string
          client_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json | null
          source_record_id?: string | null
          source_type: string
          title?: string | null
          workspace_id?: string
        }
        Update: {
          approval_state?: string
          client_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json | null
          source_record_id?: string | null
          source_type?: string
          title?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'knowledge_sources_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'clients'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'knowledge_sources_workspace_id_fkey'
            columns: ['workspace_id']
            isOneToOne: false
            referencedRelation: 'workspaces'
            referencedColumns: ['id']
          },
        ]
      }
      memory_entries: {
        Row: {
          approved_for_retrieval: boolean
          body_markdown: string | null
          client_id: string | null
          confidence_level: string | null
          created_at: string
          id: string
          memory_type: string
          source_kind: string | null
          source_record_id: string | null
          summary: string | null
          tags: string[]
          title: string
          updated_at: string
          workspace_id: string
        }
        Insert: {
          approved_for_retrieval?: boolean
          body_markdown?: string | null
          client_id?: string | null
          confidence_level?: string | null
          created_at?: string
          id?: string
          memory_type: string
          source_kind?: string | null
          source_record_id?: string | null
          summary?: string | null
          tags?: string[]
          title: string
          updated_at?: string
          workspace_id?: string
        }
        Update: {
          approved_for_retrieval?: boolean
          body_markdown?: string | null
          client_id?: string | null
          confidence_level?: string | null
          created_at?: string
          id?: string
          memory_type?: string
          source_kind?: string | null
          source_record_id?: string | null
          summary?: string | null
          tags?: string[]
          title?: string
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'memory_entries_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'clients'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'memory_entries_workspace_id_fkey'
            columns: ['workspace_id']
            isOneToOne: false
            referencedRelation: 'workspaces'
            referencedColumns: ['id']
          },
        ]
      }
      memory_links: {
        Row: {
          created_at: string
          id: string
          linked_memory_id: string
          memory_id: string
          relation_kind: string
        }
        Insert: {
          created_at?: string
          id?: string
          linked_memory_id: string
          memory_id: string
          relation_kind?: string
        }
        Update: {
          created_at?: string
          id?: string
          linked_memory_id?: string
          memory_id?: string
          relation_kind?: string
        }
        Relationships: [
          {
            foreignKeyName: 'memory_links_linked_memory_id_fkey'
            columns: ['linked_memory_id']
            isOneToOne: false
            referencedRelation: 'memory_entries'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'memory_links_memory_id_fkey'
            columns: ['memory_id']
            isOneToOne: false
            referencedRelation: 'memory_entries'
            referencedColumns: ['id']
          },
        ]
      }
      performance_metrics: {
        Row: {
          distribution_job_id: string | null
          id: string
          metric_name: string
          metric_value: number | null
          recorded_at: string
        }
        Insert: {
          distribution_job_id?: string | null
          id?: string
          metric_name: string
          metric_value?: number | null
          recorded_at?: string
        }
        Update: {
          distribution_job_id?: string | null
          id?: string
          metric_name?: string
          metric_value?: number | null
          recorded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'performance_metrics_distribution_job_id_fkey'
            columns: ['distribution_job_id']
            isOneToOne: false
            referencedRelation: 'distribution_jobs'
            referencedColumns: ['id']
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          role: string | null
          updated_at: string
          workspace_id: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string
          workspace_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'profiles_workspace_id_fkey'
            columns: ['workspace_id']
            isOneToOne: false
            referencedRelation: 'workspaces'
            referencedColumns: ['id']
          },
        ]
      }
      retrieval_feedback: {
        Row: {
          chunk_id: string | null
          created_at: string
          feedback_note: string | null
          id: string
          score: number | null
          session_id: string | null
        }
        Insert: {
          chunk_id?: string | null
          created_at?: string
          feedback_note?: string | null
          id?: string
          score?: number | null
          session_id?: string | null
        }
        Update: {
          chunk_id?: string | null
          created_at?: string
          feedback_note?: string | null
          id?: string
          score?: number | null
          session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'retrieval_feedback_chunk_id_fkey'
            columns: ['chunk_id']
            isOneToOne: false
            referencedRelation: 'knowledge_chunks'
            referencedColumns: ['id']
          },
        ]
      }
      tool_events: {
        Row: {
          agent_run_id: string | null
          created_at: string
          event_type: string
          id: string
          payload: Json | null
          tool_name: string
        }
        Insert: {
          agent_run_id?: string | null
          created_at?: string
          event_type: string
          id?: string
          payload?: Json | null
          tool_name: string
        }
        Update: {
          agent_run_id?: string | null
          created_at?: string
          event_type?: string
          id?: string
          payload?: Json | null
          tool_name?: string
        }
        Relationships: [
          {
            foreignKeyName: 'tool_events_agent_run_id_fkey'
            columns: ['agent_run_id']
            isOneToOne: false
            referencedRelation: 'agent_runs'
            referencedColumns: ['id']
          },
        ]
      }
      torq_docs: {
        Row: {
          approval_state: string
          body_markdown: string | null
          category_id: string | null
          client_id: string | null
          content_markdown: string | null
          created_at: string
          created_by: string | null
          doc_type: string | null
          id: string
          slug: string | null
          status: string
          tags: string[]
          title: string
          updated_at: string
          updated_by: string | null
          workspace_id: string
        }
        Insert: {
          approval_state?: string
          body_markdown?: string | null
          category_id?: string | null
          client_id?: string | null
          content_markdown?: string | null
          created_at?: string
          created_by?: string | null
          doc_type?: string | null
          id?: string
          slug?: string | null
          status?: string
          tags?: string[]
          title: string
          updated_at?: string
          updated_by?: string | null
          workspace_id?: string
        }
        Update: {
          approval_state?: string
          body_markdown?: string | null
          category_id?: string | null
          client_id?: string | null
          content_markdown?: string | null
          created_at?: string
          created_by?: string | null
          doc_type?: string | null
          id?: string
          slug?: string | null
          status?: string
          tags?: string[]
          title?: string
          updated_at?: string
          updated_by?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'torq_docs_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'categories'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'torq_docs_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'clients'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'torq_docs_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'torq_docs_updated_by_fkey'
            columns: ['updated_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'torq_docs_workspace_id_fkey'
            columns: ['workspace_id']
            isOneToOne: false
            referencedRelation: 'workspaces'
            referencedColumns: ['id']
          },
        ]
      }
      workspace_members: {
        Row: {
          created_at: string
          id: string
          membership_role: string
          profile_id: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          membership_role: string
          profile_id: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          id?: string
          membership_role?: string
          profile_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'workspace_members_profile_id_fkey'
            columns: ['profile_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'workspace_members_workspace_id_fkey'
            columns: ['workspace_id']
            isOneToOne: false
            referencedRelation: 'workspaces'
            referencedColumns: ['id']
          },
        ]
      }
      workspaces: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      bootstrap_torq_operator: {
        Args: {
          operator_full_name?: string
          target_user_id: string
          workspace_name?: string
          workspace_slug?: string
        }
        Returns: string
      }
      current_user_role: { Args: never; Returns: string }
      current_workspace_id: { Args: never; Returns: string }
      doc_in_current_workspace: { Args: { doc_uuid: string }; Returns: boolean }
      is_admin: { Args: never; Returns: boolean }
      same_workspace: {
        Args: { target_workspace_id: string }
        Returns: boolean
      }
      search_docs: {
        Args: { search_query: string }
        Returns: {
          category_id: string
          id: string
          rank: number
          snippet: string
          tags: string[]
          title: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

// ====== DATABASE EXTENDED CONTEXT (auto-generated) ======
// This section contains actual PostgreSQL column types, constraints, RLS policies,
// functions, triggers, indexes and materialized views not present in the type definitions above.
// IMPORTANT: The TypeScript types above map UUID, TEXT, VARCHAR all to "string".
// Use the COLUMN TYPES section below to know the real PostgreSQL type for each column.
// Always use the correct PostgreSQL type when writing SQL migrations.

// --- COLUMN TYPES (actual PostgreSQL types) ---
// Use this to know the real database type when writing migrations.
// "string" in TypeScript types above may be uuid, text, varchar, timestamptz, etc.
// Table: activity_log
//   id: uuid (not null, default: gen_random_uuid())
//   workspace_id: uuid (nullable, default: current_workspace_id())
//   profile_id: uuid (nullable)
//   action: text (not null)
//   entity_type: text (nullable)
//   entity_id: uuid (nullable)
//   entity_title: text (nullable)
//   category_name: text (nullable)
//   payload: jsonb (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: agent_context_packs
//   id: uuid (not null, default: gen_random_uuid())
//   session_id: uuid (not null)
//   client_id: uuid (nullable)
//   current_module: text (nullable)
//   current_stage: text (nullable)
//   payload: jsonb (not null)
//   created_at: timestamp with time zone (not null, default: now())
// Table: agent_runs
//   id: uuid (not null, default: gen_random_uuid())
//   session_id: uuid (nullable)
//   parent_run_id: uuid (nullable)
//   agent_name: text (not null)
//   module: text (nullable)
//   status: text (not null, default: 'started'::text)
//   context_pack: jsonb (nullable)
//   result_payload: jsonb (nullable)
//   created_at: timestamp with time zone (not null, default: now())
//   finished_at: timestamp with time zone (nullable)
// Table: approval_decisions
//   id: uuid (not null, default: gen_random_uuid())
//   approval_item_id: uuid (not null)
//   decided_by: uuid (nullable)
//   decision: text (not null)
//   notes: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: approval_items
//   id: uuid (not null, default: gen_random_uuid())
//   workspace_id: uuid (not null, default: current_workspace_id())
//   client_id: uuid (nullable)
//   artifact_id: uuid (nullable)
//   required_approver_profile_id: uuid (nullable)
//   status: text (not null, default: 'pending'::text)
//   risk_level: text (nullable)
//   review_payload: jsonb (nullable)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
// Table: artifact_registry
//   id: uuid (not null, default: gen_random_uuid())
//   workspace_id: uuid (not null, default: current_workspace_id())
//   client_id: uuid (nullable)
//   job_id: uuid (nullable)
//   artifact_type: text (not null)
//   title: text (nullable)
//   approval_state: text (not null, default: 'draft'::text)
//   storage_mode: text (nullable)
//   doc_id: uuid (nullable)
//   json_payload: jsonb (nullable)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
// Table: attachments
//   id: uuid (not null, default: gen_random_uuid())
//   workspace_id: uuid (not null, default: current_workspace_id())
//   doc_id: uuid (nullable)
//   client_id: uuid (nullable)
//   file_name: text (not null)
//   storage_bucket: text (not null)
//   storage_path: text (not null)
//   mime_type: text (nullable)
//   public_url: text (nullable)
//   created_by: uuid (nullable)
//   created_at: timestamp with time zone (not null, default: now())
//   type: text (nullable)
//   title: text (nullable)
//   url: text (nullable)
//   thumbnail_url: text (nullable)
//   file_size: bigint (nullable)
// Table: categories
//   id: uuid (not null, default: gen_random_uuid())
//   workspace_id: uuid (nullable, default: current_workspace_id())
//   name: text (not null)
//   slug: text (not null)
//   icon: text (nullable)
//   display_order: integer (not null, default: 0)
//   parent_id: uuid (nullable)
//   module: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
// Table: client_asset_links
//   id: uuid (not null, default: gen_random_uuid())
//   client_id: uuid (not null)
//   artifact_id: uuid (not null)
//   relation_kind: text (not null, default: 'belongs_to'::text)
//   created_at: timestamp with time zone (not null, default: now())
// Table: client_operation_briefs
//   id: uuid (not null, default: gen_random_uuid())
//   workspace_id: uuid (not null)
//   client_id: uuid (not null)
//   payload: jsonb (not null)
//   created_by: uuid (nullable)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
// Table: client_operation_states
//   client_id: uuid (not null)
//   workspace_id: uuid (not null)
//   current_module: text (nullable)
//   current_stage: text (nullable)
//   next_required_job_kind: text (nullable)
//   approval_owner_profile_id: uuid (nullable)
//   is_blocked: boolean (not null, default: false)
//   block_reason: text (nullable)
//   last_transition_at: timestamp with time zone (nullable)
//   updated_at: timestamp with time zone (not null, default: now())
// Table: client_stage_history
//   id: uuid (not null, default: gen_random_uuid())
//   client_id: uuid (not null)
//   from_stage: text (nullable)
//   to_stage: text (not null)
//   transition_reason: text (nullable)
//   changed_by: uuid (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: clients
//   id: uuid (not null, default: gen_random_uuid())
//   workspace_id: uuid (not null, default: current_workspace_id())
//   name: text (not null)
//   slug: text (nullable)
//   segment: text (nullable)
//   business_model: text (nullable)
//   status: text (not null, default: 'active'::text)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
// Table: distribution_events
//   id: uuid (not null, default: gen_random_uuid())
//   distribution_job_id: uuid (not null)
//   event_type: text (not null)
//   payload: jsonb (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: distribution_jobs
//   id: uuid (not null, default: gen_random_uuid())
//   workspace_id: uuid (not null, default: current_workspace_id())
//   client_id: uuid (nullable)
//   artifact_id: uuid (not null)
//   destination_channel: text (not null)
//   status: text (not null, default: 'draft'::text)
//   scheduled_for: timestamp with time zone (nullable)
//   metadata: jsonb (nullable)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
// Table: doc_links
//   id: uuid (not null, default: gen_random_uuid())
//   from_doc_id: uuid (not null)
//   to_doc_id: uuid (not null)
//   link_kind: text (not null, default: 'reference'::text)
//   created_at: timestamp with time zone (not null, default: now())
// Table: doc_versions
//   id: uuid (not null, default: gen_random_uuid())
//   doc_id: uuid (not null)
//   profile_id: uuid (nullable)
//   title: text (nullable)
//   body_markdown: text (nullable)
//   change_summary: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: embedding_jobs
//   id: uuid (not null, default: gen_random_uuid())
//   source_id: uuid (nullable)
//   status: text (not null, default: 'pending'::text)
//   model_name: text (nullable)
//   error_message: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
// Table: jarvis_actions
//   id: uuid (not null, default: gen_random_uuid())
//   session_id: uuid (not null)
//   agent_run_id: uuid (nullable)
//   action_type: text (not null)
//   target_table: text (nullable)
//   target_record_id: uuid (nullable)
//   status: text (not null, default: 'proposed'::text)
//   approval_required: boolean (not null, default: true)
//   payload: jsonb (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: jarvis_messages
//   id: uuid (not null, default: gen_random_uuid())
//   session_id: uuid (not null)
//   role: text (not null)
//   input_mode: text (nullable)
//   content: text (nullable)
//   structured_payload: jsonb (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: jarvis_sessions
//   id: uuid (not null, default: gen_random_uuid())
//   workspace_id: uuid (not null, default: current_workspace_id())
//   profile_id: uuid (nullable)
//   client_id: uuid (nullable)
//   title: text (nullable)
//   status: text (not null, default: 'active'::text)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
// Table: job_assignments
//   id: uuid (not null, default: gen_random_uuid())
//   job_id: uuid (not null)
//   profile_id: uuid (nullable)
//   assigned_role: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: job_dependencies
//   id: uuid (not null, default: gen_random_uuid())
//   job_id: uuid (not null)
//   depends_on_job_id: uuid (not null)
//   dependency_kind: text (not null, default: 'requires'::text)
//   created_at: timestamp with time zone (not null, default: now())
// Table: job_outputs
//   id: uuid (not null, default: gen_random_uuid())
//   job_id: uuid (not null)
//   artifact_id: uuid (nullable)
//   output_type: text (not null)
//   payload: jsonb (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: jobs
//   id: uuid (not null, default: gen_random_uuid())
//   workspace_id: uuid (not null, default: current_workspace_id())
//   client_id: uuid (nullable)
//   kind: text (not null)
//   module: text (not null)
//   status: text (not null, default: 'draft'::text)
//   approval_state: text (not null, default: 'draft'::text)
//   owner_profile_id: uuid (nullable)
//   source_record_id: uuid (nullable)
//   input_payload: jsonb (nullable)
//   output_payload: jsonb (nullable)
//   blocker_reason: text (nullable)
//   created_by: uuid (nullable)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
// Table: knowledge_chunks
//   id: uuid (not null, default: gen_random_uuid())
//   source_id: uuid (not null)
//   workspace_id: uuid (not null)
//   client_id: uuid (nullable)
//   chunk_index: integer (not null)
//   chunk_text: text (not null)
//   chunk_summary: text (nullable)
//   token_count: integer (nullable)
//   embedding: vector (nullable)
//   metadata: jsonb (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: knowledge_sources
//   id: uuid (not null, default: gen_random_uuid())
//   workspace_id: uuid (not null, default: current_workspace_id())
//   client_id: uuid (nullable)
//   source_type: text (not null)
//   source_record_id: uuid (nullable)
//   title: text (nullable)
//   approval_state: text (not null, default: 'draft'::text)
//   metadata: jsonb (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: memory_entries
//   id: uuid (not null, default: gen_random_uuid())
//   workspace_id: uuid (not null, default: current_workspace_id())
//   client_id: uuid (nullable)
//   memory_type: text (not null)
//   title: text (not null)
//   summary: text (nullable)
//   body_markdown: text (nullable)
//   source_kind: text (nullable)
//   source_record_id: uuid (nullable)
//   confidence_level: text (nullable)
//   approved_for_retrieval: boolean (not null, default: false)
//   tags: _text (not null, default: '{}'::text[])
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
// Table: memory_links
//   id: uuid (not null, default: gen_random_uuid())
//   memory_id: uuid (not null)
//   linked_memory_id: uuid (not null)
//   relation_kind: text (not null, default: 'related'::text)
//   created_at: timestamp with time zone (not null, default: now())
// Table: performance_metrics
//   id: uuid (not null, default: gen_random_uuid())
//   distribution_job_id: uuid (nullable)
//   metric_name: text (not null)
//   metric_value: numeric (nullable)
//   recorded_at: timestamp with time zone (not null, default: now())
// Table: profiles
//   id: uuid (not null)
//   workspace_id: uuid (nullable)
//   full_name: text (nullable)
//   email: text (nullable)
//   role: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
// Table: retrieval_feedback
//   id: uuid (not null, default: gen_random_uuid())
//   session_id: uuid (nullable)
//   chunk_id: uuid (nullable)
//   score: integer (nullable)
//   feedback_note: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: tool_events
//   id: uuid (not null, default: gen_random_uuid())
//   agent_run_id: uuid (nullable)
//   tool_name: text (not null)
//   event_type: text (not null)
//   payload: jsonb (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: torq_docs
//   id: uuid (not null, default: gen_random_uuid())
//   workspace_id: uuid (not null, default: current_workspace_id())
//   client_id: uuid (nullable)
//   category_id: uuid (nullable)
//   title: text (not null)
//   slug: text (nullable)
//   body_markdown: text (nullable)
//   doc_type: text (nullable)
//   status: text (not null, default: 'draft'::text)
//   approval_state: text (not null, default: 'draft'::text)
//   tags: _text (not null, default: '{}'::text[])
//   created_by: uuid (nullable)
//   updated_by: uuid (nullable)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
//   content_markdown: text (nullable)
// Table: workspace_members
//   id: uuid (not null, default: gen_random_uuid())
//   workspace_id: uuid (not null)
//   profile_id: uuid (not null)
//   membership_role: text (not null)
//   created_at: timestamp with time zone (not null, default: now())
// Table: workspaces
//   id: uuid (not null, default: gen_random_uuid())
//   name: text (not null)
//   slug: text (not null)
//   created_at: timestamp with time zone (not null, default: now())

// --- CONSTRAINTS ---
// Table: activity_log
//   PRIMARY KEY activity_log_pkey: PRIMARY KEY (id)
//   FOREIGN KEY activity_log_profile_id_fkey: FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE SET NULL
//   FOREIGN KEY activity_log_workspace_id_fkey: FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
// Table: agent_context_packs
//   FOREIGN KEY agent_context_packs_client_id_fkey: FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
//   PRIMARY KEY agent_context_packs_pkey: PRIMARY KEY (id)
//   FOREIGN KEY agent_context_packs_session_id_fkey: FOREIGN KEY (session_id) REFERENCES jarvis_sessions(id) ON DELETE CASCADE
// Table: agent_runs
//   FOREIGN KEY agent_runs_parent_run_id_fkey: FOREIGN KEY (parent_run_id) REFERENCES agent_runs(id) ON DELETE CASCADE
//   PRIMARY KEY agent_runs_pkey: PRIMARY KEY (id)
//   FOREIGN KEY agent_runs_session_id_fkey: FOREIGN KEY (session_id) REFERENCES jarvis_sessions(id) ON DELETE CASCADE
// Table: approval_decisions
//   FOREIGN KEY approval_decisions_approval_item_id_fkey: FOREIGN KEY (approval_item_id) REFERENCES approval_items(id) ON DELETE CASCADE
//   FOREIGN KEY approval_decisions_decided_by_fkey: FOREIGN KEY (decided_by) REFERENCES profiles(id) ON DELETE SET NULL
//   PRIMARY KEY approval_decisions_pkey: PRIMARY KEY (id)
// Table: approval_items
//   FOREIGN KEY approval_items_artifact_id_fkey: FOREIGN KEY (artifact_id) REFERENCES artifact_registry(id) ON DELETE CASCADE
//   FOREIGN KEY approval_items_client_id_fkey: FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
//   PRIMARY KEY approval_items_pkey: PRIMARY KEY (id)
//   FOREIGN KEY approval_items_required_approver_profile_id_fkey: FOREIGN KEY (required_approver_profile_id) REFERENCES profiles(id) ON DELETE SET NULL
//   FOREIGN KEY approval_items_workspace_id_fkey: FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
// Table: artifact_registry
//   FOREIGN KEY artifact_registry_client_id_fkey: FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
//   FOREIGN KEY artifact_registry_doc_id_fkey: FOREIGN KEY (doc_id) REFERENCES torq_docs(id) ON DELETE SET NULL
//   FOREIGN KEY artifact_registry_job_id_fkey: FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE SET NULL
//   PRIMARY KEY artifact_registry_pkey: PRIMARY KEY (id)
//   FOREIGN KEY artifact_registry_workspace_id_fkey: FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
// Table: attachments
//   FOREIGN KEY attachments_client_id_fkey: FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL
//   FOREIGN KEY attachments_created_by_fkey: FOREIGN KEY (created_by) REFERENCES profiles(id) ON DELETE SET NULL
//   FOREIGN KEY attachments_doc_id_fkey: FOREIGN KEY (doc_id) REFERENCES torq_docs(id) ON DELETE CASCADE
//   PRIMARY KEY attachments_pkey: PRIMARY KEY (id)
//   FOREIGN KEY attachments_workspace_id_fkey: FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
// Table: categories
//   FOREIGN KEY categories_parent_id_fkey: FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE CASCADE
//   PRIMARY KEY categories_pkey: PRIMARY KEY (id)
//   FOREIGN KEY categories_workspace_id_fkey: FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
//   UNIQUE categories_workspace_id_slug_key: UNIQUE (workspace_id, slug)
// Table: client_asset_links
//   FOREIGN KEY client_asset_links_artifact_id_fkey: FOREIGN KEY (artifact_id) REFERENCES artifact_registry(id) ON DELETE CASCADE
//   UNIQUE client_asset_links_client_id_artifact_id_relation_kind_key: UNIQUE (client_id, artifact_id, relation_kind)
//   FOREIGN KEY client_asset_links_client_id_fkey: FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
//   PRIMARY KEY client_asset_links_pkey: PRIMARY KEY (id)
// Table: client_operation_briefs
//   FOREIGN KEY client_operation_briefs_client_id_fkey: FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
//   FOREIGN KEY client_operation_briefs_created_by_fkey: FOREIGN KEY (created_by) REFERENCES profiles(id) ON DELETE SET NULL
//   PRIMARY KEY client_operation_briefs_pkey: PRIMARY KEY (id)
//   FOREIGN KEY client_operation_briefs_workspace_id_fkey: FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
// Table: client_operation_states
//   FOREIGN KEY client_operation_states_approval_owner_profile_id_fkey: FOREIGN KEY (approval_owner_profile_id) REFERENCES profiles(id) ON DELETE SET NULL
//   FOREIGN KEY client_operation_states_client_id_fkey: FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
//   PRIMARY KEY client_operation_states_pkey: PRIMARY KEY (client_id)
//   FOREIGN KEY client_operation_states_workspace_id_fkey: FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
// Table: client_stage_history
//   FOREIGN KEY client_stage_history_changed_by_fkey: FOREIGN KEY (changed_by) REFERENCES profiles(id) ON DELETE SET NULL
//   FOREIGN KEY client_stage_history_client_id_fkey: FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
//   PRIMARY KEY client_stage_history_pkey: PRIMARY KEY (id)
// Table: clients
//   PRIMARY KEY clients_pkey: PRIMARY KEY (id)
//   FOREIGN KEY clients_workspace_id_fkey: FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
// Table: distribution_events
//   FOREIGN KEY distribution_events_distribution_job_id_fkey: FOREIGN KEY (distribution_job_id) REFERENCES distribution_jobs(id) ON DELETE CASCADE
//   PRIMARY KEY distribution_events_pkey: PRIMARY KEY (id)
// Table: distribution_jobs
//   FOREIGN KEY distribution_jobs_artifact_id_fkey: FOREIGN KEY (artifact_id) REFERENCES artifact_registry(id) ON DELETE CASCADE
//   FOREIGN KEY distribution_jobs_client_id_fkey: FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
//   PRIMARY KEY distribution_jobs_pkey: PRIMARY KEY (id)
//   FOREIGN KEY distribution_jobs_workspace_id_fkey: FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
// Table: doc_links
//   FOREIGN KEY doc_links_from_doc_id_fkey: FOREIGN KEY (from_doc_id) REFERENCES torq_docs(id) ON DELETE CASCADE
//   UNIQUE doc_links_from_doc_id_to_doc_id_link_kind_key: UNIQUE (from_doc_id, to_doc_id, link_kind)
//   PRIMARY KEY doc_links_pkey: PRIMARY KEY (id)
//   FOREIGN KEY doc_links_to_doc_id_fkey: FOREIGN KEY (to_doc_id) REFERENCES torq_docs(id) ON DELETE CASCADE
// Table: doc_versions
//   FOREIGN KEY doc_versions_doc_id_fkey: FOREIGN KEY (doc_id) REFERENCES torq_docs(id) ON DELETE CASCADE
//   PRIMARY KEY doc_versions_pkey: PRIMARY KEY (id)
//   FOREIGN KEY doc_versions_profile_id_fkey: FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE SET NULL
// Table: embedding_jobs
//   PRIMARY KEY embedding_jobs_pkey: PRIMARY KEY (id)
//   FOREIGN KEY embedding_jobs_source_id_fkey: FOREIGN KEY (source_id) REFERENCES knowledge_sources(id) ON DELETE CASCADE
// Table: jarvis_actions
//   FOREIGN KEY jarvis_actions_agent_run_id_fkey: FOREIGN KEY (agent_run_id) REFERENCES agent_runs(id) ON DELETE SET NULL
//   PRIMARY KEY jarvis_actions_pkey: PRIMARY KEY (id)
//   FOREIGN KEY jarvis_actions_session_id_fkey: FOREIGN KEY (session_id) REFERENCES jarvis_sessions(id) ON DELETE CASCADE
// Table: jarvis_messages
//   PRIMARY KEY jarvis_messages_pkey: PRIMARY KEY (id)
//   FOREIGN KEY jarvis_messages_session_id_fkey: FOREIGN KEY (session_id) REFERENCES jarvis_sessions(id) ON DELETE CASCADE
// Table: jarvis_sessions
//   FOREIGN KEY jarvis_sessions_client_id_fkey: FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL
//   PRIMARY KEY jarvis_sessions_pkey: PRIMARY KEY (id)
//   FOREIGN KEY jarvis_sessions_profile_id_fkey: FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE SET NULL
//   FOREIGN KEY jarvis_sessions_workspace_id_fkey: FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
// Table: job_assignments
//   FOREIGN KEY job_assignments_job_id_fkey: FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
//   UNIQUE job_assignments_job_id_profile_id_key: UNIQUE (job_id, profile_id)
//   PRIMARY KEY job_assignments_pkey: PRIMARY KEY (id)
//   FOREIGN KEY job_assignments_profile_id_fkey: FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE SET NULL
// Table: job_dependencies
//   FOREIGN KEY job_dependencies_depends_on_job_id_fkey: FOREIGN KEY (depends_on_job_id) REFERENCES jobs(id) ON DELETE CASCADE
//   UNIQUE job_dependencies_job_id_depends_on_job_id_key: UNIQUE (job_id, depends_on_job_id)
//   FOREIGN KEY job_dependencies_job_id_fkey: FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
//   PRIMARY KEY job_dependencies_pkey: PRIMARY KEY (id)
// Table: job_outputs
//   FOREIGN KEY job_outputs_artifact_id_fkey: FOREIGN KEY (artifact_id) REFERENCES artifact_registry(id) ON DELETE SET NULL
//   FOREIGN KEY job_outputs_job_id_fkey: FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
//   PRIMARY KEY job_outputs_pkey: PRIMARY KEY (id)
// Table: jobs
//   FOREIGN KEY jobs_client_id_fkey: FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
//   FOREIGN KEY jobs_created_by_fkey: FOREIGN KEY (created_by) REFERENCES profiles(id) ON DELETE SET NULL
//   FOREIGN KEY jobs_owner_profile_id_fkey: FOREIGN KEY (owner_profile_id) REFERENCES profiles(id) ON DELETE SET NULL
//   PRIMARY KEY jobs_pkey: PRIMARY KEY (id)
//   FOREIGN KEY jobs_workspace_id_fkey: FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
// Table: knowledge_chunks
//   FOREIGN KEY knowledge_chunks_client_id_fkey: FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
//   PRIMARY KEY knowledge_chunks_pkey: PRIMARY KEY (id)
//   UNIQUE knowledge_chunks_source_id_chunk_index_key: UNIQUE (source_id, chunk_index)
//   FOREIGN KEY knowledge_chunks_source_id_fkey: FOREIGN KEY (source_id) REFERENCES knowledge_sources(id) ON DELETE CASCADE
//   FOREIGN KEY knowledge_chunks_workspace_id_fkey: FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
// Table: knowledge_sources
//   FOREIGN KEY knowledge_sources_client_id_fkey: FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
//   PRIMARY KEY knowledge_sources_pkey: PRIMARY KEY (id)
//   FOREIGN KEY knowledge_sources_workspace_id_fkey: FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
// Table: memory_entries
//   FOREIGN KEY memory_entries_client_id_fkey: FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
//   PRIMARY KEY memory_entries_pkey: PRIMARY KEY (id)
//   FOREIGN KEY memory_entries_workspace_id_fkey: FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
// Table: memory_links
//   FOREIGN KEY memory_links_linked_memory_id_fkey: FOREIGN KEY (linked_memory_id) REFERENCES memory_entries(id) ON DELETE CASCADE
//   FOREIGN KEY memory_links_memory_id_fkey: FOREIGN KEY (memory_id) REFERENCES memory_entries(id) ON DELETE CASCADE
//   UNIQUE memory_links_memory_id_linked_memory_id_relation_kind_key: UNIQUE (memory_id, linked_memory_id, relation_kind)
//   PRIMARY KEY memory_links_pkey: PRIMARY KEY (id)
// Table: performance_metrics
//   FOREIGN KEY performance_metrics_distribution_job_id_fkey: FOREIGN KEY (distribution_job_id) REFERENCES distribution_jobs(id) ON DELETE CASCADE
//   PRIMARY KEY performance_metrics_pkey: PRIMARY KEY (id)
// Table: profiles
//   FOREIGN KEY profiles_id_fkey: FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
//   PRIMARY KEY profiles_pkey: PRIMARY KEY (id)
//   FOREIGN KEY profiles_workspace_id_fkey: FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE SET NULL
// Table: retrieval_feedback
//   FOREIGN KEY retrieval_feedback_chunk_id_fkey: FOREIGN KEY (chunk_id) REFERENCES knowledge_chunks(id) ON DELETE CASCADE
//   PRIMARY KEY retrieval_feedback_pkey: PRIMARY KEY (id)
// Table: tool_events
//   FOREIGN KEY tool_events_agent_run_id_fkey: FOREIGN KEY (agent_run_id) REFERENCES agent_runs(id) ON DELETE CASCADE
//   PRIMARY KEY tool_events_pkey: PRIMARY KEY (id)
// Table: torq_docs
//   FOREIGN KEY torq_docs_category_id_fkey: FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
//   FOREIGN KEY torq_docs_client_id_fkey: FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL
//   FOREIGN KEY torq_docs_created_by_fkey: FOREIGN KEY (created_by) REFERENCES profiles(id) ON DELETE SET NULL
//   PRIMARY KEY torq_docs_pkey: PRIMARY KEY (id)
//   FOREIGN KEY torq_docs_updated_by_fkey: FOREIGN KEY (updated_by) REFERENCES profiles(id) ON DELETE SET NULL
//   FOREIGN KEY torq_docs_workspace_id_fkey: FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
// Table: workspace_members
//   PRIMARY KEY workspace_members_pkey: PRIMARY KEY (id)
//   FOREIGN KEY workspace_members_profile_id_fkey: FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
//   FOREIGN KEY workspace_members_workspace_id_fkey: FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
//   UNIQUE workspace_members_workspace_id_profile_id_key: UNIQUE (workspace_id, profile_id)
// Table: workspaces
//   PRIMARY KEY workspaces_pkey: PRIMARY KEY (id)
//   UNIQUE workspaces_slug_key: UNIQUE (slug)

// --- ROW LEVEL SECURITY POLICIES ---
// Table: activity_log
//   Policy "activity_log_manage_admin" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (is_admin() AND ((workspace_id IS NULL) OR same_workspace(workspace_id)))
//     WITH CHECK: (is_admin() AND ((workspace_id IS NULL) OR same_workspace(workspace_id)))
//   Policy "activity_log_select_same_workspace" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: ((workspace_id IS NULL) OR same_workspace(workspace_id))
// Table: agent_context_packs
//   Policy "agent_context_packs_manage_admin" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM jarvis_sessions js   WHERE ((js.id = agent_context_packs.session_id) AND same_workspace(js.workspace_id) AND is_admin())))
//     WITH CHECK: (EXISTS ( SELECT 1    FROM jarvis_sessions js   WHERE ((js.id = agent_context_packs.session_id) AND same_workspace(js.workspace_id) AND is_admin())))
//   Policy "agent_context_packs_select_session_workspace" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM jarvis_sessions js   WHERE ((js.id = agent_context_packs.session_id) AND same_workspace(js.workspace_id))))
// Table: agent_runs
//   Policy "agent_runs_manage_admin" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM jarvis_sessions js   WHERE ((js.id = agent_runs.session_id) AND same_workspace(js.workspace_id) AND is_admin())))
//     WITH CHECK: (EXISTS ( SELECT 1    FROM jarvis_sessions js   WHERE ((js.id = agent_runs.session_id) AND same_workspace(js.workspace_id) AND is_admin())))
//   Policy "agent_runs_select_session_workspace" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM jarvis_sessions js   WHERE ((js.id = agent_runs.session_id) AND same_workspace(js.workspace_id))))
// Table: approval_decisions
//   Policy "approval_decisions_manage_admin" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM approval_items ai   WHERE ((ai.id = approval_decisions.approval_item_id) AND same_workspace(ai.workspace_id) AND is_admin())))
//     WITH CHECK: (EXISTS ( SELECT 1    FROM approval_items ai   WHERE ((ai.id = approval_decisions.approval_item_id) AND same_workspace(ai.workspace_id) AND is_admin())))
//   Policy "approval_decisions_select_workspace" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM approval_items ai   WHERE ((ai.id = approval_decisions.approval_item_id) AND same_workspace(ai.workspace_id))))
// Table: approval_items
//   Policy "approval_items_manage_admin" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (same_workspace(workspace_id) AND is_admin())
//     WITH CHECK: (same_workspace(workspace_id) AND is_admin())
//   Policy "approval_items_select_same_workspace" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: same_workspace(workspace_id)
// Table: artifact_registry
//   Policy "artifact_registry_manage_admin" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (same_workspace(workspace_id) AND is_admin())
//     WITH CHECK: (same_workspace(workspace_id) AND is_admin())
//   Policy "artifact_registry_select_same_workspace" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: same_workspace(workspace_id)
// Table: attachments
//   Policy "attachments_manage_admin" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (same_workspace(workspace_id) AND is_admin())
//     WITH CHECK: (same_workspace(workspace_id) AND is_admin())
//   Policy "attachments_select_scoped" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (same_workspace(workspace_id) OR ((doc_id IS NOT NULL) AND doc_in_current_workspace(doc_id)))
// Table: categories
//   Policy "categories_manage_admin" (ALL, PERMISSIVE) roles={authenticated}
//     USING: ((workspace_id IS NOT NULL) AND same_workspace(workspace_id) AND is_admin())
//     WITH CHECK: ((workspace_id IS NOT NULL) AND same_workspace(workspace_id) AND is_admin())
//   Policy "categories_select_scoped" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: ((workspace_id IS NULL) OR same_workspace(workspace_id))
// Table: client_asset_links
//   Policy "client_asset_links_manage_admin" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM clients c   WHERE ((c.id = client_asset_links.client_id) AND same_workspace(c.workspace_id) AND is_admin())))
//     WITH CHECK: (EXISTS ( SELECT 1    FROM clients c   WHERE ((c.id = client_asset_links.client_id) AND same_workspace(c.workspace_id) AND is_admin())))
//   Policy "client_asset_links_select_workspace" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM clients c   WHERE ((c.id = client_asset_links.client_id) AND same_workspace(c.workspace_id))))
// Table: client_operation_briefs
//   Policy "client_operation_briefs_manage_admin" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (same_workspace(workspace_id) AND is_admin())
//     WITH CHECK: (same_workspace(workspace_id) AND is_admin())
//   Policy "client_operation_briefs_select_same_workspace" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: same_workspace(workspace_id)
// Table: client_operation_states
//   Policy "client_operation_states_manage_admin" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (same_workspace(workspace_id) AND is_admin())
//     WITH CHECK: (same_workspace(workspace_id) AND is_admin())
//   Policy "client_operation_states_select_same_workspace" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: same_workspace(workspace_id)
// Table: client_stage_history
//   Policy "client_stage_history_manage_admin" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM clients c   WHERE ((c.id = client_stage_history.client_id) AND same_workspace(c.workspace_id) AND is_admin())))
//     WITH CHECK: (EXISTS ( SELECT 1    FROM clients c   WHERE ((c.id = client_stage_history.client_id) AND same_workspace(c.workspace_id) AND is_admin())))
//   Policy "client_stage_history_select_same_workspace" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM clients c   WHERE ((c.id = client_stage_history.client_id) AND same_workspace(c.workspace_id))))
// Table: clients
//   Policy "clients_manage_admin" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (same_workspace(workspace_id) AND is_admin())
//     WITH CHECK: (same_workspace(workspace_id) AND is_admin())
//   Policy "clients_select_same_workspace" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: same_workspace(workspace_id)
// Table: distribution_events
//   Policy "distribution_events_manage_admin" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM distribution_jobs dj   WHERE ((dj.id = distribution_events.distribution_job_id) AND same_workspace(dj.workspace_id) AND is_admin())))
//     WITH CHECK: (EXISTS ( SELECT 1    FROM distribution_jobs dj   WHERE ((dj.id = distribution_events.distribution_job_id) AND same_workspace(dj.workspace_id) AND is_admin())))
//   Policy "distribution_events_select_workspace" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM distribution_jobs dj   WHERE ((dj.id = distribution_events.distribution_job_id) AND same_workspace(dj.workspace_id))))
// Table: distribution_jobs
//   Policy "distribution_jobs_manage_admin" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (same_workspace(workspace_id) AND is_admin())
//     WITH CHECK: (same_workspace(workspace_id) AND is_admin())
//   Policy "distribution_jobs_select_same_workspace" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: same_workspace(workspace_id)
// Table: doc_links
//   Policy "doc_links_manage_admin" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (doc_in_current_workspace(from_doc_id) AND doc_in_current_workspace(to_doc_id) AND is_admin())
//     WITH CHECK: (doc_in_current_workspace(from_doc_id) AND doc_in_current_workspace(to_doc_id) AND is_admin())
//   Policy "doc_links_select_doc_workspace" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (doc_in_current_workspace(from_doc_id) AND doc_in_current_workspace(to_doc_id))
// Table: doc_versions
//   Policy "doc_versions_manage_admin" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (doc_in_current_workspace(doc_id) AND is_admin())
//     WITH CHECK: (doc_in_current_workspace(doc_id) AND is_admin())
//   Policy "doc_versions_select_doc_workspace" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: doc_in_current_workspace(doc_id)
// Table: embedding_jobs
//   Policy "embedding_jobs_manage_admin" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM knowledge_sources s   WHERE ((s.id = embedding_jobs.source_id) AND same_workspace(s.workspace_id) AND is_admin())))
//     WITH CHECK: (EXISTS ( SELECT 1    FROM knowledge_sources s   WHERE ((s.id = embedding_jobs.source_id) AND same_workspace(s.workspace_id) AND is_admin())))
//   Policy "embedding_jobs_select_workspace" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM knowledge_sources s   WHERE ((s.id = embedding_jobs.source_id) AND same_workspace(s.workspace_id))))
// Table: jarvis_actions
//   Policy "jarvis_actions_manage_admin" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM jarvis_sessions js   WHERE ((js.id = jarvis_actions.session_id) AND same_workspace(js.workspace_id) AND is_admin())))
//     WITH CHECK: (EXISTS ( SELECT 1    FROM jarvis_sessions js   WHERE ((js.id = jarvis_actions.session_id) AND same_workspace(js.workspace_id) AND is_admin())))
//   Policy "jarvis_actions_select_session_workspace" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM jarvis_sessions js   WHERE ((js.id = jarvis_actions.session_id) AND same_workspace(js.workspace_id))))
// Table: jarvis_messages
//   Policy "jarvis_messages_insert_session_owner" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: (EXISTS ( SELECT 1    FROM jarvis_sessions js   WHERE ((js.id = jarvis_messages.session_id) AND same_workspace(js.workspace_id) AND ((js.profile_id = auth.uid()) OR is_admin()))))
//   Policy "jarvis_messages_select_session_workspace" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM jarvis_sessions js   WHERE ((js.id = jarvis_messages.session_id) AND same_workspace(js.workspace_id))))
// Table: jarvis_sessions
//   Policy "jarvis_sessions_insert_self" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: (same_workspace(workspace_id) AND (profile_id = auth.uid()))
//   Policy "jarvis_sessions_select_same_workspace" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: same_workspace(workspace_id)
//   Policy "jarvis_sessions_update_self_or_admin" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: (same_workspace(workspace_id) AND ((profile_id = auth.uid()) OR is_admin()))
//     WITH CHECK: (same_workspace(workspace_id) AND ((profile_id = auth.uid()) OR is_admin()))
// Table: job_assignments
//   Policy "job_assignments_manage_admin" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM jobs j   WHERE ((j.id = job_assignments.job_id) AND same_workspace(j.workspace_id) AND is_admin())))
//     WITH CHECK: (EXISTS ( SELECT 1    FROM jobs j   WHERE ((j.id = job_assignments.job_id) AND same_workspace(j.workspace_id) AND is_admin())))
//   Policy "job_assignments_select_job_workspace" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM jobs j   WHERE ((j.id = job_assignments.job_id) AND same_workspace(j.workspace_id))))
// Table: job_dependencies
//   Policy "job_dependencies_manage_admin" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM jobs j   WHERE ((j.id = job_dependencies.job_id) AND same_workspace(j.workspace_id) AND is_admin())))
//     WITH CHECK: (EXISTS ( SELECT 1    FROM jobs j   WHERE ((j.id = job_dependencies.job_id) AND same_workspace(j.workspace_id) AND is_admin())))
//   Policy "job_dependencies_select_job_workspace" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM jobs j   WHERE ((j.id = job_dependencies.job_id) AND same_workspace(j.workspace_id))))
// Table: job_outputs
//   Policy "job_outputs_manage_admin" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM jobs j   WHERE ((j.id = job_outputs.job_id) AND same_workspace(j.workspace_id) AND is_admin())))
//     WITH CHECK: (EXISTS ( SELECT 1    FROM jobs j   WHERE ((j.id = job_outputs.job_id) AND same_workspace(j.workspace_id) AND is_admin())))
//   Policy "job_outputs_select_job_workspace" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM jobs j   WHERE ((j.id = job_outputs.job_id) AND same_workspace(j.workspace_id))))
// Table: jobs
//   Policy "jobs_manage_admin" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (same_workspace(workspace_id) AND is_admin())
//     WITH CHECK: (same_workspace(workspace_id) AND is_admin())
//   Policy "jobs_select_same_workspace" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: same_workspace(workspace_id)
// Table: knowledge_chunks
//   Policy "knowledge_chunks_manage_admin" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (same_workspace(workspace_id) AND is_admin())
//     WITH CHECK: (same_workspace(workspace_id) AND is_admin())
//   Policy "knowledge_chunks_select_same_workspace" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: same_workspace(workspace_id)
// Table: knowledge_sources
//   Policy "knowledge_sources_manage_admin" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (same_workspace(workspace_id) AND is_admin())
//     WITH CHECK: (same_workspace(workspace_id) AND is_admin())
//   Policy "knowledge_sources_select_same_workspace" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: same_workspace(workspace_id)
// Table: memory_entries
//   Policy "memory_entries_manage_admin" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (same_workspace(workspace_id) AND is_admin())
//     WITH CHECK: (same_workspace(workspace_id) AND is_admin())
//   Policy "memory_entries_select_same_workspace" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: same_workspace(workspace_id)
// Table: memory_links
//   Policy "memory_links_manage_admin" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM memory_entries m   WHERE ((m.id = memory_links.memory_id) AND same_workspace(m.workspace_id) AND is_admin())))
//     WITH CHECK: (EXISTS ( SELECT 1    FROM memory_entries m   WHERE ((m.id = memory_links.memory_id) AND same_workspace(m.workspace_id) AND is_admin())))
//   Policy "memory_links_select_workspace" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM memory_entries m   WHERE ((m.id = memory_links.memory_id) AND same_workspace(m.workspace_id))))
// Table: performance_metrics
//   Policy "performance_metrics_manage_admin" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM distribution_jobs dj   WHERE ((dj.id = performance_metrics.distribution_job_id) AND same_workspace(dj.workspace_id) AND is_admin())))
//     WITH CHECK: (EXISTS ( SELECT 1    FROM distribution_jobs dj   WHERE ((dj.id = performance_metrics.distribution_job_id) AND same_workspace(dj.workspace_id) AND is_admin())))
//   Policy "performance_metrics_select_workspace" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM distribution_jobs dj   WHERE ((dj.id = performance_metrics.distribution_job_id) AND same_workspace(dj.workspace_id))))
// Table: profiles
//   Policy "profiles_select_same_workspace" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: ((id = auth.uid()) OR same_workspace(workspace_id))
//   Policy "profiles_update_self_or_admin" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: ((id = auth.uid()) OR (same_workspace(workspace_id) AND is_admin()))
//     WITH CHECK: ((id = auth.uid()) OR (same_workspace(workspace_id) AND is_admin()))
// Table: retrieval_feedback
//   Policy "retrieval_feedback_insert_scoped" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: (((chunk_id IS NOT NULL) AND (EXISTS ( SELECT 1    FROM knowledge_chunks kc   WHERE ((kc.id = retrieval_feedback.chunk_id) AND same_workspace(kc.workspace_id))))) OR ((session_id IS NOT NULL) AND (EXISTS ( SELECT 1    FROM jarvis_sessions js   WHERE ((js.id = retrieval_feedback.session_id) AND same_workspace(js.workspace_id))))))
//   Policy "retrieval_feedback_select_scoped" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (((chunk_id IS NOT NULL) AND (EXISTS ( SELECT 1    FROM knowledge_chunks kc   WHERE ((kc.id = retrieval_feedback.chunk_id) AND same_workspace(kc.workspace_id))))) OR ((session_id IS NOT NULL) AND (EXISTS ( SELECT 1    FROM jarvis_sessions js   WHERE ((js.id = retrieval_feedback.session_id) AND same_workspace(js.workspace_id))))))
// Table: tool_events
//   Policy "tool_events_manage_admin" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM (agent_runs ar      JOIN jarvis_sessions js ON ((js.id = ar.session_id)))   WHERE ((ar.id = tool_events.agent_run_id) AND same_workspace(js.workspace_id) AND is_admin())))
//     WITH CHECK: (EXISTS ( SELECT 1    FROM (agent_runs ar      JOIN jarvis_sessions js ON ((js.id = ar.session_id)))   WHERE ((ar.id = tool_events.agent_run_id) AND same_workspace(js.workspace_id) AND is_admin())))
//   Policy "tool_events_select_run_workspace" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM (agent_runs ar      JOIN jarvis_sessions js ON ((js.id = ar.session_id)))   WHERE ((ar.id = tool_events.agent_run_id) AND same_workspace(js.workspace_id))))
// Table: torq_docs
//   Policy "torq_docs_manage_admin" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (same_workspace(workspace_id) AND is_admin())
//     WITH CHECK: (same_workspace(workspace_id) AND is_admin())
//   Policy "torq_docs_select_same_workspace" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: same_workspace(workspace_id)
// Table: workspace_members
//   Policy "workspace_members_manage_admin" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (same_workspace(workspace_id) AND is_admin())
//     WITH CHECK: (same_workspace(workspace_id) AND is_admin())
//   Policy "workspace_members_select_same_workspace" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: same_workspace(workspace_id)
// Table: workspaces
//   Policy "workspaces_select_same_workspace" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (id = current_workspace_id())
//   Policy "workspaces_update_admin" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: ((id = current_workspace_id()) AND is_admin())
//     WITH CHECK: ((id = current_workspace_id()) AND is_admin())

// --- DATABASE FUNCTIONS ---
// FUNCTION bootstrap_torq_operator(uuid, text, text, text)
//   CREATE OR REPLACE FUNCTION public.bootstrap_torq_operator(target_user_id uuid, workspace_name text DEFAULT NULL::text, workspace_slug text DEFAULT NULL::text, operator_full_name text DEFAULT NULL::text)
//    RETURNS uuid
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//    SET search_path TO 'public', 'auth'
//   AS $function$
//   declare
//     auth_email text;
//     resolved_workspace_id uuid;
//     resolved_workspace_name text;
//     resolved_workspace_slug text;
//   begin
//     select u.email
//     into auth_email
//     from auth.users u
//     where u.id = target_user_id
//     limit 1;
//
//     if auth_email is null then
//       raise exception 'Auth user % not found', target_user_id;
//     end if;
//
//     select p.workspace_id
//     into resolved_workspace_id
//     from public.profiles p
//     where p.id = target_user_id
//     limit 1;
//
//     if resolved_workspace_id is null then
//       resolved_workspace_name := coalesce(
//         nullif(workspace_name, ''),
//         initcap(split_part(auth_email, '@', 1)) || ' Workspace'
//       );
//
//       resolved_workspace_slug := lower(regexp_replace(
//         coalesce(nullif(workspace_slug, ''), split_part(auth_email, '@', 1)),
//         '[^a-z0-9]+',
//         '-',
//         'g'
//       ));
//
//       insert into public.workspaces (name, slug)
//       values (
//         resolved_workspace_name,
//         concat(resolved_workspace_slug, '-', substr(replace(target_user_id::text, '-', ''), 1, 8))
//       )
//       returning id into resolved_workspace_id;
//     end if;
//
//     insert into public.profiles (id, workspace_id, full_name, email, role)
//     values (
//       target_user_id,
//       resolved_workspace_id,
//       operator_full_name,
//       auth_email,
//       'owner'
//     )
//     on conflict (id) do update
//     set
//       workspace_id = coalesce(public.profiles.workspace_id, excluded.workspace_id),
//       full_name = coalesce(public.profiles.full_name, excluded.full_name),
//       email = coalesce(public.profiles.email, excluded.email),
//       role = coalesce(public.profiles.role, excluded.role);
//
//     insert into public.workspace_members (workspace_id, profile_id, membership_role)
//     values (resolved_workspace_id, target_user_id, 'owner')
//     on conflict (workspace_id, profile_id) do nothing;
//
//     return resolved_workspace_id;
//   end;
//   $function$
//
// FUNCTION current_user_role()
//   CREATE OR REPLACE FUNCTION public.current_user_role()
//    RETURNS text
//    LANGUAGE sql
//    STABLE SECURITY DEFINER
//    SET search_path TO 'public'
//   AS $function$
//     select p.role
//     from public.profiles p
//     where p.id = auth.uid()
//     limit 1
//   $function$
//
// FUNCTION current_workspace_id()
//   CREATE OR REPLACE FUNCTION public.current_workspace_id()
//    RETURNS uuid
//    LANGUAGE sql
//    STABLE SECURITY DEFINER
//    SET search_path TO 'public'
//   AS $function$
//     select p.workspace_id
//     from public.profiles p
//     where p.id = auth.uid()
//     limit 1
//   $function$
//
// FUNCTION doc_in_current_workspace(uuid)
//   CREATE OR REPLACE FUNCTION public.doc_in_current_workspace(doc_uuid uuid)
//    RETURNS boolean
//    LANGUAGE sql
//    STABLE SECURITY DEFINER
//    SET search_path TO 'public'
//   AS $function$
//     select exists (
//       select 1
//       from public.torq_docs d
//       where d.id = doc_uuid
//         and d.workspace_id = public.current_workspace_id()
//     )
//   $function$
//
// FUNCTION is_admin()
//   CREATE OR REPLACE FUNCTION public.is_admin()
//    RETURNS boolean
//    LANGUAGE sql
//    STABLE SECURITY DEFINER
//    SET search_path TO 'public'
//   AS $function$
//     select coalesce(public.current_user_role() in ('admin', 'owner'), false)
//   $function$
//
// FUNCTION same_workspace(uuid)
//   CREATE OR REPLACE FUNCTION public.same_workspace(target_workspace_id uuid)
//    RETURNS boolean
//    LANGUAGE sql
//    STABLE SECURITY DEFINER
//    SET search_path TO 'public'
//   AS $function$
//     select target_workspace_id is not distinct from public.current_workspace_id()
//   $function$
//
// FUNCTION search_docs(text)
//   CREATE OR REPLACE FUNCTION public.search_docs(search_query text)
//    RETURNS TABLE(id uuid, title text, category_id uuid, tags text[], snippet text, rank real)
//    LANGUAGE sql
//    STABLE
//   AS $function$
//     with docs as (
//       select
//         d.id,
//         d.title,
//         d.category_id,
//         d.tags,
//         coalesce(d.content_markdown, d.body_markdown, '') as searchable_text
//       from public.torq_docs d
//       where coalesce(search_query, '') <> ''
//     ),
//     ranked as (
//       select
//         d.id,
//         d.title,
//         d.category_id,
//         d.tags,
//         ts_headline(
//           'simple',
//           d.searchable_text,
//           plainto_tsquery('simple', search_query),
//           'MaxWords=18, MinWords=8, StartSel=**, StopSel=**'
//         ) as snippet,
//         ts_rank(
//           to_tsvector('simple', coalesce(d.title, '') || ' ' || d.searchable_text || ' ' || coalesce(array_to_string(d.tags, ' '), '')),
//           plainto_tsquery('simple', search_query)
//         ) as rank
//       from docs d
//       where to_tsvector('simple', coalesce(d.title, '') || ' ' || d.searchable_text || ' ' || coalesce(array_to_string(d.tags, ' '), ''))
//         @@ plainto_tsquery('simple', search_query)
//     )
//     select id, title, category_id, tags, snippet, rank
//     from ranked
//     order by rank desc, title asc
//     limit 20;
//   $function$
//
// FUNCTION set_updated_at()
//   CREATE OR REPLACE FUNCTION public.set_updated_at()
//    RETURNS trigger
//    LANGUAGE plpgsql
//   AS $function$
//   begin
//     new.updated_at := now();
//     return new;
//   end;
//   $function$
//
// FUNCTION sync_torq_docs_markdown()
//   CREATE OR REPLACE FUNCTION public.sync_torq_docs_markdown()
//    RETURNS trigger
//    LANGUAGE plpgsql
//   AS $function$
//   begin
//     if new.content_markdown is null and new.body_markdown is not null then
//       new.content_markdown := new.body_markdown;
//     end if;
//
//     if new.body_markdown is null and new.content_markdown is not null then
//       new.body_markdown := new.content_markdown;
//     end if;
//
//     if tg_op = 'UPDATE' then
//       if new.content_markdown is distinct from old.content_markdown then
//         new.body_markdown := new.content_markdown;
//       elsif new.body_markdown is distinct from old.body_markdown then
//         new.content_markdown := new.body_markdown;
//       end if;
//     end if;
//
//     return new;
//   end;
//   $function$
//

// --- TRIGGERS ---
// Table: approval_items
//   trg_approval_items_updated_at: CREATE TRIGGER trg_approval_items_updated_at BEFORE UPDATE ON public.approval_items FOR EACH ROW EXECUTE FUNCTION set_updated_at()
// Table: artifact_registry
//   trg_artifact_registry_updated_at: CREATE TRIGGER trg_artifact_registry_updated_at BEFORE UPDATE ON public.artifact_registry FOR EACH ROW EXECUTE FUNCTION set_updated_at()
// Table: categories
//   trg_categories_updated_at: CREATE TRIGGER trg_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION set_updated_at()
// Table: client_operation_briefs
//   trg_client_operation_briefs_updated_at: CREATE TRIGGER trg_client_operation_briefs_updated_at BEFORE UPDATE ON public.client_operation_briefs FOR EACH ROW EXECUTE FUNCTION set_updated_at()
// Table: client_operation_states
//   trg_client_operation_states_updated_at: CREATE TRIGGER trg_client_operation_states_updated_at BEFORE UPDATE ON public.client_operation_states FOR EACH ROW EXECUTE FUNCTION set_updated_at()
// Table: clients
//   trg_clients_updated_at: CREATE TRIGGER trg_clients_updated_at BEFORE UPDATE ON public.clients FOR EACH ROW EXECUTE FUNCTION set_updated_at()
// Table: distribution_jobs
//   trg_distribution_jobs_updated_at: CREATE TRIGGER trg_distribution_jobs_updated_at BEFORE UPDATE ON public.distribution_jobs FOR EACH ROW EXECUTE FUNCTION set_updated_at()
// Table: embedding_jobs
//   trg_embedding_jobs_updated_at: CREATE TRIGGER trg_embedding_jobs_updated_at BEFORE UPDATE ON public.embedding_jobs FOR EACH ROW EXECUTE FUNCTION set_updated_at()
// Table: jarvis_sessions
//   trg_jarvis_sessions_updated_at: CREATE TRIGGER trg_jarvis_sessions_updated_at BEFORE UPDATE ON public.jarvis_sessions FOR EACH ROW EXECUTE FUNCTION set_updated_at()
// Table: jobs
//   trg_jobs_updated_at: CREATE TRIGGER trg_jobs_updated_at BEFORE UPDATE ON public.jobs FOR EACH ROW EXECUTE FUNCTION set_updated_at()
// Table: memory_entries
//   trg_memory_entries_updated_at: CREATE TRIGGER trg_memory_entries_updated_at BEFORE UPDATE ON public.memory_entries FOR EACH ROW EXECUTE FUNCTION set_updated_at()
// Table: profiles
//   trg_profiles_updated_at: CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION set_updated_at()
// Table: torq_docs
//   trg_sync_torq_docs_markdown: CREATE TRIGGER trg_sync_torq_docs_markdown BEFORE INSERT OR UPDATE ON public.torq_docs FOR EACH ROW EXECUTE FUNCTION sync_torq_docs_markdown()
//   trg_torq_docs_updated_at: CREATE TRIGGER trg_torq_docs_updated_at BEFORE UPDATE ON public.torq_docs FOR EACH ROW EXECUTE FUNCTION set_updated_at()

// --- INDEXES ---
// Table: activity_log
//   CREATE INDEX idx_activity_log_created_at ON public.activity_log USING btree (created_at DESC)
//   CREATE INDEX idx_activity_log_workspace_id ON public.activity_log USING btree (workspace_id)
// Table: agent_runs
//   CREATE INDEX idx_agent_runs_session_id ON public.agent_runs USING btree (session_id)
// Table: approval_items
//   CREATE INDEX idx_approval_items_client_id ON public.approval_items USING btree (client_id)
// Table: artifact_registry
//   CREATE INDEX idx_artifact_registry_client_id ON public.artifact_registry USING btree (client_id)
// Table: categories
//   CREATE UNIQUE INDEX categories_workspace_id_slug_key ON public.categories USING btree (workspace_id, slug)
// Table: client_asset_links
//   CREATE UNIQUE INDEX client_asset_links_client_id_artifact_id_relation_kind_key ON public.client_asset_links USING btree (client_id, artifact_id, relation_kind)
// Table: clients
//   CREATE INDEX idx_clients_workspace_id ON public.clients USING btree (workspace_id)
// Table: distribution_jobs
//   CREATE INDEX idx_distribution_jobs_client_id ON public.distribution_jobs USING btree (client_id)
// Table: doc_links
//   CREATE UNIQUE INDEX doc_links_from_doc_id_to_doc_id_link_kind_key ON public.doc_links USING btree (from_doc_id, to_doc_id, link_kind)
// Table: jarvis_sessions
//   CREATE INDEX idx_jarvis_sessions_client_id ON public.jarvis_sessions USING btree (client_id)
// Table: job_assignments
//   CREATE UNIQUE INDEX job_assignments_job_id_profile_id_key ON public.job_assignments USING btree (job_id, profile_id)
// Table: job_dependencies
//   CREATE UNIQUE INDEX job_dependencies_job_id_depends_on_job_id_key ON public.job_dependencies USING btree (job_id, depends_on_job_id)
// Table: jobs
//   CREATE INDEX idx_jobs_client_id ON public.jobs USING btree (client_id)
//   CREATE INDEX idx_jobs_kind ON public.jobs USING btree (kind)
//   CREATE INDEX idx_jobs_module ON public.jobs USING btree (module)
//   CREATE INDEX idx_jobs_status ON public.jobs USING btree (status)
//   CREATE INDEX idx_jobs_workspace_id ON public.jobs USING btree (workspace_id)
// Table: knowledge_chunks
//   CREATE INDEX idx_knowledge_chunks_client_id ON public.knowledge_chunks USING btree (client_id)
//   CREATE INDEX idx_knowledge_chunks_embedding ON public.knowledge_chunks USING ivfflat (embedding vector_cosine_ops) WITH (lists='100')
//   CREATE UNIQUE INDEX knowledge_chunks_source_id_chunk_index_key ON public.knowledge_chunks USING btree (source_id, chunk_index)
// Table: knowledge_sources
//   CREATE INDEX idx_knowledge_sources_client_id ON public.knowledge_sources USING btree (client_id)
// Table: memory_entries
//   CREATE INDEX idx_memory_entries_client_id ON public.memory_entries USING btree (client_id)
//   CREATE INDEX idx_memory_entries_type ON public.memory_entries USING btree (memory_type)
// Table: memory_links
//   CREATE UNIQUE INDEX memory_links_memory_id_linked_memory_id_relation_kind_key ON public.memory_links USING btree (memory_id, linked_memory_id, relation_kind)
// Table: torq_docs
//   CREATE INDEX idx_torq_docs_client_id ON public.torq_docs USING btree (client_id)
//   CREATE INDEX idx_torq_docs_workspace_id ON public.torq_docs USING btree (workspace_id)
// Table: workspace_members
//   CREATE UNIQUE INDEX workspace_members_workspace_id_profile_id_key ON public.workspace_members USING btree (workspace_id, profile_id)
// Table: workspaces
//   CREATE UNIQUE INDEX workspaces_slug_key ON public.workspaces USING btree (slug)
