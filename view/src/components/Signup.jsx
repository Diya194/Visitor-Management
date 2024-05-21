import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',        
        designation: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            axios.post('http://localhost:3000/employee/sign-up', values)
            .then(result => {
                console.log("Server Response:", result.data); 
                if(result.data.message === 'Authentication successful!!') {
                    localStorage.setItem("valid", true)
                    navigate('/')
                } else {
                    console.error("Something went wrong:")
                    // Optionally, you can handle other error cases here
                }
            })
            .catch(err => console.error(err));
        }
    };

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!values.name.trim()) {
            errors.name = "Name is required";
            isValid = false;
        }

        if (!values.email.trim()) {
            errors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Email is invalid";
            isValid = false;
        }

        if (!values.password.trim()) {
            errors.password = "Password is required";
            isValid = false;
        }

        if (!values.phone.trim()) {
            errors.phone = "Phone number is required";
            isValid = false;
        } else if (!/^\d{10}$/.test(values.phone)) {
            errors.phone = "Phone number is invalid";
            isValid = false;
        }

        if (!values.designation.trim()) {
            errors.designation = "Designation is required";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-29 border loginForm'>
                <h2>Sign Up Page</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="name"><strong>Name:</strong></label>
                        <input type="text" name='name' autoComplete='off' placeholder='Enter Name'
                            onChange={(e) => setValues({ ...values, name: e.target.value })} className='form-control rounded-0' />
                        {errors.name && <span className="text-danger">{errors.name}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email:</strong></label>
                        <input type="email" name='email' autoComplete='off' placeholder='Enter Email'
                            onChange={(e) => setValues({ ...values, email: e.target.value })} className='form-control rounded-0' />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password:</strong></label>
                        <input type="password" name='password' autoComplete='off' placeholder='Enter Password'
                            onChange={(e) => setValues({ ...values, password: e.target.value })} className='form-control rounded-0' />
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="phone"><strong>Phone:</strong></label>
                        <input type="tel" name='phone' autoComplete='off' placeholder='Enter Phone'
                            onChange={(e) => setValues({ ...values, phone: e.target.value })} className='form-control rounded-0' />
                        {errors.phone && <span className="text-danger">{errors.phone}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="designation"><strong>Designation:</strong></label>
                        <input type="text" name='designation' autoComplete='off' placeholder='Enter Designation'
                            onChange={(e) => setValues({ ...values, designation: e.target.value })} className='form-control rounded-0' />
                        {errors.designation && <span className="text-danger">{errors.designation}</span>}
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2'>Sign Up</button>
                </form>
                <p className="text-center">Already registered? <Link to="/">Login here</Link>.</p> {/* Link to the login page */}
                <button className='btn btn-secondary w-100 rounded-0' onClick={() => navigate(-1)}>Back</button> {/* Back button */}
            </div>
        </div>
    );
};

export default Signup;
