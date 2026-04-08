import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Tables } from '@/lib/supabase/types'

export type ClientWithState = Tables<'clients'> & {
  client_operation_states: Tables<'client_operation_states'>[]
}

export function useDashboard() {
  const [clients, setClients] = useState<ClientWithState[]>([])
  const [activities, setActivities] = useState<Tables<'activity_log'>[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function fetchDashboard() {
      try {
        const { data: wsId } = await supabase.rpc('current_workspace_id')

        if (wsId) {
          const [clientsRes, activitiesRes] = await Promise.all([
            supabase
              .from('clients')
              .select('*, client_operation_states(*)')
              .eq('workspace_id', wsId),
            supabase
              .from('activity_log')
              .select('*')
              .eq('workspace_id', wsId)
              .order('created_at', { ascending: false })
              .limit(10),
          ])

          if (mounted && clientsRes.data) {
            setClients(clientsRes.data as ClientWithState[])
          }
          if (mounted && activitiesRes.data) {
            setActivities(activitiesRes.data)
          }
        }
      } catch (error) {
        console.error('Falha ao carregar Torq OS:', error)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchDashboard()

    return () => {
      mounted = false
    }
  }, [])

  return { clients, activities, loading }
}
