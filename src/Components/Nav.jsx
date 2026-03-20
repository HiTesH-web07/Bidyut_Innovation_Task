import React, { useContext, useState, useRef, useEffect } from "react";
import kulies_logo from "../assets/kulies_logo.png";
import { IoSearch } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { dataContext } from "../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setFilters } from "../redux/productsSlice";

const Nav = () => {
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, logout } = useContext(dataContext);
  const cartItems = useSelector((s) => s.cart);
  const wishlistItems = useSelector((s) => s.wishlist);
  const { filters } = useSelector((s) => s.products);

  const handleMouseEnter = () => { clearTimeout(timeoutRef.current); setIsLoginDropdownOpen(true); };
  const handleMouseLeave = () => { timeoutRef.current = setTimeout(() => setIsLoginDropdownOpen(false), 200); };

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsLoginDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => { document.removeEventListener("mousedown", handler); clearTimeout(timeoutRef.current); };
  }, []);

  const handleSearch = (value) => {
    dispatch(setFilters({ ...filters, search: value }));
    if (window.location.pathname !== "/") navigate("/");
  };

  const handleLogout = () => {
    logout();
    setIsLoginDropdownOpen(false);
    navigate("/");
  };

  return (
    <div className="w-full h-[80px] flex justify-between items-center px-5 md:px-8 shadow-sm bg-white sticky top-0 z-40">
      {/* Logo */}
      <Link to="/" className="h-[140px] w-[140px] flex justify-center items-center flex-shrink-0">
        <img src={kulies_logo} alt="Logo" className="object-contain" />
      </Link>

      {/* Search Bar */}
      <form
        className="w-[35%] md:w-[45%] h-[46px] bg-white flex items-center px-4 pr-0 gap-3 rounded-lg border border-gray-300 focus-within:border-orange-400 transition"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="Search products, brands and more…"
          className="w-full outline-none text-[13px] md:text-[15px] text-gray-700 placeholder-gray-400"
          onChange={(e) => handleSearch(e.target.value)}
          value={filters.search}
        />
        <button
          type="submit"
          className="bg-orange-400 text-white h-full px-4 flex justify-center items-center rounded-r-lg hover:bg-orange-500 transition-colors flex-shrink-0"
        >
          <IoSearch className="w-[20px] h-[20px]" />
        </button>
      </form>

      {/* Right Icons */}
      <div className="flex gap-4 items-center">
        {/* Profile / Login dropdown */}
        <div className="relative" ref={dropdownRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className="flex items-center gap-1 cursor-pointer select-none">
            <CgProfile className="w-[22px] h-[22px] text-gray-700" />
            <span className="text-[14px] font-medium text-gray-700 hidden sm:inline">
              {user ? user.name.split(" ")[0] : "Login"}
            </span>
            <IoIosArrowDown className={`text-gray-500 transition-transform duration-200 ${isLoginDropdownOpen ? "rotate-180" : ""}`} />
          </div>

          {isLoginDropdownOpen && (
            <div
              className="absolute right-0 top-full mt-1 w-[150px] bg-white rounded-xl shadow-xl z-50 border border-gray-100 overflow-hidden"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {user ? (
                <>
                  <div className="px-4 py-2 text-xs text-gray-400 border-b">{user.email}</div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 transition"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <ul>
                  <li>
                    <Link to="/login" className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition" onClick={() => setIsLoginDropdownOpen(false)}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition" onClick={() => setIsLoginDropdownOpen(false)}>
                      Sign Up
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>

        <span className="h-6 w-px bg-gray-200" />

        {/* Wishlist */}
        <Link to="/wishlist" className="flex items-center gap-1 relative group">
          {wishlistItems.length > 0 && (
            <span className="absolute -top-2 -left-1 bg-red-500 text-white w-[16px] h-[16px] flex items-center justify-center text-[9px] rounded-full font-bold z-10">
              {wishlistItems.length}
            </span>
          )}
          <FaHeart className="w-[16px] h-[16px] text-gray-600 group-hover:text-red-500 transition" />
          <span className="text-[14px] font-medium text-gray-700 group-hover:text-red-500 transition hidden sm:inline">Wishlist</span>
        </Link>

        <span className="h-6 w-px bg-gray-200" />

        {/* Cart */}
        <Link to="/cart" className="flex items-center gap-1 relative group">
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -left-1 bg-orange-500 text-white w-[16px] h-[16px] flex items-center justify-center text-[9px] rounded-full font-bold z-10">
              {cartItems.length}
            </span>
          )}
          <FaShoppingCart className="w-[16px] h-[16px] text-gray-600 group-hover:text-orange-500 transition" />
          <span className="text-[14px] font-medium text-gray-700 group-hover:text-orange-500 transition hidden sm:inline">Cart</span>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
