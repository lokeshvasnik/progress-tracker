import { auth } from "./firebase";
import { Link } from "react-router-dom"
import { Power } from 'lucide-react';

import avatar from '../assets/profile.jpg'

const Navbar = ({ isAuthenticated }) => {

  const logoutHandler = async () => {
    await auth.signOut();
  }

  return (
    <nav className="flex justify-between items-center p-5 border-b-2 border-gray-200 bg-white shadow-sm">
      {/* Logo / Brand */}
      <div>
        <h1 className="font-bold text-xl text-[#00ADB5] tracking-tight">
          <Link to="/">CodeUp</Link>
        </h1>
      </div>

      {/* Main Nav Section */}
      <div>
        {isAuthenticated ? (
          <ul className="flex items-center space-x-6">
            <li>
              <Link to="/dashboard" className="text-gray-800 font-medium hover:text-[#00ADB5] transition">Dashboard</Link>
            </li>
            <li>
          <Link to="/month" className="text-gray-800 font-medium hover:text-[#00ADB5] transition">Previous Stats</Link>
        </li>
            <li>
              <Link to="/history" className="text-gray-800 font-medium hover:text-[#00ADB5] transition">History</Link>
            </li>
            {/* Add more links/features as needed */}

            {/* Avatar */}
            <li>
              <div className="mx-2">
                <img className="w-10 h-10 rounded-full ring-2 ring-[#00ADB5]" src={avatar} alt="avatar" />
              </div>
            </li>
            {/* Logout Button */}
            <li>
              <button
                onClick={logoutHandler}
                className="mx-2 flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-red-50 transition"
                title="Logout"
              >
                <Power className="w-6 h-6" />
              </button>
            </li>
          </ul>
        ) : (
          <ul className="flex items-center space-x-4">
            <li>
              <span className="text-gray-800 font-medium hover:text-[#00ADB5] cursor-pointer transition">
                <Link to="/features">Features</Link>
              </span>
            </li>
            <li>
              <span className="text-gray-800 font-medium hover:text-[#00ADB5] cursor-pointer transition">
                <Link to="/pricing">Pricing</Link>
              </span>
            </li>
            <li>
              <span className="text-gray-800 font-medium hover:text-[#00ADB5] cursor-pointer transition">
                <Link to="/support">Support</Link>
              </span>
            </li>
            <li>
              <Link
                to="/login"
                className="bg-[#00ADB5] hover:bg-[#00949B] transition px-5 py-2 rounded-md text-white font-semibold"
              >
                Log in
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bg-[#00ADB5] hover:bg-[#00949B] transition px-5 py-2 rounded-md text-white font-semibold"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}

export default Navbar

// theme tokens > for some reason this is not working
// keep button on seperate component > Completed