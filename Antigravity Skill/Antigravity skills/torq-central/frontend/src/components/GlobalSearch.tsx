import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { SearchIcon } from './Icons'
import './GlobalSearch.css'

interface SearchResult {
    id: string
    title: string
    category_id: string
    tags: string[]
    snippet: string
    rank: number
}

interface Props {
    onClose: () => void
}

export default function GlobalSearch({ onClose }: Props) {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<SearchResult[]>([])
    const [selected, setSelected] = useState(0)
    const [loading, setLoading] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    useEffect(() => { inputRef.current?.focus() }, [])

    useEffect(() => {
        if (query.trim().length < 2) { setResults([]); return }
        setLoading(true)
        const timer = setTimeout(async () => {
            const { data } = await supabase.rpc('search_docs', { search_query: query })
            setResults(data || [])
            setSelected(0)
            setLoading(false)
        }, 300)
        return () => clearTimeout(timer)
    }, [query])

    const go = (id: string) => {
        navigate(`/doc/${id}`)
        onClose()
    }

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, results.length - 1)) }
        if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)) }
        if (e.key === 'Enter' && results[selected]) go(results[selected].id)
        if (e.key === 'Escape') onClose()
    }

    return (
        <div className="search-overlay" onClick={onClose}>
            <div className="search-modal" onClick={e => e.stopPropagation()}>
                <div className="search-input-wrap">
                    <SearchIcon size={16} className="search-icon-svg" />
                    <input
                        ref={inputRef}
                        className="search-input"
                        placeholder="Buscar documentos..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyDown={handleKey}
                    />
                    {loading && <span className="search-loading">...</span>}
                    <kbd className="search-esc">Esc</kbd>
                </div>

                {results.length > 0 && (
                    <ul className="search-results">
                        {results.map((r, i) => (
                            <li
                                key={r.id}
                                className={`search-result-item${i === selected ? ' selected' : ''}`}
                                onClick={() => go(r.id)}
                                onMouseEnter={() => setSelected(i)}
                            >
                                <span className="result-title">{r.title}</span>
                                {r.snippet && (
                                    <span
                                        className="result-snippet"
                                        dangerouslySetInnerHTML={{ __html: r.snippet.replace(/\*\*(.*?)\*\*/g, '<mark>$1</mark>') }}
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                )}

                {query.length >= 2 && results.length === 0 && !loading && (
                    <p className="search-empty">Nenhum resultado para "<strong>{query}</strong>"</p>
                )}

                <div className="search-footer">
                    <span>↑↓ navegar</span>
                    <span>↵ abrir</span>
                    <span>Esc fechar</span>
                </div>
            </div>
        </div>
    )
}
