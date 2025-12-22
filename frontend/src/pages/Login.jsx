import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);

  const navigate = useNavigate();

  const [state, setState] = useState('Sign Up');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const { name, email, password } = formData;

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(
          `${backendUrl}/api/user/register`,
          { name, email, password }
        );

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success("Account created successfully!");
        } else {
          toast.error(data.message);
        }

      } else {
        const { data } = await axios.post(
          `${backendUrl}/api/user/login`,
          { email, password }
        );

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success("Logged in successfully!");
        } else {
          toast.error(data.message);
        }
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(()=> {
    if(token){
      navigate('/');
    }
  },[token])

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-4 bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-100 transition-transform duration-300 hover:scale-[1.02]"
      >
        <div className="text-center mb-2">
          <h2 className="text-3xl font-bold text-gray-700">
            {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-gray-500 mt-1">
            {state === 'Sign Up'
              ? 'Join us and book appointments easily.'
              : 'Login to continue your healthcare journey.'}
          </p>
        </div>

        {state === 'Sign Up' && (
          <div className="w-full">
            <label htmlFor="name" className="text-gray-600 font-medium cursor-pointer">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              className="border border-gray-300 rounded-lg w-full p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="w-full">
          <label htmlFor="email" className="text-gray-600 font-medium cursor-pointer">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 rounded-lg w-full p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="w-full">
          <label htmlFor="password" className="text-gray-600 font-medium cursor-pointer">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className="border border-gray-300 rounded-lg w-full p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white w-full py-3 rounded-lg text-base font-semibold 
          hover:bg-primary/90 transition-all duration-300 cursor-pointer"
        >
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        <div className="text-center text-gray-600 mt-2">
          {state === 'Sign Up' ? (
            <p>
              Already have an account?{' '}
              <span
                onClick={() => setState('Login')}
                className="text-primary font-medium cursor-pointer hover:underline"
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              New to Prescripto?{' '}
              <span
                onClick={() => setState('Sign Up')}
                className="text-primary font-medium cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
