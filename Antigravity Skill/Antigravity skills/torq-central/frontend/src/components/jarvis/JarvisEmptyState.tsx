interface Props {
    onPromptSelect: (prompt: string) => void
}

const QUICK_PROMPTS = [
    'Qual o proximo passo seguro para este cliente?',
    'O que esta bloqueado agora e por qual dependencia?',
    'Prepare a proxima handoff para Strategy OS.',
    'Mostre a rota ideal com menor risco operacional.',
]

export default function JarvisEmptyState({ onPromptSelect }: Props) {
    return (
        <section className="jarvis-hero-card">
            <div className="jarvis-hero-grid">
                <div className="jarvis-hero-copy">
                    <p className="jarvis-kicker">Ready for Command</p>
                    <h3>O cockpit organiza contexto, rota, risco e proximo passo seguro antes de agir.</h3>
                    <p className="jarvis-hero-text">
                        Use linguagem natural. O Jarvis classifica a demanda, monta contexto no Supabase,
                        aciona o especialista certo e devolve resposta com governanca visivel.
                    </p>
                </div>

                <div className="jarvis-hero-side">
                    <div className="jarvis-mini-metric">
                        <label>Fluxo</label>
                        <strong>classify -&gt; context -&gt; route -&gt; govern</strong>
                    </div>
                    <div className="jarvis-mini-metric">
                        <label>Policy</label>
                        <strong>no silent mutations</strong>
                    </div>
                    <div className="jarvis-mini-metric">
                        <label>Voice</label>
                        <strong>entra apos a fase de texto</strong>
                    </div>
                </div>
            </div>

            <div className="jarvis-prompt-grid">
                {QUICK_PROMPTS.map(prompt => (
                    <button
                        key={prompt}
                        type="button"
                        className="jarvis-prompt-card"
                        onClick={() => onPromptSelect(prompt)}
                    >
                        {prompt}
                    </button>
                ))}
            </div>
        </section>
    )
}
