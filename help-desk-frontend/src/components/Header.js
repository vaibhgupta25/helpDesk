import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { IoMdAdd } from "react-icons/io";
import { userActions } from '../store/reducers/userReducer';



export default function Header({ isCreatedTicketVisible, setIsCreatedTicketVisible }) {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const HandleLogout = (e) => {
        e.preventDefault();
        dispatch(userActions.setUserInfo(""));
        localStorage.removeItem('account');
    }

    const handleOnCreateTicket = () => {
        setIsCreatedTicketVisible(!isCreatedTicketVisible)
        // console.log(object)
    }
    return (
        <div className='px-10 py-5 mx-auto container flex items-center justify-between'>
            <span className='font-poppins text-lg md:text-xl font-dark-hard'>Help Desk</span>
            <div className='flex items-center space-x-3 md:space-x-6'>

                {user.userInfo ? (
                    <>
                        <button
                            className={`border-2 border-blue-500 text-blue-500 font-semibold hover:text-white hover:bg-blue-500 flex items-center justify-center px-5 py-2 rounded-full space-x-1 `}
                            onClick={handleOnCreateTicket}>
                            <IoMdAdd className='text-base font-bold' />
                            <span className='text-sm '>Create Ticket</span>
                        </button>
                        <div className='flex flex-col items-center group'>
                            <div className='Profile text-lg font-bold border px-3 py-2 rounded-full text-[#2F81F7]'>
                                V
                            </div>
                            <div className='absolute translate-y-2/3 group-hover:opacity-100 opacity-0 transition-all ease-in duration-30 '>
                                <ul className='rounded-lg flex flex-col items-center border shadow-dark-soft shadow-sm overflow-hidden'>
                                    <button className='px-4 py-2 hover:bg-dark-hard hover:text-white'>
                                        Dasboard
                                    </button>
                                    <button onClick={(e) => HandleLogout(e)} className='w-full px-4 py-2 hover:bg-dark-hard hover:text-white'>
                                        Log out
                                    </button>
                                </ul>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='flex space-x-1 text-base text-blue-dark'>

                        <Link to='/login'>Login</Link>
                        <span>/</span>
                        <Link to='/register'>SignUp</Link>
                    </div>
                )}
            </div>
        </div>
    )
}
