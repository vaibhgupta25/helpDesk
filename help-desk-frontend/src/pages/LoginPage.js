import React, { useEffect } from 'react'
import MainLayout from '../components/MainLayout'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import {userActions} from '../store/reducers/userReducer'
import toast from 'react-hot-toast'
import { login } from '../services/user'

export default function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)

    const { mutate } = useMutation({
        mutationFn: ({ name, email, password }) => {
            return login({ name, email, password });
        },
        onSuccess: (data) => {
            dispatch(userActions.setUserInfo(data));
            toast.success("Login successful!");
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
            email: "",
            password: "",
        },
        mode: "onChange"
    })

    const submitHandler = (data) => {
        const { name, email, password } = data;
        mutate({ name, email, password });
    }

    useEffect(() => {
        if (user.userInfo) {
            navigate('/')
        }
    }, [user, navigate])


    return (
        <MainLayout>
            <div className='container mx-auto px-10 py-10  '>
                <div className=' mx-auto w-full max-w-sm'>
                    <h1 className='text-center text-2xl text-dark-hard mb-6'>Signup</h1>
                    <form className='' onSubmit={handleSubmit(submitHandler)}>
                        <div className='flex flex-col items-start mb-6'>
                            <label htmlFor="email" className='text-[#5a7184] font-semibold'>Email</label>
                            <input
                                type="text"
                                placeholder='Enter email'
                                className='rounded-lg w-full border border-[#c3cad9] py-3 px-5 mt-3 outline-none text-dark-hard'
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Email is required!"
                                    },
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Please Enter Valid Email!"
                                    }
                                })}
                            />
                            {errors.email?.message && <p className='text-sm text-red-500 mt-3 '>{errors.email.message}</p>}
                        </div>
                        <div className='flex flex-col items-start mb-6'>
                            <label htmlFor="password" className='text-[#5a7184] font-semibold'>Password</label>
                            <input
                                type="password"
                                placeholder="Enter password"
                                className='rounded-lg w-full border border-[#c3cad9] py-3 px-5 mt-3 outline-none text-dark-hard'
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "Password is required!"
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "Length should be atleast of 8 characters"
                                    }
                                })}
                            />
                            {errors.password?.message && <p className='text-sm text-red-500 mt-3 '>{errors.password.message}</p>}
                        </div>
                        <button
                            disabled={!isValid}
                            type="submit"
                            className={`tracking-wide w-full my-4 bg-blue-500 text-white py-2 text-lg rounded font-semibold disabled:opacity-70 disabled:cursor-not-allowed`}
                        >
                            Submit
                        </button>
                        <p className='text-[#5a7184] text-sm'>Don't have an account?
                            <Link to='/register' className='text-blue-500'>  Signup now</Link>
                        </p>
                    </form>
                </div>
            </div>
        </MainLayout>
    )
}
