import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { create } from '../services/ticket'
import toast from 'react-hot-toast'
import { ticketActions } from '../store/reducers/ticketReducer'

export default function CreateTicket({ isCreatedTicketVisible, setIsCreatedTicketVisible }) {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch()
    let ticket= useSelector(state=>state.ticket.ticket);

    const { mutate } = useMutation({
        mutationFn: ({ title, description, category, token }) => {
            return create({ title, description, category, token });
        },
        onSuccess: (data) => {
            toast.success("Ticket created successfully");
            ticket = {...ticket,data}
            console.log(ticket)
            setIsCreatedTicketVisible(false)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const { register,
        handleSubmit,
        formState: { errors, isValid },
        watch
    } = useForm({
        defaultValues: {
            title: "",
            description: "",
            category: "",
        },
        mode: "onChange"
    })
    const handleClose = (e) => {
        e.preventDefault();
        setIsCreatedTicketVisible(false)
    }

    const submitHandler = (data) => {
        const { title, description, category } = data;
        const token = user.userInfo.token
        mutate({ title, description, category, token })
    }
    return (
        <div className='container px-10 absolute -top-10 mx-auto'>
            <div className='relative max-w-sm mx-auto px-10 py-5 max-h-auto overflow-hidden  bg-white text-black w-full shadow-[0_8px_30px_rgb(0,0,0,0.12)]'>
                <button className='absolute right-3 pb-3 text-sm' onClick={(e) => { handleClose(e) }}>❌</button>
                <form className='' onSubmit={handleSubmit(submitHandler)}>
                    <div className='flex flex-col items-start my-8'>
                        <label htmlFor="title" className='text-[#5a7184] font-semibold'>Title</label>
                        <input
                            type="text"
                            className='rounded-lg w-full border border-[#c3cad9] py-3 px-5 mt-3 outline-none text-dark-hard'
                            placeholder='Enter Title'
                            {...register("title", {
                                required: {
                                    value: true,
                                    message: "Title is required!"
                                }
                            })}
                        />
                        {errors.title?.message && <p className='text-sm text-red-500 mt-3 '>{errors.title.message}</p>}
                    </div>
                    <div className='flex flex-col items-start mb-6'>
                        <label htmlFor="description" className='text-[#5a7184] font-semibold'>Description</label>
                        <input
                            type="text"
                            placeholder='Enter Description'
                            className='rounded-lg w-full border border-[#c3cad9] py-3 px-5 mt-3 outline-none text-dark-hard'
                            {...register("description", {
                                required: {
                                    value: true,
                                    message: "Description is required!"
                                }
                            })}
                        />
                        {errors.Description?.message && <p className='text-sm text-red-500 mt-3 '>{errors.Description.message}</p>}
                    </div>
                    <div className='flex flex-col items-start mb-6'>
                        <label htmlFor="Category" className='text-[#5a7184] font-semibold'>Category</label>
                        <select
                            name="catgory"
                            id="category"
                            className='rounded-lg w-full border border-[#c3cad9] py-3 px-5 mt-3 outline-none text-dark-hard'
                            {...register("category", {
                                required: {
                                    value: true,
                                    message: "Please Select Category"
                                }
                            })}
                        >
                            <option value="0">Hardware Issues</option>
                            <option value="1">Software Issues</option>
                            <option value="2">Network Problems</option>
                        </select>
                        {errors.Category?.message && <p className='text-sm text-red-500 mt-3 '>{errors.Category.message}</p>}
                    </div>

                    <button
                        disabled={!isValid}
                        type="submit"
                        className={`tracking-wide w-full my-4 bg-blue-500 text-white py-2 text-lg rounded font-semibold disabled:opacity-70 disabled:cursor-not-allowed`}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}
