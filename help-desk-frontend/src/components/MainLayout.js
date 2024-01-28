import React from 'react'
import Header from './Header'

export default function MainLayout({ children, isCreatedTicketVisible, setIsCreatedTicketVisible }) {
    return (
        <div>
            <Header isCreatedTicketVisible={isCreatedTicketVisible}
                setIsCreatedTicketVisible={setIsCreatedTicketVisible}
            />
            {children}
        </div>
    )
}
