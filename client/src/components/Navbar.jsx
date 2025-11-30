import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { useAppContext } from '../context/AppContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useUser()
  const { openSignIn } = useClerk()
  const navigate = useNavigate()

  const { favoriteMovies } = useAppContext();

  return (
    <nav className="fixed top-0 left-0 z-50 w-full shadow-sm">
      {/* ─── Top Row ───────────────────────────── */}
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-16 lg:px-36 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={assets.logo} alt="logo" className="w-28 sm:w-32 h-auto" />
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-gray-700 rounded-md px-3 py-2 w-[40%]">
          <SearchIcon className="text-gray-300 w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder="Search for Movies, Events, Plays, Sports and Activities"
            className="bg-transparent outline-none w-full text-sm text-gray-200 placeholder-gray-400"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 sm:gap-6">
          <p className="text-gray-300 text-sm hidden sm:block">INDIA ▼</p>

          {!user ? (
            <button
              onClick={openSignIn}
              className="px-4 sm:px-6 py-1.5 bg-[#f84464] text-white rounded text-sm hover:bg-[#d93755] transition"
            >
              Sign In
            </button>
          ) : (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Bookings"
                  labelIcon={<TicketPlus width={15} />}
                  onClick={() => navigate('/my-bookings')}
                />
              </UserButton.MenuItems>
            </UserButton>
          )}

      
          <MenuIcon
            onClick={() => setIsOpen(true)}
            className="w-7 h-7 text-gray-700 cursor-pointer md:hidden"
          />
        </div>
      </div>

      {/* Bottom Row   */}
      <div className="hidden md:flex justify-between items-center text-md px-29 py-2 ">
        <div className="flex gap-6 text-gray-200">
          <Link to="/">Home</Link>
          <Link to="/">Theaters</Link>
          <Link to="/">Releases</Link>
          {favoriteMovies.length > 0 && <Link to="/favorite">Favorites</Link>}
          
        </div>

        <div className="flex gap-6 text-gray-300">
          <Link to="/">ListYourShow</Link>
          <Link to="/">Corporates</Link>
          <Link to="/">Offers</Link>
        </div>
      </div>

      {/* Mobile Menu*/}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center space-y-8 text-white text-xl z-50 transition-all">
          <XIcon
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 w-8 h-8 cursor-pointer hover:rotate-90 transition-transform"
          />
          <Link onClick={() => setIsOpen(false)} to="/" className="hover:text-[#f84464] transition">Home</Link>
          <Link onClick={() => setIsOpen(false)} to="/movies" className="hover:text-[#f84464] transition">Movies</Link>
          <Link onClick={() => setIsOpen(false)} to="/" className="hover:text-[#f84464] transition">Theaters</Link>
          <Link onClick={() => setIsOpen(false)} to="/" className="hover:text-[#f84464] transition">Releases</Link>
          {favoriteMovies.length > 0 && <Link onClick={() => setIsOpen(false)} to="/favorite" className="hover:text-[#f84464] transition">Favorites</Link>}
        </div>
      )}
    </nav>
  )
}

export default Navbar