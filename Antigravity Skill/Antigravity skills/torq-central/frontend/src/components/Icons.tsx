interface IconProps {
    size?: number
    className?: string
}

const defaults = { size: 18, className: '' }

function svg(props: IconProps, d: string, viewBox = '0 0 24 24') {
    const { size, className } = { ...defaults, ...props }
    return (
        <svg width={size} height={size} viewBox={viewBox} fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`icon ${className}`}>
            <path d={d} />
        </svg>
    )
}

function svgMulti(props: IconProps, children: React.ReactNode, viewBox = '0 0 24 24') {
    const { size, className } = { ...defaults, ...props }
    return (
        <svg width={size} height={size} viewBox={viewBox} fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`icon ${className}`}>
            {children}
        </svg>
    )
}

// --- Category Icons ---

export function BuildingIcon(props: IconProps = {}) {
    return svgMulti(props, <>
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <path d="M9 22v-4h6v4" />
        <path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" />
    </>)
}

export function PaletteIcon(props: IconProps = {}) {
    return svgMulti(props, <>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="7" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="8" cy="10" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="16" cy="10" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="9" cy="15" r="1.5" fill="currentColor" stroke="none" />
    </>)
}

export function DnaIcon(props: IconProps = {}) {
    return svgMulti(props, <>
        <path d="M2 15c6.667-6 13.333 0 20-6" />
        <path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993" />
        <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" />
        <path d="M17 6l-2.5 2.5" />
        <path d="M14 8l-1 1" />
        <path d="M7 18l2.5-2.5" />
        <path d="M3.5 14.5l.5-.5" />
        <path d="M20 9l.5-.5" />
        <path d="M2 9c6.667 6 13.333 0 20 6" />
    </>)
}

export function BookOpenIcon(props: IconProps = {}) {
    return svgMulti(props, <>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </>)
}

export function RocketIcon(props: IconProps = {}) {
    return svgMulti(props, <>
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </>)
}

export function ScaleIcon(props: IconProps = {}) {
    return svgMulti(props, <>
        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z" />
        <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z" />
        <path d="M7 21h10" />
        <path d="M12 3v18" />
        <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </>)
}

export function TargetIcon(props: IconProps = {}) {
    return svgMulti(props, <>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
    </>)
}

export function UsersIcon(props: IconProps = {}) {
    return svgMulti(props, <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>)
}

export function FileTextIcon(props: IconProps = {}) {
    return svgMulti(props, <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14,2 14,8 20,8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10,9 9,9 8,9" />
    </>)
}

export function MegaphoneIcon(props: IconProps = {}) {
    return svgMulti(props, <>
        <path d="m3 11 18-5v12L3 13v-2z" />
        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </>)
}

export function FilmIcon(props: IconProps = {}) {
    return svgMulti(props, <>
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
        <line x1="7" y1="2" x2="7" y2="22" />
        <line x1="17" y1="2" x2="17" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="2" y1="7" x2="7" y2="7" />
        <line x1="2" y1="17" x2="7" y2="17" />
        <line x1="17" y1="17" x2="22" y2="17" />
        <line x1="17" y1="7" x2="22" y2="7" />
    </>)
}

export function PaintbrushIcon(props: IconProps = {}) {
    return svgMulti(props, <>
        <path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3z" />
        <path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7" />
        <path d="M14.5 17.5 4.5 15" />
    </>)
}

// --- Action Icons ---

export function PlusIcon(props: IconProps = {}) {
    return svgMulti(props, <>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </>)
}

export function PencilIcon(props: IconProps = {}) {
    return svg(props, 'M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z')
}

export function ClockIcon(props: IconProps = {}) {
    return svgMulti(props, <>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12,6 12,12 16,14" />
    </>)
}

export function ArrowLeftIcon(props: IconProps = {}) {
    return svgMulti(props, <>
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12,19 5,12 12,5" />
    </>)
}

export function SearchIcon(props: IconProps = {}) {
    return svgMulti(props, <>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </>)
}

export function UploadIcon(props: IconProps = {}) {
    return svgMulti(props, <>
        <polyline points="16,16 12,12 8,16" />
        <line x1="12" y1="12" x2="12" y2="21" />
        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </>)
}

export function LinkIcon(props: IconProps = {}) {
    return svgMulti(props, <>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </>)
}

export function TrashIcon(props: IconProps = {}) {
    return svgMulti(props, <>
        <polyline points="3,6 5,6 21,6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </>)
}

export function XIcon(props: IconProps = {}) {
    return svgMulti(props, <>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </>)
}

export function FolderIcon(props: IconProps = {}) {
    return svg(props, 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z')
}

export function FolderPlusIcon(props: IconProps = {}) {
    return svgMulti(props, <>
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        <line x1="12" y1="11" x2="12" y2="17" />
        <line x1="9" y1="14" x2="15" y2="14" />
    </>)
}

export function DocumentIcon(props: IconProps = {}) {
    return svgMulti(props, <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14,2 14,8 20,8" />
    </>)
}

export function PaperclipIcon(props: IconProps = {}) {
    return svg(props, 'M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48')
}

export function UndoIcon(props: IconProps = {}) {
    return svgMulti(props, <>
        <polyline points="1,4 1,10 7,10" />
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </>)
}

export function LogOutIcon(props: IconProps = {}) {
    return svgMulti(props, <>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16,17 21,12 16,7" />
        <line x1="21" y1="12" x2="9" y2="12" />
    </>)
}

export function ChevronRightIcon(props: IconProps = {}) {
    return svgMulti(props, <>
        <polyline points="9,18 15,12 9,6" />
    </>)
}

export function HexagonIcon(props: IconProps = {}) {
    return svg(props, 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z')
}

export function PdfIcon(props: IconProps = {}) {
    return svgMulti(props, <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14,2 14,8 20,8" />
        <path d="M10 12h4" />
        <path d="M10 16h4" />
    </>)
}

export function VideoIcon(props: IconProps = {}) {
    return svgMulti(props, <>
        <polygon points="23,7 16,12 23,17" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </>)
}

// --- Icon Mapper (converte slug do banco para componente) ---

const ICON_MAP: Record<string, (props: IconProps) => JSX.Element> = {
    'building': BuildingIcon,
    'palette': PaletteIcon,
    'dna': DnaIcon,
    'book-open': BookOpenIcon,
    'rocket': RocketIcon,
    'scale': ScaleIcon,
    'target': TargetIcon,
    'users': UsersIcon,
    'file-text': FileTextIcon,
    'megaphone': MegaphoneIcon,
    'film': FilmIcon,
    'paintbrush': PaintbrushIcon,
    'folder': FolderIcon,
    'document': DocumentIcon,
}

export function CategoryIcon({ name, size, className }: { name: string; size?: number; className?: string }) {
    const IconComponent = ICON_MAP[name]
    if (IconComponent) return <IconComponent size={size} className={className} />
    // Fallback para ícones não mapeados (ex: dados antigos com emoji)
    return <FolderIcon size={size} className={className} />
}
