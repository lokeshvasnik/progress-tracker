import { useState } from "react";
import { Link } from "react-router-dom"
import Button from "./Button"
import avatar from '../assets/profile.jpg'

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <nav className="flex justify-between p-5 border-b-2 border-gray-200">
      <div>
        <h1 className="font-bold"><Link to="/">CodeUp</Link></h1>
      </div>
      <div>
        {isAuthenticated ? <ul className="inline-flex space-x-5 mx-4">
          <li>Dashboard</li>
          <li>Roadmaps</li>
          <li>Challenges</li>
          <li>Community</li>
          <li>Resources</li>
          <Button className="bg-blue-400 py-2 mx-2 rounded-md text-white cursor-pointer">
          </Button>
          <Button className="bg-gray-300 py-2 rounded-md text-black cursor-pointer w-10">
          </Button>
        </ul> : <ul className="inline-flex space-x-5 mx-4">
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