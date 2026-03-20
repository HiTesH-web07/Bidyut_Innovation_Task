import React, { useState, useContext } from 'react';
import Nav from './Nav';
import { Link, useNavigate } from 'react-router-dom';
import { MdHome } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import login from "../assets/log-in.png";
import Footer from './Footer';
import { toast } from 'react-toastify';
import { dataContext } from '../Context/UserContext';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(dataContext);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      const userData = { email: formData.email, name: formData.email.split('@')[0] };
      setUser(userData);
      if (rememberMe) localStorage.setItem('user', JSON.stringify(userData));
      toast.success('Logged in successfully!');
      navigate('/');
    } catch {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='font-sans bg-gray-100 min-h-screen'>
      <div className='bg-white'>
        <Nav />
      </div>

      <div className='max-w-7xl mx-auto px-4 py-8'>
        <div className="bg-white flex p-4 rounded-md justify-between items-center mb-6">
          <h2 className="font-semibold text-2xl">Log In</h2>
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="flex items-center text-blue-500 hover:text-blue-700">
              <MdHome className="w-5 h-5 mr-1" />
              <span>Home</span>
              <IoIosArrowForward className="text-gray-500 mx-1" />
              <span className="text-gray-600">Log In</span>
            </Link>
          </div>
        </div>

        <div className='bg-white flex flex-col md:flex-row items-center justify-between p-6 rounded-lg shadow-md'>
          <div className='w-full md:w-1/2 flex justify-center mb-6 md:mb-0'>
            <img className='w-[80%]' src={login} alt="Login" />
          </div>

          <div className='w-full md:w-1/2 max-w-md bg-gray-100 p-8 rounded-lg'>
            <h2 className='text-xl font-semibold mb-1'>Welcome To Kulies</h2>
            <p className='text-sm text-gray-600 mb-6'>Log In Your Account</p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="mb-4 relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10 ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div className="flex justify-between items-center mb-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                  />
                  <span className="text-sm">Remember me</span>
                </label>
                <Link to="#" className="text-blue-500 text-sm hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-400 hover:bg-orange-500 disabled:bg-orange-300 disabled:cursor-not-allowed text-white py-2 px-4 rounded-md transition font-semibold"
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Don't Have An Account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline font-medium">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className='pt-9'>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
