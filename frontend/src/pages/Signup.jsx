import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth, db } from '../components/firebase';
import { setDoc, doc } from 'firebase/firestore';
import Button from '../components/Button';
import toast from 'react-hot-toast';
const Signup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            // Create a new user with email and password
            await createUserWithEmailAndPassword(auth, email, password)
            const user = auth.currentUser;

            if (!user) {
                console.error("No user is currently signed in.");
                return;
            }
            // Create a document in Firestore with the user's UID
            if (user) {
                await setDoc(doc(db, "users", user.uid), {
                    firstName: fname,
                    lastName: lname,
                    email: email,
                    uid: user.uid
                });
            }
            // Log the user object
            console.log('User created:', user);
            toast.success("User registered successfully");
            window.location.href = '/login';
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div className="p-8 rounded-2xl max-w-md mx-auto bg-white">
            <form className="space-y-6" onSubmit={handleRegister}>
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Sign Up</h2>

                <div>
                    <label htmlFor="fname" className="block text-sm font-semibold mb-2 text-gray-700">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="fname"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5] transition"
                        placeholder="First name"
                        onChange={(e) => setFname(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="lname" className="block text-sm font-semibold mb-2 text-gray-700">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lname"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5] transition"
                        placeholder="Last name"
                        onChange={(e) => setLname(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-700">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5] transition"
                        placeholder="Enter email"
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
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="w-full flex justify-center mt-4">
                    <button
                        type="submit"
                        className="bg-[#00ADB5] hover:bg-[#00949B] transition text-white font-medium rounded-lg px-6 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-[#00ADB5] focus:ring-offset-2"
                    >
                        Sign Up
                    </button>
                    {/* Or use your custom <Button> instead of <button> */}
                </div>
                <p className="text-center text-sm text-gray-600 mt-4">
                    Already registered?
                    <a href="/login" className="text-[#00ADB5] hover:underline font-medium ml-1">
                        Login
                    </a>
                </p>
            </form>
        </div>
    )
}

export default Signup