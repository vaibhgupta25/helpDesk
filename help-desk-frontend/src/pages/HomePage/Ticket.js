import React, { useEffect, useState } from 'react'
import CreateTicket from '../../components/createTicket';
import axios from 'axios';
import { fetchTicket } from '../../services/ticket';
import { useDispatch, useSelector } from 'react-redux';
import { ticketActions } from '../../store/reducers/ticketReducer'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast';
const EachTicket = () => {
    const categories = ["Hardware Issues", "Software Issues", "Network Problems"]
    const tickets = useSelector(state => state.ticket.ticket)
    const tdDesign = 'px-2 py-4  text-sm md:text-base border-r ';
    return <>
        {
            tickets.map((ticket, index) => {
                return (
                    <tr key={index}>
                        <td className={`${tdDesign} w-4 text-center`}>
                            {index}
                        </td>
                        <td className={tdDesign}>
                            {ticket.title}
                        </td>
                        <td className={tdDesign}>
                            {ticket.description}
                        </td>
                        <td
                            className={`text-center ${tdDesign}`}
                        >
                            {categories[ticket.categoryId]}
                        </td>
                        <td className={tdDesign}>
                            {ticket.assignedTo}
                        </td>
                        <td className={`${tdDesign} text-center`}>
                            {new Date(ticket.createdAt).toLocaleString(undefined, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </td>
                        <td className={`text-center ${tdDesign}`}>
                            <span
                                className={`px-3 py-1.5 rounded-sm ${ticket.status === 'Open'
                                    ? " bg-green-500" :
                                    (ticket.status === "Closed"
                                        ? "bg-[#f43273]" : "bg-red-500"
                                    )} 
                                    text-white`}>
                                {
                                    ticket.status.split(" ").length > 1
                                        ? ticket.status.split(" ")[1]
                                        : ticket.status
                                }
                            </span>
                        </td>
                        <td className='px-2 py-1 md:px-4 md:py-2 text-sm md:text-base text-center '>
                            <span className='border px-3 rounded-sm py-1.5 text-white bg-[#f43273]'>
                                Close
                            </span>
                        </td>
                    </tr>
                )
            })
        }

    </>
}

export default function Ticket({ isCreatedTicketVisible, setIsCreatedTicketVisible }) {

    const dispatch = useDispatch();
    const { mutate } = useMutation({
        mutationFn: (token) => {
            return fetchTicket({ token });
        },
        onSuccess: (data) => {
            dispatch(ticketActions.setTicket(data))
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const user = useSelector(state => state.user)
    // console.log(user)


    useEffect(() => {
        if (user.userInfo) {

            const token = user.userInfo.token;
            console.log(user)
            mutate(token);
        }
    }, [])

    return (
        <div className='container px-10 w-full mx-auto mt-24 text-sm md:text-base min-h-32 max-h-96 relative '>
            <div className='overflow-auto max-h-96'>
                <table className={`mx-auto w-full border  border-dark-light ${isCreatedTicketVisible ? "opacity-50" : ""}`}>
                    <thead className='border-b '>
                        <tr className=''>
                            <th className='font-bold border-r w-4 px-2 py-3 text-dark-light'>S. NO</th>
                            <th className='font-bold border-r  px-2 py-3 text-dark-light'>Title</th>
                            <th className='font-bold border-r  px-2 py-3 text-dark-light'>Description</th>
                            <th className='font-bold border-r  px-2 py-3 text-dark-light'>Category</th>
                            <th className='font-bold border-r  px-2 py-3 text-dark-light'>Assigned To</th>
                            <th className='font-bold border-r  px-2 py-3 text-dark-light min-w-32'>Created At</th>
                            <th className='font-bold border-r  px-2 py-3 text-dark-light'>Status</th>
                            <th className='font-bold border-r  px-2 py-3 text-dark-light'> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <EachTicket />
                    </tbody>
                </table>
            </div>
            {
                isCreatedTicketVisible &&
                <CreateTicket
                    isCreatedTicketVisible={isCreatedTicketVisible}
                    setIsCreatedTicketVisible={setIsCreatedTicketVisible}
                />
            }
        </div>
    )
}
