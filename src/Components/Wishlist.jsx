import React from 'react';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import { MdHome } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../redux/wishlistSlice';
import { AddItem } from '../redux/cartSlice';
import { toast } from 'react-toastify';
import { RxCross2 } from "react-icons/rx";
import { AiOutlineThunderbolt } from "react-icons/ai";
import Footer from './Footer';

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
    toast.error("Item removed from wishlist");
  };

  const handleAddToCart = (item) => {
    dispatch(AddItem({ ...item, qty: 1 }));
    toast.success("Item added to cart");
  };

  return (
    <div className='font-sans bg-gray-100 min-h-screen'>
      <div className='bg-white'>
        <Nav />
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white flex p-4 rounded-md justify-between items-center mb-6">
          <h2 className="font-semibold text-2xl">My Wishlist</h2>
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="flex items-center text-blue-500 hover:text-blue-700">
              <MdHome className="w-5 h-5 mr-1" />
              <span>Home</span>
            <IoIosArrowForward className="text-gray-500" />
            <span className="text-gray-600">My Wishlist</span>
            </Link>
          </div>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <h3 className="text-xl font-medium mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-4">You don't have any items in your wishlist yet.</p>
            <Link
              to="/"
              className="inline-block bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white w-[280px] rounded-lg shadow-sm p-4 flex flex-col justify-between h-full relative">
                <button
                  onClick={() => handleRemove(item.id)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition"
                  aria-label="Remove from wishlist"
                >
                  <RxCross2 size={28} className='text-red-500 font-semibold ' />
                </button>

                <div className="h-48 mb-4 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <h3 className="text-lg font-medium mb-1">{item.name}</h3>
                <p className="text-gray-500 text-sm mb-2">
                  {item.category === 'Electronics' ? 'Pos' :
                    item.category === 'Fashion' ? 'Pcs' :
                      item.category === 'Home & Kitchen' ? 'Set' :
                        item.category === 'Sports' ? 'Pcs' : 'Unit'}
                </p>
                <p className="text-xl font-bold mb-4">From ${item.price.toLocaleString()}</p>
                { }
                
                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-orange-500 text-white py-2 rounded-lg flex items-center justify-center hover:bg-orange-600 transition"
                >
                  <AiOutlineThunderbolt className="mr-2" />
                  Add to Cart
                </button>
    
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='pt-9'>
        <Footer />
      </div>
    </div>
  );
};

export default Wishlist;
