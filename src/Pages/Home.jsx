import React, { useRef, useState, useMemo, useEffect } from "react";
import Nav from "../Components/Nav";
import banner3 from "../assets/Banner3.png";
import banner4 from "../assets/Banner4.png";
import Carousel from "../Components/carousel.component";
import Cart from "../Components/Cart";
import NewsLetter from "../Components/NewsLetter";
import Footer from "../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, resetFilters, selectFilteredProducts } from "../redux/productsSlice";
import Categories from "../Categories";
import emptycart from "../assets/emptycart.png";
import { FiFilter, FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { BiSortAlt2 } from "react-icons/bi";

const PRICE_MIN = 0;
const PRICE_MAX = 200000;

const sortOptions = [
  { label: "Default",            sortBy: "default", sortOrder: "asc"  },
  { label: "Price: Low → High",  sortBy: "price",   sortOrder: "asc"  },
  { label: "Price: High → Low",  sortBy: "price",   sortOrder: "desc" },
  { label: "Name: A → Z",        sortBy: "name",    sortOrder: "asc"  },
  { label: "Name: Z → A",        sortBy: "name",    sortOrder: "desc" },
];

export default function Home() {
  const dispatch  = useDispatch();
  const filters   = useSelector((s) => s.products.filters);

  // ── Instant filtered list via useMemo — zero async, zero lag ──
  const products = useMemo(() => selectFilteredProducts({ products: { filters } }), [filters]);

  // Local price state for smooth slider drag without re-filtering on every px
  const [localMin, setLocalMin] = useState(filters.minPrice);
  const [localMax, setLocalMax] = useState(filters.maxPrice);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [sortOpen, setSortOpen]  = useState(false);
  const priceDebounce = useRef(null);
  const sortRef       = useRef(null);

  // Sync local slider if filters are reset externally (e.g. "Reset All")
  useEffect(() => { setLocalMin(filters.minPrice); }, [filters.minPrice]);
  useEffect(() => { setLocalMax(filters.maxPrice); }, [filters.maxPrice]);

  // Close sort dropdown on outside click
  useEffect(() => {
    const h = (e) => { if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // ── Handlers ──
  const handleCategory = (category) => {
    dispatch(setFilters({ category }));
    setMobileSidebarOpen(false);
  };

  // Slider drags update local state immediately (silky smooth),
  // then commit to Redux after 350ms pause (debounced)
  const handlePriceSlider = (min, max) => {
    setLocalMin(min);
    setLocalMax(max);
    clearTimeout(priceDebounce.current);
    priceDebounce.current = setTimeout(() => {
      dispatch(setFilters({ minPrice: min, maxPrice: max }));
    }, 350);
  };

  const handleSort = (sortBy, sortOrder) => {
    dispatch(setFilters({ sortBy, sortOrder }));
    setSortOpen(false);
  };

  const handleReset = () => {
    setLocalMin(PRICE_MIN);
    setLocalMax(PRICE_MAX);
    dispatch(resetFilters());
  };

  const activePriceFilter  = filters.minPrice > PRICE_MIN || filters.maxPrice < PRICE_MAX;
  const activeCategoryFilter = filters.category !== "All Products";
  const activeFilterCount  = [activeCategoryFilter, activePriceFilter, filters.sortBy !== "default"].filter(Boolean).length;

  const currentSortLabel = sortOptions.find(
    (o) => o.sortBy === filters.sortBy && o.sortOrder === filters.sortOrder
  )?.label ?? "Sort By";

  const slides = [
    <img key={1} src={banner3} className="w-full h-full object-cover" alt="Banner 1" />,
    <img key={2} src={banner4} className="w-full h-full object-cover" alt="Banner 2" />,
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Nav />

      {/* ── Hero Carousel ── */}
      <div className="w-full bg-white">
        <div className="w-[95%] mx-auto py-5">
          <Carousel autoslide={true}>{slides}</Carousel>
        </div>
      </div>

      {/* ── Main 2-column layout ── */}
      <div className="w-[95%] mx-auto py-6 flex gap-5 items-start">

        {/* ════════════════════════════
            DESKTOP SIDEBAR
        ════════════════════════════ */}
        <aside className="hidden lg:block w-60 flex-shrink-0 sticky top-[88px]">
          <SidebarContent
            filters={filters}
            localMin={localMin}
            localMax={localMax}
            activeFilterCount={activeFilterCount}
            activePriceFilter={activePriceFilter}
            onCategory={handleCategory}
            onPriceSlider={handlePriceSlider}
            onReset={handleReset}
          />
        </aside>

        {/* ════════════════════════════
            MOBILE SIDEBAR DRAWER
        ════════════════════════════ */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative bg-white w-72 h-full overflow-y-auto shadow-2xl animate-slideIn">
              <div className="flex justify-between items-center px-4 py-4 border-b border-gray-100">
                <span className="font-bold text-gray-800 text-base">Filters</span>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
                >
                  <FiX className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div className="p-4">
                <SidebarContent
                  filters={filters}
                  localMin={localMin}
                  localMax={localMax}
                  activeFilterCount={activeFilterCount}
                  activePriceFilter={activePriceFilter}
                  onCategory={(c) => { handleCategory(c); setMobileSidebarOpen(false); }}
                  onPriceSlider={handlePriceSlider}
                  onReset={handleReset}
                />
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════
            PRODUCT AREA
        ════════════════════════════ */}
        <div className="flex-1 min-w-0">

          {/* ── Toolbar bar ── */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center flex-wrap gap-2">

              {/* Mobile filter trigger */}
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:border-orange-400 transition"
              >
                <FiFilter className="w-4 h-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-orange-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Count */}
              <span className="text-sm text-gray-500">
                <strong className="text-gray-800">{products.length}</strong>
                {" "}product{products.length !== 1 ? "s" : ""}
              </span>

              {/* Active filter chips */}
              {activeCategoryFilter && (
                <FilterChip
                  label={filters.category}
                  color="orange"
                  onRemove={() => handleCategory("All Products")}
                />
              )}
              {activePriceFilter && (
                <FilterChip
                  label={`₹${filters.minPrice.toLocaleString()} – ₹${filters.maxPrice.toLocaleString()}`}
                  color="blue"
                  onRemove={() => {
                    setLocalMin(PRICE_MIN); setLocalMax(PRICE_MAX);
                    dispatch(setFilters({ minPrice: PRICE_MIN, maxPrice: PRICE_MAX }));
                  }}
                />
              )}
            </div>

            {/* Sort dropdown */}
            <div className="relative" ref={sortRef}>
              <button
                onClick={() => setSortOpen((o) => !o)}
                className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:border-orange-400 transition min-w-[170px] justify-between"
              >
                <span className="flex items-center gap-1.5 text-gray-700">
                  <BiSortAlt2 className="w-4 h-4 text-gray-400" />
                  {currentSortLabel}
                </span>
                {sortOpen
                  ? <FiChevronUp className="w-3.5 h-3.5 text-gray-400" />
                  : <FiChevronDown className="w-3.5 h-3.5 text-gray-400" />
                }
              </button>

              {sortOpen && (
                <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-gray-100 rounded-xl shadow-2xl z-30 overflow-hidden py-1">
                  {sortOptions.map((opt) => {
                    const active = filters.sortBy === opt.sortBy && filters.sortOrder === opt.sortOrder;
                    return (
                      <button
                        key={opt.label}
                        onClick={() => handleSort(opt.sortBy, opt.sortOrder)}
                        className={`w-full text-left px-4 py-2.5 text-sm transition flex items-center justify-between
                          ${active
                            ? "bg-orange-50 text-orange-600 font-semibold"
                            : "text-gray-700 hover:bg-gray-50"
                          }`}
                      >
                        {opt.label}
                        {active && <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* ── Product Grid ── */}
          {products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((item) => (
                <Cart
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                  category={item.category}
                  description={item.description}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <img src={emptycart} alt="No results" className="w-28 h-28 object-contain mb-4 opacity-30" />
              <p className="text-lg font-semibold text-gray-500">No products found</p>
              <p className="text-sm text-gray-400 mt-1 mb-5">Try adjusting your filters</p>
              <button
                onClick={handleReset}
                className="px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition text-sm font-semibold"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Newsletter ── */}
      <div className="w-full bg-gray-100 mt-4">
        <div className="w-[95%] mx-auto py-10">
          <NewsLetter />
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="w-full bg-white">
        <div className="w-[85%] mx-auto py-10">
          <Footer />
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────
   FilterChip — removable active-filter tag
────────────────────────────────────────────────────── */
function FilterChip({ label, color, onRemove }) {
  const colors = {
    orange: "bg-orange-100 text-orange-700 border-orange-200",
    blue:   "bg-blue-100 text-blue-700 border-blue-200",
  };
  return (
    <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${colors[color]}`}>
      {label}
      <button onClick={onRemove} className="ml-0.5 hover:opacity-70 transition">
        <FiX className="w-3 h-3" />
      </button>
    </span>
  );
}

/* ──────────────────────────────────────────────────────
   SidebarContent — shared between desktop aside & mobile drawer
────────────────────────────────────────────────────── */
function SidebarContent({ filters, localMin, localMax, activeFilterCount, activePriceFilter, onCategory, onPriceSlider, onReset }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

      {/* Sidebar header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
        <span className="font-bold text-gray-700 text-sm flex items-center gap-2">
          <FiFilter className="w-3.5 h-3.5 text-orange-500" />
          Filters
          {activeFilterCount > 0 && (
            <span className="bg-orange-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {activeFilterCount}
            </span>
          )}
        </span>
        {activeFilterCount > 0 && (
          <button
            onClick={onReset}
            className="text-xs text-orange-500 hover:text-orange-700 font-semibold transition"
          >
            Reset
          </button>
        )}
      </div>

      {/* ── CATEGORY ── */}
      <div className="px-4 py-4 border-b border-gray-100">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
          Category
        </p>
        <div className="flex flex-col gap-0.5">
          {Categories.map((item) => {
            const active = filters.category === item.name;
            return (
              <button
                key={item.id}
                onClick={() => onCategory(item.name)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left w-full transition-all duration-150
                  ${active
                    ? "bg-orange-500 text-white shadow-sm shadow-orange-200"
                    : "text-gray-600 hover:bg-gray-50"
                  }`}
              >
                <img
                  src={item.image}
                  className={`w-6 h-6 object-contain flex-shrink-0 ${active ? "brightness-0 invert" : ""}`}
                  alt=""
                />
                <span className="flex-1">{item.name}</span>
                {active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── PRICE RANGE ── */}
      <div className="px-4 py-4">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
          Price Range
        </p>

        {/* Price badges */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-gray-400 mb-1">Min</span>
            <span className="text-xs font-bold text-orange-600 bg-orange-50 border border-orange-100 rounded-lg px-2.5 py-1">
              ₹{localMin.toLocaleString()}
            </span>
          </div>
          <div className="flex-1 h-px bg-gray-200 mx-3" />
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-gray-400 mb-1">Max</span>
            <span className="text-xs font-bold text-orange-600 bg-orange-50 border border-orange-100 rounded-lg px-2.5 py-1">
              ₹{localMax.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Min slider */}
        <div className="mb-3">
          <div className="flex justify-between text-[10px] text-gray-400 mb-1">
            <span>Min price</span>
            <span>₹{localMin.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={500}
            value={localMin}
            onChange={(e) => {
              const v = Math.min(Number(e.target.value), localMax - 500);
              onPriceSlider(v, localMax);
            }}
            className="w-full accent-orange-500 cursor-pointer"
          />
        </div>

        {/* Max slider */}
        <div className="mb-4">
          <div className="flex justify-between text-[10px] text-gray-400 mb-1">
            <span>Max price</span>
            <span>₹{localMax.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={500}
            value={localMax}
            onChange={(e) => {
              const v = Math.max(Number(e.target.value), localMin + 500);
              onPriceSlider(localMin, v);
            }}
            className="w-full accent-orange-500 cursor-pointer"
          />
        </div>

        {/* Quick presets */}
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { label: "Under ₹1K",  min: 0,     max: 1000   },
            { label: "₹1K – ₹5K",  min: 1000,  max: 5000   },
            { label: "₹5K – ₹25K", min: 5000,  max: 25000  },
            { label: "Above ₹25K", min: 25000, max: PRICE_MAX },
          ].map((p) => {
            const active = localMin === p.min && localMax === p.max;
            return (
              <button
                key={p.label}
                onClick={() => onPriceSlider(p.min, p.max)}
                className={`text-[11px] px-2 py-1.5 rounded-lg border font-medium transition-all duration-150
                  ${active
                    ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                    : "bg-gray-50 text-gray-500 border-gray-200 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50"
                  }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
