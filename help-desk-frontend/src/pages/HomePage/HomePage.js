import React, { useState } from 'react'
import MainLayout from '../../components/MainLayout'
import Ticket from './Ticket'
import CreateTicket from '../../components/createTicket'

export default function HomePage() {
    const [isCreatedTicketVisible, setIsCreatedTicketVisible] = useState(false)
    return (
        <div>
            <MainLayout isCreatedTicketVisible={isCreatedTicketVisible}
                setIsCreatedTicketVisible={setIsCreatedTicketVisible}
            />
            <Ticket isCreatedTicketVisible={isCreatedTicketVisible}
                setIsCreatedTicketVisible={setIsCreatedTicketVisible}
            />
        </div>
    )
}
