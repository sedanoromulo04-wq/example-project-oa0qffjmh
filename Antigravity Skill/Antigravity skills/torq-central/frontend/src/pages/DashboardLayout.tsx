import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import Sidebar from '../components/Sidebar'
import './DashboardLayout.css'
import { IS_JARVIS_MODE } from '../lib/appConfig'

export interface Category {
    id: string
    name: string
    slug: string
    icon: string
    display_order: number
    parent_id: string | null
}

interface Props {
    onOpenSearch: () => void
}

export default function DashboardLayout({ onOpenSearch }: Props) {
    const { user, signOut } = useAuth()
    const [categories, setCategories] = useState<Category[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        if (IS_JARVIS_MODE) {
            setCategories([])
            return
        }

        supabase.from('categories').select('*').order('display_order').then(({ data }) => {
            if (data) setCategories(data)
        })
    }, [])

    const handleSignOut = async () => {
        await signOut()
        navigate('/login')
    }

    return (
        <div className={`dashboard${IS_JARVIS_MODE ? ' jarvis-mode' : ''}`}>
            <Sidebar
                categories={categories}
                user={user}
                onSignOut={handleSignOut}
                onOpenSearch={onOpenSearch}
            />
            <main className={`dashboard-content${IS_JARVIS_MODE ? ' jarvis-mode' : ''}`}>
                <Outlet />
            </main>
        </div>
    )
}
