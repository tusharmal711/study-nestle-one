import { Link } from "react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Header({ isAuthenticated :loggedIn }) {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <header className="shadow bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Left Section (Logo + Name) */}
        <Link to="/">
          <div className="flex items-center space-x-2">
            <img
              className="h-10 w-10 rounded"
              src="https://png.pngtree.com/png-clipart/20190902/original/pngtree-hand-painted-green-study-book-transparent-material-png-image_4383344.jpg"
              alt="logo"
            />
            <p className="font-serif text-green-800 font-bold text-xl">Nestle</p>
          </div>
        </Link>

        {/* Middle Nav */}
        <nav className="hidden md:flex space-x-6 font-semibold text-green-800">
          <Link to="/" className="hover:text-green-600">Home</Link>
          <Link to="/upload" className="hover:text-green-600">Upload Material</Link>
          <Link to="/disp" className="hover:text-green-600">Study Material</Link>
          <Link to="/about" className="hover:text-green-600">About</Link>
          <Link to="/contact" className="hover:text-green-600">Contact Us</Link>
        </nav>

        {/* Right Section (Login/Profile Button) */}
        <div className="hidden md:block">
          {loggedIn ? (
            <Link to="/getProfile">
              <button className="bg-green-700 text-white px-5 py-2 rounded-full hover:bg-green-800">
                Profile
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="bg-green-700 text-white px-5 py-2 rounded-full hover:bg-green-800">
                Log In
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-green-800 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4">
          <Link to="/" className="block text-green-800 font-semibold hover:text-green-600">Home</Link>
          <Link to="/upload" className="block text-green-800 font-semibold hover:text-green-600">Upload Material</Link>
          <Link to="/disp" className="block text-green-800 font-semibold hover:text-green-600">Study Material</Link>
          <Link to="/about" className="block text-green-800 font-semibold hover:text-green-600">About</Link>
          <Link to="/contact" className="block text-green-800 font-semibold hover:text-green-600">Contact Us</Link>

          {loggedIn ? (
            <Link to="/getProfile">
              <button className="w-full bg-green-700 text-white px-5 py-2 rounded-full hover:bg-green-800">
                Profile
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="w-full bg-green-700 text-white px-5 py-2 rounded-full hover:bg-green-800">
                Log In
              </button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
