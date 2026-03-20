import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RemoveItem, IncrementQty, DecrementQty } from "../redux/cartSlice";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import Nav from "./Nav";
import all from "../assets/emptycart.png";
import { toast } from "react-toastify";
import Footer from "./Footer";

const Cart2 = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
  const total = subtotal;

  const handleRemove = (id) => {
    dispatch(RemoveItem(id));
    toast.error("Item Removed from cart")
  };

  const handleIncrement = (id) => {
    dispatch(IncrementQty(id));
  };

  const handleDecrement = (id) => {
    dispatch(DecrementQty(id));
  };

  return (
    <div className="font-sans bg-gray-100 min-h-screen">
       <div className='bg-white'>
      <Nav/>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white flex p-2 rounded-md justify-between">
          <h2 className="font-public-sans font-semibold text-[24px] font-poppins">My Cart</h2>
          <Link className="items-center flex space-x-1" to="/">
            <div className="flex items-center gap-2">
              <MdHome className="w-7 h-7 text-gray-600" />
              <span className="text-blue-400">Home</span>
              <span><IoIosArrowForward /></span>
              <span>My Cart</span>
            </div>
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          {/* Left Section - Cart Items */}
          <div className={`${items.length === 0 ? 'w-full' : 'lg:w-2/3'} bg-white shadow-md rounded-md p-4`}>
            {items.length === 0 ? (
              <div className="text-center">
                <p className="text-gray-600 mb-4 font-semibold  text-lg">Your cart is empty</p>
                <div className="flex justify-center items-center pb-[100px] pt-4">
                  <img src={all} alt="" className="w-[180px] h-[180px]"/>
                </div>
                <div className="flex justify-center gap-4">
                  <Link
                    to="/"
                    className="inline-block bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600"
                  >
                    Continue Shopping
                  </Link>
                  
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700 border-b">
                      <th className="text-left px-4 py-2">Product</th>
                      <th className="text-center px-4 py-2">Qty</th>
                      <th className="text-right px-4 py-2">Total</th>
                      <th className="text-center px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="px-4 py-3 flex items-center space-x-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-contain rounded"
                          />
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                              {item.name}
                            </h3>
                            <p className="text-gray-600">
                              Price Per Piece: ${item.price.toLocaleString()}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() =>
                                item.qty > 1
                                  ? handleDecrement(item.id):1
                                 
                              }
                              className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100 transition"
                            >
                              -
                            </button>
                            <span className="w-8 text-center">{item.qty}</span>
                            <button
                              onClick={() => handleIncrement(item.id)}
                              className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100 transition"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right font-semibold">
                          ${(item.price * item.qty).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => {handleRemove(item.id);
                              
                             }}
                            className="text-red-500 hover:text-red-600"
                          >
                            Remove
                          </button>
  
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Right Section - Cart Summary - Only show when cart has items */}
          {items.length > 0 && (
            <div className="lg:w-1/3">
              <div className="bg-white rounded-md shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                  Cart Total
                </h2>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      ${subtotal.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-xl">
                    <span>Total Amount</span>
                    <span className="text-green-600">
                      ${total.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>

                  <div className="mt-6 space-y-3">
                    <button className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 font-medium">
                      Continue To Checkout
                    </button>
                    <Link
                      to="/"
                      className="block text-center text-gray-600 hover:underline"
                    >
                      ← Return To Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="pt-9">
        <Footer />
      </div>
    </div>
  );
};

export default Cart2;
