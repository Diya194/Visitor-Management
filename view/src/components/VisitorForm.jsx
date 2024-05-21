import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function VisitorForm() {
    const [visitorData, setVisitorData] = useState({
        name: '',
        email: '',
        phone: '',
        purpose: ''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    function handleInputChange(e) {
        setVisitorData({ ...visitorData, [e.target.name]: e.target.value });
    }

    async function submitForm(e) {
        e.preventDefault();
        if (validateForm()) {
            try {
                await axios.post('http://localhost:3000/visitor', visitorData);
                alert("Your data has been submitted successfully!");
                window.location.reload();
            } catch (err) {
                console.log(err);
                alert("An error occurred while submitting your data.");
            }
        }
    }

    const goBack = () => {
        navigate('/');
    };

    function validateForm() {
        const errors = {};
        let isValid = true;

        if (!visitorData.name.trim()) {
            errors.name = 'Name is required';
            isValid = false;
        }

        if (!visitorData.email.trim()) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(visitorData.email)) {
            errors.email = 'Email address is invalid';
            isValid = false;
        }

        if (!visitorData.phone.trim()) {
            errors.phone = 'Phone number is required';
            isValid = false;
        } else if (!/^\d{10}$/.test(visitorData.phone)) {
            errors.phone = 'Phone number is invalid';
            isValid = false;
        }

        if (!visitorData.purpose.trim()) {
            errors.purpose = 'Purpose is required';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    }

    return (
        <div className='antialised bg-gray-100'>
            <div className='flex w-full min-h-screen justify-center items-center'>
                <div className='flex flex-col md:flex-row md:space-x-6 space-y-6 bg-cyan-700 w-full max-w-6xl p-8 rounded-xl shadow-lg text-white sm:p-12'>
                    <div className='flex flex-col justify-between space-y-8'>
                        <div>
                            <h1 className='font-bold text-4xl  tracking-wide mb-0'>Think People</h1>
                            <h1 className='font-bold text-4xl tracking-wide mt-0'>Think BSPL</h1>
                            <p className='pt-2 text-cyan-200'>BSPL follows a unique cost-effective model to extend your team with our dual shore set-up of dedicated software developers, designers & QA specialists plus complete infrastructure without the cost of direct hiring.</p>
                        </div>
                        <div className='flex flex-col space-y-6'>
                            <div className='inline-flex space-x-2 items-center'>
                                <div className="text-teal-300 text-xl">
                                    <ion-icon name="call"></ion-icon>
                                </div>
                                <span>+(91) 1234567890</span>
                            </div>
                            <div className='inline-flex space-x-2 items-center'>
                                <div className="text-teal-300 text-xl">
                                    <ion-icon name="mail"></ion-icon>
                                </div>
                                <span>sales@bcssarl.com</span>
                            </div>
                            <div className='inline-flex space-x-2 items-center'>
                                <div className="text-teal-300 text-xl">
                                    <ion-icon name="location"></ion-icon>
                                </div>
                                <span>261, Makarpura GIDC, Makarpura, Vadodara, Gujarat 390010</span>
                            </div>
                        </div>
                        <div className='flex space-x-4 text-lg text-white'>
                            <a href="https://www.facebook.com/BhartiSoftTechPvtLtd" className='text-white  hover:bg-white'>
                                <ion-icon name="logo-facebook"></ion-icon>
                            </a>
                            <a href="https://twitter.com/HR_BCS" className='text-white hover:bg-white'>
                                <ion-icon name="logo-twitter"></ion-icon>
                            </a>
                            <a href="https://www.linkedin.com/company/bharti-soft-tech-pvt.-ltd./" className='text-white hover:bg-white'>
                                <ion-icon name="logo-linkedin"></ion-icon>
                            </a>
                            <a href="/" className='text-white hover:bg-white'>
                                <ion-icon name="logo-instagram"></ion-icon>
                            </a>
                        </div>
                    </div>
                    <div className='bg-white rounded-xl shadow-lg p-10 text-gray-600 md:w-[55rem]'>
                        <form className='flex flex-col space-y-7'>
                            <div>
                                <label htmlFor="name" className='font-bold'>Full Name</label>
                                <input type='text' name='name' placeholder='Enter your name' className='ring-1 ring-gray-400 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal-300 mt-2' onChange={handleInputChange}></input>
                                {errors.name && <span className="text-red-500">{errors.name}</span>}
                            </div>
                            <div>
                                <label htmlFor="email" className='font-bold'>Email address</label>
                                <input type='email' name='email' placeholder='abc@gmail.com' className='ring-1 ring-gray-400 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal-300 mt-2' onChange={handleInputChange}></input>
                                {errors.email && <span className="text-red-500">{errors.email}</span>}
                            </div>
                            <div>
                                <label htmlFor="phone" className='font-bold'>Contact Number</label>
                                <input type='tel' placeholder='Enter your phone number' name='phone' className='ring-1 ring-gray-400 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal-300 mt-2' onChange={handleInputChange}></input>
                                {errors.phone && <span className="text-red-500">{errors.phone}</span>}
                            </div>
                            <div>
                                <label htmlFor="purpose" className='font-bold'>Purpose</label>
                                <textarea placeholder='Brief about your visit...' rows={4} name='purpose' className='ring-1 ring-gray-400 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal-300 mt-2' onChange={handleInputChange}></textarea>
                                {errors.purpose && <span className="text-red-500">{errors.purpose}</span>}
                            </div>

                            <button className='inline-block self-end bg-cyan-700 text-white font-bold rounded-lg px-6 py-2 uppercase text-sm' onClick={submitForm}>Submit</button>
                            <button className='inline-block self-end bg-cyan-700 text-white font-bold rounded-lg px-6 py-2 uppercase text-sm' onClick={goBack}>Back</button>

                        </form>

                    </div>
                </div>

            </div>


        </div>

    )
}

export default VisitorForm;
