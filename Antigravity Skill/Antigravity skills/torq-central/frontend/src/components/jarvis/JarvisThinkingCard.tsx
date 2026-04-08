export default function JarvisThinkingCard() {
    return (
        <section className="jarvis-thinking-card" aria-live="polite">
            <div className="jarvis-thinking-header">
                <p className="jarvis-kicker">Thinking State</p>
                <strong>Orquestracao em progresso</strong>
            </div>

            <div className="jarvis-thinking-flow">
                <div className="jarvis-thinking-step active">
                    <span className="jarvis-thinking-dot" />
                    <div>
                        <strong>Classificando pedido</strong>
                        <p>Intento, modulo e etapa atual.</p>
                    </div>
                </div>

                <div className="jarvis-thinking-step active">
                    <span className="jarvis-thinking-dot" />
                    <div>
                        <strong>Montando contexto</strong>
                        <p>Workspace, jobs, memorias e aprovacoes relevantes.</p>
                    </div>
                </div>

                <div className="jarvis-thinking-step pending">
                    <span className="jarvis-thinking-dot" />
                    <div>
                        <strong>Roteando especialista</strong>
                        <p>Escolha do agente com menor risco operacional.</p>
                    </div>
                </div>

                <div className="jarvis-thinking-step pending">
                    <span className="jarvis-thinking-dot" />
                    <div>
                        <strong>Preparando resposta</strong>
                        <p>Resposta estruturada com bloqueios, risco e next safe action.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
