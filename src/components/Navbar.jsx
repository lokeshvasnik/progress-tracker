import Button from "./Button"

const Navbar = () => {
  return (
    <nav className="flex justify-between p-5 border-b-2 border-gray-200">
        <div>
            <h1 className="font-bold">CodeUp</h1>
        </div>
        <div>
            <ul className="inline-flex space-x-5 mx-4">
                <li>Features</li>
                <li>Pricing</li>
                <li>Support</li>
            </ul>
            <Button className="bg-blue-400 mx-2 rounded-md text-white cursor-pointer">Log in</Button>
            <Button className="bg-gray-300 rounded-md text-black cursor-pointer">Sign Up</Button>
        </div>
    </nav>
  )
}

export default Navbar

// theme tokens > for some reason this is not working
// keep button on seperate component > Completed