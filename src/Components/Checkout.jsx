import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";

const Checkout = () => {
  const items = useSelector((s) => s.cart);
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <div className="bg-white">
        <Nav />
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white flex p-4 rounded-md justify-between items-center mb-6">
          <h2 className="font-semibold text-2xl">Checkout</h2>
          <Link to="/" className="flex items-center text-blue-500 text-sm">
            <MdHome className="w-5 h-5 mr-1" />Home
            <IoIosArrowForward className="mx-1 text-gray-400" />
            <span className="text-gray-600">Checkout</span>
          </Link>
        </div>
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-lg font-semibold text-gray-700 mb-2">Order Total: ₹{total.toLocaleString()}</p>
          <p className="text-gray-500 mb-6">Checkout functionality coming soon.</p>
          <Link to="/" className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition font-semibold">
            Continue Shopping
          </Link>
        </div>
      </div>
      <div className="pt-9"><Footer /></div>
    </div>
  );
};

export default Checkout;
