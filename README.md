kjnkdsdsds# 🛒 Kulies — E-Commerce Product Listing App

A fully functional e-commerce product listing application built with React and Redux Toolkit. Features dynamic filtering, sorting, cart management, wishlist, and persistent state across page refreshes.

---

## 🚀 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **React** | 19.0.0 | UI library |
| **Vite** | 6.2.0 | Build tool & dev server |
| **Tailwind CSS** | 4.0.17 | Utility-first styling |
| **Redux Toolkit** | 2.6.1 | Global state management |
| **React Redux** | 9.2.0 | React bindings for Redux |
| **Redux Persist** | 6.0.0 | Persist cart & wishlist in localStorage |
| **React Router DOM** | 7.4.1 | Client-side routing |
| **React Icons** | 5.5.0 | Icon library |
| **React Toastify** | 11.0.5 | Toast notifications |
| **Axios** | 1.8.4 | HTTP client (API ready) |
| **ESLint** | 9.21.0 | Code linting |

---

## ✨ Features

- 🔍 **Product Search** — Live search from the navbar with debounce
- 🗂️ **Category Filtering** — Filter products by Electronics, Fashion, Sports, Beauty, Home & Kitchen
- 💰 **Price Range Filter** — Dual sliders (min/max) with quick preset buttons
- ↕️ **Sorting** — Sort by Price (Low→High, High→Low), Name (A→Z, Z→A), or Default
- 🛒 **Cart** — Add, remove, increment/decrement quantity, view total
- ❤️ **Wishlist** — Save and manage favourite products
- 💾 **Persistent State** — Cart and wishlist survive page refresh via redux-persist
- 🔐 **Auth Forms** — Login and Sign Up with full form validation
- 📦 **Product Detail Page** — Image zoom, wholesale pricing, add to cart/wishlist
- 📱 **Responsive Design** — Mobile sidebar drawer, responsive product grid
- 🔔 **Toast Notifications** — Feedback on every user action

---

## 📁 Project Structure

```
src/
├── assets/              # Images, banners, category icons
├── Components/
│   ├── Cart.jsx         # Product card component
│   ├── Cart2.jsx        # Cart page (full view)
│   ├── Checkout.jsx     # Checkout page
│   ├── Description.jsx  # Product detail page with zoom
│   ├── Footer.jsx       # Site footer
│   ├── Login.jsx        # Login form with validation
│   ├── Nav.jsx          # Navbar with search, cart & wishlist badges
│   ├── NewsLetter.jsx   # Newsletter signup section
│   ├── SignUp.jsx       # Sign up form with validation
│   ├── Wishlist.jsx     # Wishlist page
│   └── carousel.component.jsx  # Auto-sliding banner carousel
├── Context/
│   └── UserContext.jsx  # Auth state (user, login, logout)
├── Pages/
│   └── Home.jsx         # Product listing with filters & sorting
├── redux/
│   ├── cartSlice.js       # Cart actions (add, remove, qty)
│   ├── productsSlice.js   # Products with filter/sort selector
│   ├── store.js           # Redux store with persist config
│   └── wishlistSlice.js   # Wishlist actions
├── Categories.jsx       # Category list with images
├── srore.js             # Product data (22 products, 5 categories)
├── App.jsx              # Routes definition
└── main.jsx             # App entry point with Provider & PersistGate
```

---

## 🏁 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) — version **18 or higher**
- npm — comes with Node.js

Check your versions:
```bash
node -v
npm -v
```

---

### Installation & Running

**1. Clone the repository**
```bash
git clone https://github.com/HiTesH-web07/Bidyut_Task.git
cd Bidyut_Task
```

**2. Install dependencies**
```bash
npm install
```

**3. Start the development server**
```bash
npm run dev
```

**4. Open in browser**
```
http://localhost:5173
```

---

### Other Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production (outputs to `/dist`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## 🗺️ App Routes

| Route | Page |
|---|---|
| `/` | Home — product listing with filters |
| `/cart` | Cart page |
| `/wishlist` | Wishlist page |
| `/description` | Product detail page |
| `/login` | Login form |
| `/signup` | Sign up form |
| `/checkout` | Checkout page |

---

## 📦 Product Categories

The app includes **22 products** across **5 categories**:

- 💻 Electronics (5 products)
- 👗 Fashion (5 products)
- 🏠 Home & Kitchen (5 products)
- ⚽ Sports (4 products)
- 💄 Beauty (3 products)

---

## 🔧 State Management

Redux Toolkit manages three slices of state:

| Slice | Persisted | Responsibility |
|---|---|---|
| `cart` | ✅ Yes | Cart items, quantities, totals |
| `wishlist` | ✅ Yes | Saved/favourite products |
| `products` | ❌ No | Product list, active filters, sort order |

Cart and wishlist are saved to **localStorage** via `redux-persist` so they survive page refreshes and browser restarts.

---

## 👨‍💻 Author

Built as part of the **Bidyut Task** assignment.
