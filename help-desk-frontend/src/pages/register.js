import React, { useEffect } from 'react'
import MainLayout from '../components/MainLayout'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { signup } from '../services/user'
import { userActions } from '../store/reducers/userReducer'

export default function Register() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const { mutate } = useMutation({
        mutationFn: ({ name, email, password }) => {
            return signup({ name, email, password });
        },
        onSuccess: (data) => {
            dispatch(userActions.setUserInfo(data));
            toast.success("successful");
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
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        mode: "onChange"
    })

    const submitHandler = (data) => {
        const { name, email, password } = data;
        mutate({ name, email, password });
        // console.log(data);
    }
    useEffect(() => {
        if (user.userInfo) {
            navigate('/')
        }
    }, [user, navigate])

    const password = watch("password");
    return (
        <MainLayout>
            <div className='container mx-auto px-10 py-10  '>
                <div className=' mx-auto w-full max-w-sm'>
                    <h1 className='text-center text-2xl text-dark-hard mb-6'>Signup</h1>
                    <form className='' onSubmit={handleSubmit(submitHandler)}>
                        <div className='flex flex-col items-start mb-6'>
                            <label htmlFor="name" className='text-[#5a7184] font-semibold'>Name</label>
                            <input
                                type="text"
                                className='rounded-lg w-full border border-[#c3cad9] py-3 px-5 mt-3 outline-none text-dark-hard'
                                placeholder='Enter your name'
                                {...register("name", {
                                    minLength: {
                                        value: 3,
                                        message: "Length should be atleast of 3 characters"
                                    },
                                    required: {
                                        value: true,
                                        message: "Name is required!"
                                    }
                                })}
                            />
                            {errors.name?.message && <p className='text-sm text-red-500 mt-3 '>{errors.name.message}</p>}
                        </div>
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
                        <div className='flex flex-col items-start mb-6'>
                            <label htmlFor="confirmPassword" className='text-[#5a7184] font-semibold'>Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className='rounded-lg w-full border border-[#c3cad9] py-3 px-5 mt-3 outline-none text-dark-hard'
                                {...register('confirmPassword', {
                                    required: {
                                        value: true,
                                        message: "Please Confirm your password!"
                                    },
                                    validate: (value) => {
                                        if (value !== password)
                                            return "passwords do not match!"
                                    }
                                })}
                            />

                            {errors.confirmPassword?.message && <p className='text-sm text-red-500 mt-3 '>{errors.confirmPassword.message}</p>}
                        </div>
                        <button
                            disabled={!isValid}
                            type="submit"
                            className={`tracking-wide w-full my-4 bg-blue-500 text-white py-2 text-lg rounded font-semibold disabled:opacity-70 disabled:cursor-not-allowed`}
                        >
                            Submit
                        </button>
                        <p className='text-[#5a7184] text-sm'>You already have an account?
                            <Link to='/login' className='text-blue-500'>  Login now</Link>
                        </p>
                    </form>
                </div>
            </div>
        </MainLayout>
    )
}
