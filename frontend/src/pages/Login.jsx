import { useState } from 'react'
import { auth } from '../components/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import toast from 'react-hot-toast';
import Button from '../components/Button';
const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Login logic
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully');

      // Redirect to dashboard 
      window.location.href = '/dashboard';

    } catch (error) {
      console.log(error)
      toast.error("Error logging in");
    }
  }

  return (
    <div className="p-8 rounded-2xl max-w-md mx-auto bg-white">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">Login to your account</h2>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5] transition"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-semibold mb-2 text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5] transition"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="w-full flex justify-center mt-4">
          <button
            type="submit"
            className="bg-[#00ADB5] hover:bg-[#00949B] transition text-white font-medium rounded-lg px-6 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-[#00ADB5] focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
        <p className="text-center text-sm text-gray-600 mt-4">
          New user?
          <a href="/register" className="text-[#00ADB5] hover:underline font-medium ml-1">
            Register Here
          </a>
        </p>
      </form>
    </div>

  )
}

export default Login