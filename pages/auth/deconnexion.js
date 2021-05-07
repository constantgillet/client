import { signOut } from 'next-auth/client'
import Router from 'next/router'
import { useEffect } from 'react'

export default function LogoutPage() {

    useEffect(() => {
        Router.push(`/`);
    }, [])

    return (
        <>
            
        </>
    )
}
