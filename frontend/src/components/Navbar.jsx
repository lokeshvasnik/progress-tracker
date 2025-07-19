import { auth } from "./firebase";
import { Link } from "react-router-dom"
import { Power } from 'lucide-react';
import Button from "./Button"
import avatar from '../assets/profile.jpg'

const Navbar = ({ isAuthenticated }) => {

  const logoutHandler = async () => {
    await auth.signOut();
  }

  return (
    <nav className="flex justify-between p-5 border-b-2 border-gray-200">
      <div>
        <h1 className="font-bold"><Link to="/">CodeUp</Link></h1>
      </div>
      <div>
        {isAuthenticated ? <ul className="inline-flex space-x-5 mx-4 items-center">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/month">Last Month Stats</Link>
          {/* <li>Challenges</li>
          <li>Community</li> */}
          {/* <li>Resources</li> */}
          <div className="mx-2 rounded-md text-white cursor-pointer">
            <img className="w-10 rounded-full" src={avatar} alt="avatar" />
          </div>
          <Button onClick={logoutHandler} className="mx-2 rounded-md text-black cursor-pointer">
            <Power />
          </Button>
        </ul> : <ul className="inline-flex space-x-5 mx-4 items-center">
          <li>Features</li>
          <li>Pricing</li>
          <li>Support</li>
          <Button className="bg-blue-400 mx-2 rounded-md text-white cursor-pointer">
            <Link to="/login">Log in</Link>
          </Button>
          <Button className="bg-gray-300 rounded-md text-black cursor-pointer">
            <Link to="/register">Sign Up</Link>
          </Button>
        </ul>}

      </div>
    </nav>
  )
}

export default Navbar

// theme tokens > for some reason this is not working
// keep button on seperate component > Completed