import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdHome } from 'react-icons/md';
import { IoIosArrowForward } from 'react-icons/io';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Nav from './Nav';
import Footer from './Footer';
import signupImage from '../assets/sign-up.png';
import { toast } from 'react-toastify';
import { dataContext } from '../Context/UserContext';

const SignUp = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(dataContext);

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', phone: '', email: '', password: '', agreed: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter and one number';
    }
    if (!formData.agreed) newErrors.agreed = 'You must agree to the Terms and Privacy Policy';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
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
      await new Promise(resolve => setTimeout(resolve, 800));
      const userData = { email: formData.email, name: `${formData.firstName} ${formData.lastName}` };
      setUser(userData);
      toast.success('Account created successfully!');
      navigate('/');
    } catch {
      toast.error('Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <div className="bg-white">
        <Nav />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white flex p-4 rounded-md justify-between items-center mb-6">
          <h2 className="font-semibold text-2xl">Sign Up</h2>
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="flex items-center text-blue-500 hover:text-blue-700">
              <MdHome className="w-5 h-5 mr-1" />
              <span>Home</span>
              <IoIosArrowForward className="text-gray-500 mx-1" />
              <span className="text-gray-600">Sign Up</span>
            </Link>
          </div>
        </div>

        <div className="bg-white flex flex-col md:flex-row items-center justify-between p-6 rounded-lg shadow-md">
          <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
            <img className="w-[80%]" src={signupImage} alt="Sign Up" />
          </div>

          <div className="w-full md:w-1/2 max-w-md bg-gray-100 p-8 rounded-lg">
            <h2 className="text-xl font-semibold mb-1">Welcome To Kulies</h2>
            <p className="text-sm text-gray-600 mb-6">Create New Account</p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="flex gap-2 mb-1">
                <div className="w-1/2">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div className="w-1/2">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div className="mb-1">
                <div className="flex items-center gap-2">
                  <div className="px-4 py-2 bg-gray-200 border border-gray-300 rounded-md">
                    <span className="text-sm text-gray-700">+91</span>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Mobile No"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div className="mb-1 mt-4">
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

              <div className="mb-1 mt-4 relative">
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

              <div className="flex items-start mb-4 mt-4">
                <input
                  type="checkbox"
                  name="agreed"
                  id="agreed"
                  checked={formData.agreed}
                  onChange={handleChange}
                  className="mr-2 mt-1"
                />
                <label htmlFor="agreed" className="text-sm">
                  I agree with{' '}
                  <Link to="#" className="text-blue-500 hover:underline">Terms</Link>
                  {' '}and{' '}
                  <Link to="#" className="text-blue-500 hover:underline">Privacy Policy</Link>
                </label>
              </div>
              {errors.agreed && <p className="text-red-500 text-xs -mt-3 mb-3">{errors.agreed}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-400 hover:bg-orange-500 disabled:bg-orange-300 disabled:cursor-not-allowed text-white py-2 px-4 rounded-md transition font-semibold"
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Already Have An Account?{' '}
              <Link to="/login" className="text-blue-500 hover:underline font-medium">
                Log In
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

export default SignUp;
