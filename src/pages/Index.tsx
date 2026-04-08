import { useDashboard } from '@/hooks/use-dashboard'
import { Activity, Briefcase, AlertCircle, TerminalSquare, ChevronRight } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function Index() {
  const { clients, activities, loading } = useDashboard()

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <TerminalSquare className="w-8 h-8 text-zinc-500" />
          <p className="text-zinc-400 text-sm">Sincronizando dados vitais...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-50 tracking-tight">Cockpit</h1>
        <p className="text-zinc-400 mt-1 text-sm md:text-base">
          Visão geral das suas operações e inteligência distribuída.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors">
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <h3 className="font-medium text-sm">Operações Ativas</h3>
            <Briefcase className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-zinc-50">{clients.length}</p>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors">
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <h3 className="font-medium text-sm">Eventos Registrados</h3>
            <Activity className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-3xl font-bold text-zinc-50">{activities.length}</p>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors">
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <h3 className="font-medium text-sm">Alertas Críticos</h3>
            <AlertCircle className="w-4 h-4 text-zinc-600" />
          </div>
          <p className="text-3xl font-bold text-zinc-500">0</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-zinc-100 flex items-center">
            Clientes em Processamento
            <span className="ml-2 bg-zinc-800 text-zinc-300 py-0.5 px-2 rounded-full text-xs">
              {clients.length}
            </span>
          </h2>

          <div className="space-y-3">
            {clients.length === 0 ? (
              <div className="bg-zinc-900/20 border border-dashed border-zinc-800 rounded-xl p-8 text-center text-zinc-500 text-sm">
                Nenhum cliente em operação no momento.
              </div>
            ) : (
              clients.map((client) => {
                const state = client.client_operation_states?.[0]
                return (
                  <div
                    key={client.id}
                    className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 md:p-5 flex items-center justify-between hover:border-zinc-700 transition-colors cursor-pointer group"
                  >
                    <div className="min-w-0 pr-4">
                      <h4 className="text-base font-medium text-zinc-100 group-hover:text-blue-400 transition-colors truncate">
                        {client.name}
                      </h4>
                      <div className="flex items-center text-xs md:text-sm text-zinc-500 mt-1.5 space-x-2">
                        <span className="truncate">
                          Módulo:{' '}
                          <span className="text-zinc-300 font-medium">
                            {state?.current_module || 'Pendente'}
                          </span>
                        </span>
                        <span className="hidden md:inline text-zinc-700">•</span>
                        <span className="hidden md:inline truncate">
                          Fase:{' '}
                          <span className="text-zinc-300 font-medium">
                            {state?.current_stage || 'Não iniciada'}
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center flex-shrink-0">
                      <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-400 border border-blue-500/20 whitespace-nowrap">
                        {client.status === 'active' ? 'Ativo' : client.status}
                      </span>
                      <ChevronRight className="w-5 h-5 text-zinc-600 ml-3 group-hover:text-zinc-400 transition-colors" />
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-100">Log do Sistema</h2>
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 h-[400px] overflow-y-auto relative">
            {activities.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center text-zinc-500 text-sm">
                Sem eventos recentes.
              </div>
            ) : (
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[9px] before:-translate-x-px md:before:translate-x-0 before:h-full before:w-[2px] before:bg-zinc-800">
                {activities.map((act) => (
                  <div key={act.id} className="relative flex gap-4 text-sm">
                    <div className="mt-1 flex-none relative z-10 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-zinc-950 ring-4 ring-zinc-900">
                      <div className="h-1.5 w-1.5 rounded-full bg-zinc-500"></div>
                    </div>
                    <div className="flex-1 pb-1">
                      <p className="text-zinc-300 leading-snug">
                        <span className="font-medium text-zinc-100">{act.action}</span>
                        {act.entity_title && (
                          <span className="text-zinc-400"> • {act.entity_title}</span>
                        )}
                      </p>
                      <p className="text-zinc-600 text-xs mt-1 font-mono">
                        {formatDistanceToNow(new Date(act.created_at), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
