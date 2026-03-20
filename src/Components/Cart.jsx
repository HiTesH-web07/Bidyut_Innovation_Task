import React from "react";
import image1 from "../assets/image1.jpg";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { AddItem } from "../redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Cart({ id, name, image, price, category, description}) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist);
  const isInWishlist = wishlistItems.some(item => item.id === id);

  const handleWishlistClick = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(id));
      toast.info("Item removed from wishlist");
    } else {
      dispatch(addToWishlist({ id, name, image, price, category }));
      toast.success("Item added to wishlist!");
    }
  };


  return (
    <div className="w-[260px] h-[390px] bg-white rounded-lg flex flex-col gap-3 shadow-md hover:shadow-xl border border-gray-200 transition-all p-4">
      {/* Image Container */}
       
      <Link 
  to="/description" 
  state={{ product: { id, name, image, price, category , description} }}
  className="w-full h-[250px] overflow-hidden rounded-lg bg-gray-100 flex justify-center items-center"
>
  <img 
    src={image} 
    className="w-full h-full object-contain object-center transition-transform duration-300 hover:scale-105" 
    alt={name}
  />
</Link>

      {/* Product Name & Category */}
      <div className="text-lg font-semibold text-gray-800">{name}</div>
      <p className="text-sm text-gray-500">{category}</p>

      {/* Price & Wishlist */}
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold text-gray-900">$ {price}/-</div>
        <button 
          className="flex items-center gap-2 text-gray-600 transition"
          onClick={handleWishlistClick}
        >
          {isInWishlist ? (
            <FaHeart className="w-5 h-5 text-red-500" />
          ) : (
            <FaRegHeart className="w-5 h-5 hover:text-red-500" />
          )}
          <span className="text-sm font-medium">Wishlist</span>
        </button>
      </div>

      {/* Add to Cart Button */}
      <button 
        className="w-full bg-orange-500 rounded-lg text-white text-lg font-semibold hover:bg-orange-600 transition-all flex justify-center items-center py-2 mt-2" 
        onClick={() => {
          dispatch(AddItem({ id, name, image, price, qty: 1 }));
          toast.success("Item Added");
        }}
      >
        <AiOutlineThunderbolt className="w-5 h-5 mr-2"/>
        Add to Cart
      </button>
    </div>
  );
};

export default Cart;