import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterest } from 'react-icons/fa';
import logo from '../assets/logo.png';
import kulies_logo from '../assets/kulies_logo.png';

const Footer = () => {
  return (
    <footer className="bg-white py-10 px-5 border-t border-dashed border-gray-300">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 text-gray-600">
        {/* Company Info */}
        <div className="flex flex-col gap-3">
          <img 
            src={kulies_logo} 
            alt=" Logo" 
            className="w-40 mb-4"
          />
          <p>69 Selous Ave, Harare, Zimbabwe</p>
          <p>Support: (+263) 24 2795540</p>
          <p className="pt-2">info@kulies.com</p>
        </div>

        {/* Help Center */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Help Center</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-black">FAQ</a></li>
            <li><a href="#" className="hover:text-black">About Kulies.com</a></li>
            <li><a href="#" className="hover:text-black">Support Tickets</a></li>
            <li><a href="#" className="hover:text-black">Contact Us</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-black">Become A Supplier</a></li>
            <li><a href="#" className="hover:text-black">Track Order</a></li>
            <li><a href="#" className="hover:text-black">Services & Membership</a></li>
            <li><a href="#" className="hover:text-black">Help & Community</a></li>
          </ul>
        </div>

        {/* Buy On Kulies */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Buy On Kulies.Com</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-black">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-black">Privacy & Rules</a></li>
          </ul>
        </div>

        {/* Download App */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Download App</h3>
          <div className="flex flex-col gap-3">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
              alt="Google Play" 
              className="w-32"
            />
            <img 
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
              alt="App Store" 
              className="w-32"
            />
          </div>
        </div>
      </div>
      
      {/* Footer Bottom */}
      <div className="text-center text-gray-600 mt-10 border-t pt-4">
        <p>&copy; {new Date().getFullYear()} Kulies All Rights Reserved</p>
        <div className="flex justify-center space-x-4 mt-3">
          <FaFacebookF className="cursor-pointer hover:text-black" />
          <FaTwitter className="cursor-pointer hover:text-black" />
          <FaInstagram className="cursor-pointer hover:text-black" />
          <FaPinterest className="cursor-pointer hover:text-black" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;