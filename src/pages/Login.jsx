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
    <div className='p-5 rounded-lg shadow-md max-w-md mx-auto mt-10'>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="block font-medium mb-1">Email address</label>
          <input
            type="email"
            className="form-control w-full my-4 border-b p-2"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-medium mb-1">Password</label>
          <textarea
            type="password"
            className="form-control w-full my-4 border-b p-2"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='w-full flex justify-center items-center my-4'>
          <Button type="submit" className="bg-[#00ADB5] rounded-md text-white text-center mx-auto cursor-pointer w-28">
            Submit
          </Button>
        </div>
        <p className="forgot-password text-center">
          New user <a href="/register">Register Here</a>
        </p>
      </form>
    </div>
  )
}

export default Login