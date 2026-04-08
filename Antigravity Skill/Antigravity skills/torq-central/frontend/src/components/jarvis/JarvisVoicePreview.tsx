export default function JarvisVoicePreview() {
  return (
    <section className="jarvis-voice-card">
      <div className="jarvis-voice-copy">
        <p className="jarvis-kicker">Voice Surface</p>
        <strong>Captura de voz reservada para a proxima fase.</strong>
        <span>O transcript sempre passa por revisao antes de virar acao.</span>
      </div>

      <div className="jarvis-voice-wave">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <button type="button" className="jarvis-voice-button" disabled>
        Voice em breve
      </button>
    </section>
  )
}
