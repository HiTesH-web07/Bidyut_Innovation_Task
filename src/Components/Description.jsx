import React, { useState, useRef, useEffect } from "react";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { FaRegHeart, FaHeart, FaCheckCircle } from "react-icons/fa";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { AddItem } from "../redux/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import Footer from "./Footer";
import { toast } from "react-toastify";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import { dummydata } from "../srore";

const Description = () => {
  const location = useLocation();
  const productFromState = location.state?.product;
  const product = dummydata.find(item => item.id === productFromState?.id) || productFromState || dummydata[0];

  const wishlistItems = useSelector((state) => state.wishlist);
  const isInWishlist = wishlistItems.some(item => item.id === product?.id);
  const dispatch = useDispatch();

  // Optimized Zoom Setup
  const [showZoom, setShowZoom] = useState(false);
  const imageRef = useRef(null);
  const zoomBoxRef = useRef(null);
  const zoomRef = useRef(null);
  const animationFrame = useRef(null);

  const handleMouseMove = (e) => {
    if (!imageRef.current || !zoomBoxRef.current || !zoomRef.current) return;

    if (animationFrame.current) cancelAnimationFrame(animationFrame.current);

    animationFrame.current = requestAnimationFrame(() => {
      const rect = imageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;

      // Move zoom box
      zoomBoxRef.current.style.left = `${x - 64}px`;
      zoomBoxRef.current.style.top = `${y - 64}px`;

      // Update background position in zoom preview
      zoomRef.current.style.backgroundPosition = `${percentX}% ${percentY}%`;
    });
  };

  const handleMouseEnter = () => setShowZoom(true);
  const handleMouseLeave = () => {
    setShowZoom(false);
    if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
  };

  useEffect(() => {
    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  const handleAddToCart = () => {
    dispatch(AddItem({ ...product, qty: 1 }));
    toast.success("Item added to cart");
  };

  const handleWishlistClick = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast.error("Item removed from wishlist");
    } else {
      dispatch(addToWishlist(product));
      toast.success("Item added to wishlist!");
    }
  };

  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <div className="bg-white">
        <Nav />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white flex p-4 rounded-md justify-between items-center mb-6">
          <h2 className="font-semibold text-2xl">Product Details</h2>
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="flex items-center" >
              <MdHome className="w-5 h-5 mr-1" />
              <span className="text-blue-500 hover:text-blue-700">Home</span>
            <IoIosArrowForward className="text-gray-500" />
            <span className="text-[15px]">Product Details</span>
            </Link>
          </div>
        </div>

        <div className="bg-white flex flex-wrap md:flex-nowrap gap-12 px-6 py-10 rounded-md shadow-sm">
          {/* Image Zoom Section */}
          <div className="w-full md:w-[30%] flex flex-col items-center justify-center relative">
            <div
              className="relative overflow-hidden flex items-center"
              ref={imageRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={product?.image}
                alt="Product"
                className="cursor-crosshair w-full h-full object-contain  transition-transform  "
              />
              {showZoom && (
                <div
                  ref={zoomBoxRef}
                  className="absolute w-32 h-32  bg-opacity-50 border-2 border-orange-500 pointer-events-none"
                />
              )}
            </div>

            {showZoom && (
              <div
                ref={zoomRef}
                className="absolute left-full ml-4 hidden md:block border border-gray-200 bg-white overflow-hidden"
                style={{
                  backgroundImage: `url(${product?.image})`,
                  backgroundSize: "300%",
                  backgroundRepeat: "no-repeat",
                  width: "400px",
                  height: "400px",
                  zIndex: 10,
                }}
              />
            )}
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col gap-5 w-full md:w-[65%]">
            <h1 className="font-bold text-3xl text-gray-800">{product?.name}</h1>

            <div className="flex justify-between items-center gap-2">
              <span className="text-blue-600 text-2xl font-semibold">
                Price ${product?.price}/-
              </span>
              <div className="flex gap-2 items-center">
                <span className="text-yellow-500 font-semibold text-xl ml-4">5.0</span>
                <span className="text-blue-500">(1 Customer Review)</span>
              </div>
            </div>

            <p className="text-gray-600">{product?.description}</p>

            <div className="bg-gray-50 p-4 rounded-md shadow-sm w-full md:w-[80%]">
              <h2 className="font-semibold mb-3">Wholesale Price (Unit/Units):</h2>
              <ul className="text-gray-600 list-disc list-inside">
                <li className="pb-3">
                  Quantity 1 - 10 : <span className="text-blue-500">Price ${product?.price}</span>
                </li>
                <li className="pb-3">
                  Quantity 11 - 50 : <span className="text-blue-500">Price ${(product?.price * 0.9).toFixed(2)}</span>
                </li>
                <li>
                  Quantity 51 - 1000 : <span className="text-blue-500">Price ${(product?.price * 0.8).toFixed(2)}</span>
                </li>
              </ul>
            </div>

            <div className="flex items-center text-green-600 font-semibold mt-2">
              <FaCheckCircle className="text-green-500 mr-2" />
              In Stock - Order Now!
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={handleAddToCart}
                className="py-2 px-6 w-[35%] bg-orange-500 rounded-lg text-white text-lg font-semibold hover:bg-orange-600 transition-all flex justify-center items-center"
              >
                <AiOutlineThunderbolt className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
              <button
                onClick={handleWishlistClick}
                className="py-2 px-6 w-[35%] bg-orange-500 rounded-lg text-white text-lg font-semibold hover:bg-orange-600 transition-all flex justify-center items-center"
              >
                {isInWishlist ? (
                  <FaHeart className="fill-white w-5 h-5 mr-2" />
                ) : (
                  <FaRegHeart className="fill-white w-5 h-5 mr-2" />
                )}
                {isInWishlist ? "In Wishlist" : "Add To Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-9">
        <Footer />
      </div>
    </div>
  );
};

export default Description;
